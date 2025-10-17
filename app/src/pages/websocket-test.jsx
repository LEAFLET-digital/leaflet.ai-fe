import React, { useState, useEffect } from 'react';
import { PageContainer, PageHeader, Card, Button, MockCameraSender } from '../components';
import { useWebSocket } from '../context/WebSocketContext';

function WebSocketTest() {
  const { 
    isConnected, 
    isConnecting, 
    connectionError, 
    connect, 
    disconnect 
  } = useWebSocket();
  
  const [testResults, setTestResults] = useState([]);

  const addTestResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [...prev, { message, type, timestamp }]);
  };

  useEffect(() => {
    if (isConnected) {
      addTestResult('✅ WebSocket connected successfully', 'success');
    } else if (connectionError) {
      addTestResult(`❌ Connection error: ${connectionError}`, 'error');
    }
  }, [isConnected, connectionError]);

  const testConnection = async () => {
    setTestResults([]);
    addTestResult('🔄 Testing WebSocket connection...');
    
    try {
      await connect();
    } catch (error) {
      addTestResult(`❌ Connection test failed: ${error.message}`, 'error');
    }
  };

  const getStatusColor = () => {
    if (isConnecting) return 'text-yellow-400';
    if (isConnected) return 'text-green-400';
    return 'text-red-400';
  };

  const getStatusText = () => {
    if (isConnecting) return 'Connecting...';
    if (isConnected) return 'Connected';
    return 'Disconnected';
  };

  return (
    <PageContainer>
      <PageHeader 
        title="WebSocket Test"
        description="Test WebSocket connection to the human detection service"
      />

      <div className="space-y-6">
        {/* Connection Status */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Connection Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStatusColor()}`}>
                {getStatusText()}
              </div>
              <div className="text-gray-400 text-sm">WebSocket Status</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {import.meta.env.VITE_WEBSOCKET_URL || 'localhost:5001'}
              </div>
              <div className="text-gray-400 text-sm">Target URL</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${connectionError ? 'text-red-400' : 'text-gray-400'}`}>
                {connectionError ? 'Error' : 'OK'}
              </div>
              <div className="text-gray-400 text-sm">Connection Health</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={testConnection}
              disabled={isConnecting}
              variant="primary"
            >
              {isConnecting ? 'Testing...' : 'Test Connection'}
            </Button>
            
            <Button
              onClick={disconnect}
              disabled={!isConnected}
              variant="secondary"
            >
              Disconnect
            </Button>
          </div>

          {connectionError && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-600 rounded text-red-400 text-sm">
              <strong>Error:</strong> {connectionError}
            </div>
          )}
        </Card>

        {/* Test Results */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Test Results</h3>
          
          <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <div className="text-gray-400 text-sm">No test results yet. Click "Test Connection" to begin.</div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-2 text-sm">
                  <span className="text-gray-500">[{result.timestamp}]</span>
                  <span 
                    className={`ml-2 ${
                      result.type === 'success' ? 'text-green-400' :
                      result.type === 'error' ? 'text-red-400' : 'text-white'
                    }`}
                  >
                    {result.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Mock Camera Sender for Testing */}
        {isConnected && (
          <MockCameraSender cameraId="test_camera_websocket" />
        )}

        {/* Instructions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">How to Test</h3>
          
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <div>
                <strong>Start the Backend Service:</strong>
                <div className="text-sm text-gray-400 mt-1">
                  Navigate to the human detection service directory and run:
                  <code className="bg-slate-800 px-2 py-1 rounded ml-2">python app.py</code>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <div>
                <strong>Test Connection:</strong>
                <div className="text-sm text-gray-400 mt-1">
                  Click "Test Connection" above to verify WebSocket connectivity.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <div>
                <strong>Send Test Frames:</strong>
                <div className="text-sm text-gray-400 mt-1">
                  Use the Mock Camera Sender to send test frames and verify processing.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <div>
                <strong>View Live Feed:</strong>
                <div className="text-sm text-gray-400 mt-1">
                  Go to the Cameras page to see the live processed frames with detection results.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default WebSocketTest;