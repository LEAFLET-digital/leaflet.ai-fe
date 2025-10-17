import { forwardRef, useEffect, useRef, useState } from "react";
import { Card, Badge } from "../ui";
import { useWebSocket } from "../../context/WebSocketContext";

const CameraFeed = forwardRef(({ 
  camera,
  width = "w-[800px]",
  height = "h-[410px]",
  className = "",
  enableWebSocket = false,
  ...props 
}, ref) => {
  const { isConnected, joinCamera, leaveCamera, onCameraFrame } = useWebSocket();
  const canvasRef = useRef(null);
  const [frameData, setFrameData] = useState(null);
  const [detectionCount, setDetectionCount] = useState(0);
  const [detectedIds, setDetectedIds] = useState([]);
  const [isReceivingFrames, setIsReceivingFrames] = useState(false);

  if (!camera) return null;
  
  const statusVariant = {
    'Online': 'success',
    'Offline': 'danger',
    'Warning': 'warning'
  }[camera.status] || 'default';

  // WebSocket frame handling
  useEffect(() => {
    if (!enableWebSocket || !isConnected || !camera?.id) {
      return;
    }

    let unsubscribe;

    const setupWebSocket = async () => {
      try {
        // Join camera room
        await joinCamera(camera.id);
        console.log(`📡 Joined camera room: ${camera.id}`);

        // Subscribe to frame updates
        unsubscribe = onCameraFrame(camera.id, (data) => {
          try {
            if (data.frame) {
              let imageUrl;
              
              // Handle different frame data formats
              if (typeof data.frame === 'string') {
                // Frame is already base64 encoded
                imageUrl = `data:image/jpeg;base64,${data.frame}`;
              } else if (data.frame instanceof ArrayBuffer || data.frame instanceof Uint8Array) {
                // Frame is binary data
                const frameArray = new Uint8Array(data.frame);
                const frameBase64 = btoa(String.fromCharCode.apply(null, frameArray));
                imageUrl = `data:image/jpeg;base64,${frameBase64}`;
              } else {
                console.warn('Unknown frame format:', typeof data.frame);
                return;
              }
              
              setFrameData(imageUrl);
              setDetectionCount(data.count || 0);
              setDetectedIds(data.ids || []);
              setIsReceivingFrames(true);

              // Draw frame on canvas
              if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = () => {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
                };
                
                img.src = imageUrl;
              }
            }
          } catch (error) {
            console.error('Error processing frame:', error);
          }
        });

      } catch (error) {
        console.error('Failed to setup WebSocket for camera:', error);
      }
    };

    setupWebSocket();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (camera?.id) {
        leaveCamera(camera.id);
      }
    };
  }, [enableWebSocket, isConnected, camera?.id, joinCamera, leaveCamera, onCameraFrame]);

  const renderCameraContent = () => {
    if (camera.status !== 'Online') {
      return (
        <div className="text-center">
          <div className="text-6xl text-gray-600 mb-4">📹</div>
          <p className="text-gray-400 text-lg">Camera {camera.status}</p>
          <p className="text-gray-500 text-sm">{camera.location}</p>
        </div>
      );
    }

    if (enableWebSocket && isConnected) {
      if (isReceivingFrames && frameData) {
        return (
          <div className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain rounded-lg"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            
            {/* Live indicators */}
            <div className="absolute top-4 left-4 bg-red-600 w-3 h-3 rounded-full animate-pulse"></div>
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
              LIVE
            </div>
            
            {/* Detection info */}
            {detectionCount > 0 && (
              <div className="absolute bottom-4 left-4 bg-blue-600/80 text-white px-3 py-2 rounded-lg">
                <div className="text-sm font-semibold">
                  🚶 {detectionCount} Person{detectionCount !== 1 ? 's' : ''} Detected
                </div>
                {detectedIds.length > 0 && (
                  <div className="text-xs mt-1 opacity-90">
                    IDs: {detectedIds.join(', ')}
                  </div>
                )}
              </div>
            )}
            
            {/* Camera info */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg">
              <div className="text-xs">{camera.location}</div>
              <div className="text-xs opacity-75">{camera.resolution} • {camera.fps}fps</div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-white text-lg">
                  {isConnected ? 'Connecting to Camera...' : 'WebSocket Connecting...'}
                </p>
                <p className="text-gray-400 text-sm">{camera.location}</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-yellow-600 w-3 h-3 rounded-full animate-pulse"></div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              CONNECTING
            </div>
          </div>
        );
      }
    } else {
      // Fallback static view
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
              <p className="text-white text-lg">Static Feed</p>
              <p className="text-gray-400 text-sm">{camera.location}</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-green-600 w-3 h-3 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            STATIC
          </div>
        </div>
      );
    }
  };
  
  return (
    <Card ref={ref} className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{camera.name}</h2>
          {enableWebSocket && (
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-400">
                {isConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
              </span>
            </div>
          )}
        </div>
        <Badge variant={statusVariant}>
          {camera.status}
        </Badge>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className={`${width} ${height} bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center relative overflow-hidden`}>
          {renderCameraContent()}
        </div>
      </div>
    </Card>
  );
});

CameraFeed.displayName = "CameraFeed";

export default CameraFeed;