import { useState } from 'react';

function Cameras() {
  const [selectedCamera, setSelectedCamera] = useState({
    id: 1,
    name: 'Camera 1',
    status: 'Online',
    fps: 30,
    resolution: '1920x1080',
    location: 'Front Door'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const cameras = [
    { id: 1, name: 'Camera 1', status: 'Online', fps: 30, resolution: '1920x1080', location: 'Front Door' },
    { id: 2, name: 'Camera 2', status: 'Online', fps: 25, resolution: '1920x1080', location: 'Back Yard' },
    { id: 3, name: 'Camera 3', status: 'Offline', fps: 0, resolution: '1920x1080', location: 'Garage' },
    { id: 4, name: 'Camera 4', status: 'Online', fps: 30, resolution: '1280x720', location: 'Kitchen' },
    { id: 5, name: 'Camera 5', status: 'Online', fps: 60, resolution: '3840x2160', location: 'Living Room' },
    { id: 6, name: 'Camera 6', status: 'Warning', fps: 15, resolution: '1920x1080', location: 'Basement' }
  ];
  
  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-full p-6">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 glow-text">Camera Management</h1>
        
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Main Camera Feed Area */}
          <div className="flex-1 flex flex-col">
            {/* Camera Feed Display */}
            <div className="modern-card p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">{selectedCamera.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCamera.status === 'Online' ? 'bg-green-500/20 text-green-400' :
                  selectedCamera.status === 'Offline' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {selectedCamera.status}
                </span>
              </div>
              
              {/* 800x400 Camera Feed */}
              <div className="flex justify-center mb-6">
                <div className="w-[800px] h-[410px] bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center relative overflow-hidden">
                  {selectedCamera.status === 'Online' ? (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                          <p className="text-white text-lg">Live Feed</p>
                          <p className="text-gray-400 text-sm">{selectedCamera.location}</p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-red-600 w-3 h-3 rounded-full animate-pulse"></div>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        REC
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl text-gray-600 mb-4">📹</div>
                      <p className="text-gray-400 text-lg">Camera Offline</p>
                      <p className="text-gray-500 text-sm">{selectedCamera.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Analytics Section */}
            <div className="modern-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Analytics & Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{selectedCamera.fps}</div>
                  <div className="text-sm text-gray-400">FPS</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{selectedCamera.resolution}</div>
                  <div className="text-sm text-gray-400">Resolution</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">24h</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">2.1GB</div>
                  <div className="text-sm text-gray-400">Storage Used</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-white mb-2">Motion Detection</div>
                  <div className="text-sm text-gray-400 mb-2">Last 24 hours</div>
                  <div className="text-2xl font-bold text-orange-400">127</div>
                  <div className="text-sm text-gray-400">Events detected</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-white mb-2">Network Status</div>
                  <div className="text-sm text-gray-400 mb-2">Connection quality</div>
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-sm text-gray-400">Signal strength</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-lg font-semibold text-white mb-2">Recording Time</div>
                  <div className="text-sm text-gray-400 mb-2">Today</div>
                  <div className="text-2xl font-bold text-cyan-400">18:34</div>
                  <div className="text-sm text-gray-400">Hours recorded</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Camera List */}
          <div className="w-80 h-full flex flex-col modern-card p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Camera List</h3>
              
              {/* Search Input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search cameras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            
            {/* Scrollable Camera List */}
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
              {filteredCameras.map((camera) => (
                <div
                  key={camera.id}
                  onClick={() => setSelectedCamera(camera)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCamera.id === camera.id
                      ? 'bg-blue-600/30 border-2 border-blue-500'
                      : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{camera.name}</h4>
                    <span className={`w-3 h-3 rounded-full ${
                      camera.status === 'Online' ? 'bg-green-400' :
                      camera.status === 'Offline' ? 'bg-red-400' :
                      'bg-yellow-400'
                    }`}></span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{camera.location}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{camera.resolution}</span>
                    <span>{camera.fps} FPS</span>
                  </div>
                </div>
              ))}
              
              {/* Add New Camera Button */}
              <div className="p-4 rounded-lg border-2 border-dashed border-gray-600 cursor-pointer hover:border-gray-400 transition-colors duration-200 text-center">
                <div className="text-gray-400 text-2xl mb-2">+</div>
                <p className="text-sm text-gray-400">Add New Camera</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cameras;
