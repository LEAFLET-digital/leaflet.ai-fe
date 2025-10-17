import { io } from "socket.io-client";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = new Map();
    this.cameraCallbacks = new Map();
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(url = "http://localhost:5001") {
    if (this.socket?.connected) {
      console.log("WebSocket already connected");
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.socket = io(url, {
        transports: ["websocket", "polling"],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
      });

      this.socket.on("connect", () => {
        console.log("✅ WebSocket connected");
        this.isConnected = true;
        this.reconnectAttempts = 0;
        resolve();
      });

      this.socket.on("disconnect", (reason) => {
        console.log(`❌ WebSocket disconnected: ${reason}`);
        this.isConnected = false;
      });

      this.socket.on("connect_error", (error) => {
        console.error("❌ WebSocket connection error:", error);
        this.reconnectAttempts++;
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          reject(error);
        }
      });

      // Listen for processed frames
      this.socket.on("processed_frame", (data) => {
        try {
          // Handle different data formats
          let frameData;

          if (typeof data === "string") {
            frameData = JSON.parse(data);
          } else if (
            data instanceof ArrayBuffer ||
            data instanceof Uint8Array
          ) {
            // Handle binary msgpack data - for now just log it
            console.log(
              "Received binary frame data, size:",
              data.length || data.byteLength
            );
            return;
          } else {
            frameData = data;
          }

          const cameraId = frameData.camera_id;

          if (this.cameraCallbacks.has(cameraId)) {
            this.cameraCallbacks.get(cameraId).forEach((callback) => {
              callback(frameData);
            });
          }
        } catch (error) {
          console.error("Error processing frame data:", error);
        }
      });

      // Listen for acknowledgments
      this.socket.on("ack", (data) => {
        console.log("WebSocket ACK:", data);
      });

      // Timeout if connection takes too long
      setTimeout(() => {
        if (!this.isConnected) {
          reject(new Error("Connection timeout"));
        }
      }, 10000);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.callbacks.clear();
      this.cameraCallbacks.clear();
      console.log("🔌 WebSocket disconnected");
    }
  }

  joinCamera(cameraId) {
    if (!this.isConnected || !this.socket) {
      throw new Error("WebSocket not connected");
    }

    return new Promise((resolve) => {
      this.socket.emit("join_camera", { camera_id: cameraId });

      // Listen for the ack response
      const ackHandler = (data) => {
        if (data.camera_id === cameraId && data.status === "joined") {
          this.socket.off("ack", ackHandler);
          resolve();
        }
      };

      this.socket.on("ack", ackHandler);
    });
  }

  leaveCamera(cameraId) {
    if (!this.isConnected || !this.socket) {
      return;
    }

    this.socket.emit("leave_camera", { camera_id: cameraId });

    // Remove camera callbacks
    this.cameraCallbacks.delete(cameraId);
  }

  sendFrame(cameraId, frameBase64) {
    if (!this.isConnected || !this.socket) {
      throw new Error("WebSocket not connected");
    }

    const frameData = {
      camera_id: cameraId,
      frame: frameBase64,
    };

    this.socket.emit("frame", frameData);
  }

  onCameraFrame(cameraId, callback) {
    if (!this.cameraCallbacks.has(cameraId)) {
      this.cameraCallbacks.set(cameraId, new Set());
    }
    this.cameraCallbacks.get(cameraId).add(callback);

    // Return unsubscribe function
    return () => {
      if (this.cameraCallbacks.has(cameraId)) {
        this.cameraCallbacks.get(cameraId).delete(callback);
        if (this.cameraCallbacks.get(cameraId).size === 0) {
          this.cameraCallbacks.delete(cameraId);
        }
      }
    };
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

export default websocketService;
