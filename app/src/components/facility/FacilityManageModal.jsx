import { Card, Badge, Button } from '../ui';

const FacilityManageModal = ({ 
  isOpen, 
  onClose, 
  selectedFacility, 
  onCameraClick, 
  onEditCamera, 
  onDeleteCamera, 
  onAddCamera 
}) => {
  if (!isOpen || !selectedFacility) return null;

  // Transform camera data for display
  const detailedCameras = selectedFacility.cameras.map((camera, index) => ({
    id: camera.id || index + 1,
    name: camera.cameraName || camera.name || `Camera ${index + 1}`,
    location: camera.location || `${selectedFacility.facilityName} - Zone ${index + 1}`,
    side: camera.direction || ['North', 'South', 'East', 'West'][index % 4],
    area: camera.area || ['Main Entrance', 'Parking Area', 'Loading Dock', 'Emergency Exit'][index % 4],
    rtspUrl: camera.rtspUrl || `rtsp://admin:pass123@192.168.1.${100 + index}:554/stream1`,
    aiVisionModel: camera.modelTopic || ['Human Detection', 'Fire Detection', 'Vehicle Detection'][index % 3],
    status: index === 2 ? 'Offline' : 'Online',
    resolution: '1920x1080',
    fps: 30,
    lastActivity: `${Math.floor(Math.random() * 30) + 1} min ago`,
    alerts: Math.floor(Math.random() * 10),
    uptime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
    description: `Security camera monitoring ${selectedFacility.facilityName?.toLowerCase() || 'facility'} area`,
    originalCamera: camera // Keep reference to original camera object
  }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">{selectedFacility.facilityName}</h2>
            <p className="text-gray-400 text-sm">{selectedFacility.location} • {selectedFacility.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Camera Details</h3>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAddCamera(selectedFacility.id)}
            >
              Add New Camera
            </Button>
          </div>

          {detailedCameras.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {detailedCameras.map((camera) => (
                <Card 
                  key={camera.id} 
                  variant="solid" 
                  className="p-4 cursor-pointer hover:bg-slate-700 transition-all duration-200 hover:shadow-lg hover:border-slate-500"
                  onClick={() => onCameraClick(camera, selectedFacility.facilityName)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{camera.name}</h4>
                      <p className="text-sm text-gray-300">{camera.location}</p>
                    </div>
                    <Badge 
                      variant={camera.status === 'Online' ? 'success' : 'danger'} 
                      size="sm"
                    >
                      {camera.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-white">Video Quality</span>
                      </div>
                      <p className="text-sm text-gray-300">{camera.resolution}</p>
                      <p className="text-xs text-gray-400">{camera.fps} FPS</p>
                    </div>

                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-white">AI Model</span>
                      </div>
                      <p className="text-sm text-gray-300">{camera.aiVisionModel}</p>
                      <p className="text-xs text-gray-400">{camera.alerts} alerts today</p>
                    </div>

                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-sm font-medium text-white">Location</span>
                      </div>
                      <p className="text-sm text-gray-300">{camera.side} Side</p>
                      <p className="text-xs text-gray-400">{camera.area}</p>
                    </div>

                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-white">Status</span>
                      </div>
                      <p className="text-sm text-gray-300">Uptime: {camera.uptime}</p>
                      <p className="text-xs text-gray-400">Last: {camera.lastActivity}</p>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="text-sm font-medium text-white">RTSP Stream</span>
                    </div>
                    <p className="text-xs text-gray-300 font-mono break-all">{camera.rtspUrl}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCameraClick(camera, selectedFacility.facilityName);
                      }}
                    >
                      View Live
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCamera(camera.originalCamera);
                      }}
                    >
                      Settings
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCamera(camera.originalCamera.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="solid" className="text-center py-12">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">No Cameras Added</h3>
              <p className="text-gray-400 mb-6">
                Start monitoring this facility by adding your first camera
              </p>
              <Button 
                variant="primary" 
                onClick={() => onAddCamera(selectedFacility.id)}
              >
                Add Camera
              </Button>
            </Card>
          )}
        </div>

        <div className="border-t border-slate-600 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Facility created: {new Date(selectedFacility.createdAt).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                Edit Facility
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FacilityManageModal;