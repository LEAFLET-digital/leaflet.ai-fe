import { forwardRef, useEffect, useRef, useState } from "react";
import { Card, Badge, Button } from "../ui";
import { useWebSocket } from "../../context/WebSocketContext";
import manageCameraFacilityApi from "../../apiContext/mangeCameraFacility";

const CameraFeed = forwardRef(({ 
  camera,
  width = "w-[800px]",
  height = "h-[410px]",
  className = "",
  enableWebSocket = false,
  ...props 
}, ref) => {
  const { isConnected, joinCamera, leaveCamera, onCameraFrame } = useWebSocket();
  const { startInference, stopInference } = manageCameraFacilityApi();
  const canvasRef = useRef(null);
  const [frameData, setFrameData] = useState(null);
  const [detectionCount, setDetectionCount] = useState(0);
  const [detectedIds, setDetectedIds] = useState([]);
  const [isReceivingFrames, setIsReceivingFrames] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingTaskId, setStreamingTaskId] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  if (!camera) return null;
  
  const statusVariant = {
    'Online': 'success',
    'Offline': 'danger',
    'Warning': 'warning'
  }[camera.status] || 'default';

  // Start camera inference
  const handleStartCamera = async () => {
    if (!camera?.id) return;
    
    setIsStarting(true);
    try {
      const response = await startInference({
        cameraId: camera.id
      });
      
      if (response.success) {
        setIsStreaming(true);
        setStreamingTaskId(response.response?.task_id);
        console.log('✅ Camera inference started:', response.response);
      } else {
        console.error('❌ Failed to start camera inference:', response.errorMsg);
        alert('Failed to start camera: ' + (response.errorMsg || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error starting camera:', error);
      alert('Error starting camera: ' + error.message);
    } finally {
      setIsStarting(false);
    }
  };

  // Stop camera inference
  const handleStopCamera = async () => {
    if (!streamingTaskId) return;
    
    setIsStopping(true);
    try {
      const response = await stopInference({
        task_id: streamingTaskId
      });
      
      if (response.success) {
        setIsStreaming(false);
        setStreamingTaskId(null);
        setIsReceivingFrames(false);
        setFrameData(null);
        console.log('✅ Camera inference stopped:', response.response);
      } else {
        console.error('❌ Failed to stop camera inference:', response.errorMsg);
        alert('Failed to stop camera: ' + (response.errorMsg || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error stopping camera:', error);
      alert('Error stopping camera: ' + error.message);
    } finally {
      setIsStopping(false);
    }
  };

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
                  {isStreaming 
                    ? 'Waiting for Camera Stream...' 
                    : isConnected 
                      ? 'Press Start to Begin Streaming' 
                      : 'WebSocket Connecting...'
                  }
                </p>
                <p className="text-gray-400 text-sm">{camera.location}</p>
                {isStreaming && (
                  <p className="text-blue-400 text-xs mt-2">Task ID: {streamingTaskId}</p>
                )}
              </div>
            </div>
            <div className={`absolute top-4 left-4 w-3 h-3 rounded-full animate-pulse ${
              isStreaming ? 'bg-blue-600' : 'bg-yellow-600'
            }`}></div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {isStreaming ? 'STARTING' : 'READY'}
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
              <svg className="w-20 h-20 text-white/30 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-white text-lg">Camera Ready</p>
              <p className="text-gray-400 text-sm">{camera.location}</p>
              <p className="text-gray-500 text-xs mt-2">Enable WebSocket for live streaming</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-gray-600 w-3 h-3 rounded-full"></div>
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
          <h2 className="text-2xl font-semibold text-white">{camera.cameraName || camera.name}</h2>
          {enableWebSocket && (
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-400">
                {isConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
              </span>
              {isStreaming && (
                <>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-xs text-blue-400">Streaming Active</span>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {/* Camera Control Buttons */}
          <div className="flex gap-2">
            {!isStreaming ? (
              <Button
                variant="success"
                size="sm"
                onClick={handleStartCamera}
                disabled={isStarting || !camera?.id}
                className="flex items-center gap-2"
              >
                {isStarting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Start
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="danger"
                size="sm"
                onClick={handleStopCamera}
                disabled={isStopping || !streamingTaskId}
                className="flex items-center gap-2"
              >
                {isStopping ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Stopping...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                    </svg>
                    Stop
                  </>
                )}
              </Button>
            )}
          </div>
          
          <Badge variant={statusVariant}>
            {camera.status}
          </Badge>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className={`${width} ${height} bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center relative overflow-hidden`}>
          {renderCameraContent()}
        </div>
      </div>
      
      {/* Detection Stats */}
      {isStreaming && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{detectionCount}</div>
            <div className="text-xs text-gray-400">Detections</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{detectedIds?.length || 0}</div>
            <div className="text-xs text-gray-400">Tracked Objects</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <div className={`text-2xl font-bold ${isReceivingFrames ? 'text-green-400' : 'text-red-400'}`}>
              {isReceivingFrames ? 'LIVE' : 'NO FEED'}
            </div>
            <div className="text-xs text-gray-400">Status</div>
          </div>
        </div>
      )}
    </Card>
  );
});

CameraFeed.displayName = "CameraFeed";

export default CameraFeed;