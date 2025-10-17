import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import websocketService from '../services/websocketService';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (isConnected || isConnecting) {
      return;
    }

    try {
      setIsConnecting(true);
      setConnectionError(null);
      
      // Get WebSocket URL from environment or use default
      const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:5001';
      
      await websocketService.connect(wsUrl);
      setIsConnected(true);
      console.log('🔌 WebSocket connection established');
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      setConnectionError(error.message);
    } finally {
      setIsConnecting(false);
    }
  }, [isConnected, isConnecting]);

  const disconnect = useCallback(() => {
    websocketService.disconnect();
    setIsConnected(false);
    setConnectionError(null);
  }, []);

  const joinCamera = useCallback(async (cameraId) => {
    if (!isConnected) {
      throw new Error('WebSocket not connected');
    }
    return websocketService.joinCamera(cameraId);
  }, [isConnected]);

  const leaveCamera = useCallback((cameraId) => {
    if (!isConnected) {
      return;
    }
    websocketService.leaveCamera(cameraId);
  }, [isConnected]);

  const sendFrame = useCallback((cameraId, frameBase64) => {
    if (!isConnected) {
      throw new Error('WebSocket not connected');
    }
    websocketService.sendFrame(cameraId, frameBase64);
  }, [isConnected]);

  const onCameraFrame = useCallback((cameraId, callback) => {
    return websocketService.onCameraFrame(cameraId, callback);
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, []);

  // Monitor connection status
  useEffect(() => {
    const checkConnection = setInterval(() => {
      const currentStatus = websocketService.getConnectionStatus();
      if (currentStatus !== isConnected) {
        setIsConnected(currentStatus);
      }
    }, 1000);

    return () => clearInterval(checkConnection);
  }, [isConnected]);

  const value = {
    isConnected,
    isConnecting,
    connectionError,
    connect,
    disconnect,
    joinCamera,
    leaveCamera,
    sendFrame,
    onCameraFrame
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export default WebSocketContext;