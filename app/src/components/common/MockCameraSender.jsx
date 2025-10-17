import React, { useState, useRef, useCallback } from 'react';
import { Card, Button } from '../ui';
import { useWebSocket } from '../../context/WebSocketContext';

const MockCameraSender = ({ cameraId = "test_camera_001" }) => {
  const { isConnected, sendFrame, joinCamera } = useWebSocket();
  const [isStreaming, setIsStreaming] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const canvasRef = useRef(null);
  const streamIntervalRef = useRef(null);
  const videoRef = useRef(null);

  // Generate a test frame with moving elements
  const generateTestFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;

    // Clear canvas with dark background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw moving rectangle (simulates person)
    const time = Date.now() / 1000;
    const x = 50 + Math.sin(time) * 200;
    const y = 200 + Math.cos(time * 0.7) * 100;

    ctx.fillStyle = '#4ade80';
    ctx.fillRect(x, y, 60, 120);

    // Draw frame counter
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.fillText(`Frame: ${frameCount}`, 10, 30);
    ctx.fillText(`Camera: ${cameraId}`, 10, 50);

    // Convert to base64
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  }, [frameCount, cameraId]);

  // Start streaming from webcam
  const startWebcamStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      return stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      return null;
    }
  }, []);

  // Capture frame from webcam
  const captureWebcamFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return null;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Add overlay text
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.fillText(`Frame: ${frameCount}`, 10, 30);
    ctx.fillText(`Camera: ${cameraId}`, 10, 50);

    // Convert to base64
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  }, [frameCount, cameraId]);

  const startStreaming = useCallback(async () => {
    if (!isConnected) {
      alert('WebSocket not connected');
      return;
    }

    try {
      // Join camera room first
      await joinCamera(cameraId);
      
      // Try to start webcam, fallback to generated frames
      const webcamStream = await startWebcamStream();
      
      setIsStreaming(true);
      setFrameCount(0);

      // Send frames at 10 FPS
      streamIntervalRef.current = setInterval(() => {
        try {
          const frameBase64 = webcamStream ? captureWebcamFrame() : generateTestFrame();
          
          if (frameBase64) {
            sendFrame(cameraId, frameBase64);
            setFrameCount(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error sending frame:', error);
        }
      }, 100); // 10 FPS

    } catch (error) {
      console.error('Error starting stream:', error);
      alert('Failed to start streaming: ' + error.message);
    }
  }, [isConnected, cameraId, joinCamera, sendFrame, startWebcamStream, captureWebcamFrame, generateTestFrame]);

  const stopStreaming = useCallback(() => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    // Stop webcam
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
  }, []);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Mock Camera Sender</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Camera ID
            </label>
            <input
              type="text"
              value={cameraId}
              readOnly
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>

          <div className="space-y-2">
            <div className={`flex items-center gap-2 text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            
            <div className={`flex items-center gap-2 text-sm ${isStreaming ? 'text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
              Streaming: {isStreaming ? `Active (${frameCount} frames)` : 'Inactive'}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={startStreaming}
              disabled={!isConnected || isStreaming}
              variant="primary"
              className="w-full"
            >
              {isStreaming ? 'Streaming...' : 'Start Stream'}
            </Button>
            
            <Button
              onClick={stopStreaming}
              disabled={!isStreaming}
              variant="secondary"
              className="w-full"
            >
              Stop Stream
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Frame Preview
          </label>
          <div className="bg-slate-800 rounded-lg p-2 border border-slate-600">
            <canvas
              ref={canvasRef}
              className="w-full max-w-xs border border-slate-500 rounded"
              style={{ maxHeight: '200px' }}
            />
            <video
              ref={videoRef}
              className="w-full max-w-xs border border-slate-500 rounded mt-2"
              style={{ maxHeight: '200px', display: 'none' }}
              muted
              autoPlay
              playsInline
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MockCameraSender;