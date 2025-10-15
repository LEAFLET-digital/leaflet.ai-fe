import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import modelDemoApi from '../apiContext/modelDemoApi';
import {
  PageContainer,
  PageHeader,
  Grid,
  Button,
  Card,
  SearchInput,
  Badge
} from '../components';

function Facility() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: 'Main Office Building',
      location: 'Downtown District',
      description: 'Primary office complex with multiple floors',
      cameras: ['Camera 1', 'Camera 2', 'Camera 3', 'Camera 4'],
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Warehouse A',
      location: 'Industrial Zone',
      description: 'Main storage and distribution center',
      cameras: ['Camera 5', 'Camera 6'],
      status: 'Active',
      createdAt: '2024-02-10'
    },
    {
      id: 3,
      name: 'Parking Lot',
      location: 'Building Perimeter',
      description: 'Employee and visitor parking area',
      cameras: ['Camera 7'],
      status: 'Maintenance',
      createdAt: '2024-03-05'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedFacilityForCamera, setSelectedFacilityForCamera] = useState(null);
  
  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFacility = () => {
    setShowAddModal(true);
  };

  const handleEditFacility = (facility) => {
    setSelectedFacility(facility);
    setShowManageModal(true);
  };

  const handleAddCamera = (facilityId) => {
    const facility = facilities.find(f => f.id === facilityId);
    setSelectedFacilityForCamera(facility);
    setShowCameraModal(true);
  };

  const handleCameraClick = (cameraName, facilityName) => {
    // Navigate to cameras page with camera information
    if (userId) {
      navigate(`/dashboard/${userId}/cameras`, {
        state: {
          selectedCamera: cameraName,
          facility: facilityName
        }
      });
    }
  };

  const { startInference } = modelDemoApi();

  const handleViewLiveFromFacility = async (cameraName, facilityName) => {
    // navigate to cameras and attempt to start preview there as well
    if (userId) {
      navigate(`/dashboard/${userId}/cameras`, {
        state: {
          selectedCamera: cameraName,
          facility: facilityName
        }
      });
    }
    // optionally start preview request (best-effort)
    try {
      await startInference({ cameraId: cameraName, rtspUrl: '' });
    } catch (err) {
      console.error('Failed to request preview start', err);
    }
  };

  const FacilityCard = ({ facility }) => {
    const statusVariant = facility.status === 'Active' ? 'success' : 'warning';
    
    return (
      <Card className="h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{facility.name}</h3>
            <p className="text-gray-300 text-sm mb-1">{facility.location}</p>
            <p className="text-gray-400 text-xs">{facility.description}</p>
          </div>
          <Badge variant={statusVariant} size="sm">
            {facility.status}
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 text-sm font-medium">Cameras</span>
            <Badge variant="primary" size="sm">
              {facility.cameras.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {facility.cameras.slice(0, 2).map((camera, index) => (
              <div 
                key={index} 
                className="bg-slate-600/80 border border-slate-500 rounded-lg p-3 cursor-pointer hover:bg-slate-600 hover:border-slate-400 transition-all duration-200 hover:shadow-lg"
                onClick={() => handleCameraClick(camera, facility.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">{camera}</span>
                  </div>
                  <Badge variant="success" size="sm">Online</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>1920x1080</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>30 FPS</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>North Side</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Human Detection</span>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Last Activity</span>
                    <span className="text-xs text-green-400">2 min ago</span>
                  </div>
                </div>
              </div>
            ))}
            
            {facility.cameras.length > 2 && (
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-400">
                    +{facility.cameras.length - 2} more cameras
                  </span>
                </div>
              </div>
            )}
            
            {facility.cameras.length === 0 && (
              <div className="bg-slate-700/30 border border-slate-600 border-dashed rounded-lg p-4 text-center">
                <svg className="w-6 h-6 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500">No cameras added yet</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-auto">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => handleEditFacility(facility)}
          >
            Manage
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => handleAddCamera(facility.id)}
          >
            Add Camera
          </Button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-600">
          <p className="text-xs text-gray-500">
            Created: {new Date(facility.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Card>
    );
  };

  const FacilityManageModal = () => {
    if (!showManageModal || !selectedFacility) return null;

    // Mock detailed camera data - in real app this would come from API
    const detailedCameras = selectedFacility.cameras.map((camera, index) => ({
      id: index + 1,
      name: camera,
      location: `${selectedFacility.name} - Zone ${index + 1}`,
      side: ['North', 'South', 'East', 'West'][index % 4],
      area: ['Main Entrance', 'Parking Area', 'Loading Dock', 'Emergency Exit'][index % 4],
      rtspUrl: `rtsp://admin:pass123@192.168.1.${100 + index}:554/stream1`,
      aiVisionModel: ['Human Detection', 'Fire Detection', 'Vehicle Detection'][index % 3],
      status: index === 2 ? 'Offline' : 'Online',
      resolution: '1920x1080',
      fps: 30,
      lastActivity: `${Math.floor(Math.random() * 30) + 1} min ago`,
      alerts: Math.floor(Math.random() * 10),
      uptime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      description: `Security camera monitoring ${selectedFacility.name.toLowerCase()} area`
    }));

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">{selectedFacility.name}</h2>
              <p className="text-gray-400 text-sm">{selectedFacility.location} • {selectedFacility.description}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowManageModal(false);
                setSelectedFacility(null);
              }}
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
                onClick={() => handleAddCamera(selectedFacility.id)}
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
                    onClick={() => handleCameraClick(camera.name, selectedFacility.name)}
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
                          handleCameraClick(camera.name, selectedFacility.name);
                        }}
                      >
                        View Live
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Settings
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
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
                  onClick={() => handleAddCamera(selectedFacility.id)}
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
                  onClick={() => {
                    setShowManageModal(false);
                    setSelectedFacility(null);
                  }}
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

  const AddCameraModal = () => {
    const [cameraFormData, setCameraFormData] = useState({
      name: '',
      location: '',
      side: '',
      area: '',
      rtspUrl: '',
      aiVisionModel: '',
      description: ''
    });

    const sides = [
      { value: 'north', label: 'North' },
      { value: 'south', label: 'South' },
      { value: 'east', label: 'East' },
      { value: 'west', label: 'West' },
      { value: 'northeast', label: 'North East' },
      { value: 'northwest', label: 'North West' },
      { value: 'southeast', label: 'South East' },
      { value: 'southwest', label: 'South West' }
    ];

    const aiVisionModels = [
      { value: 'human_detection', label: 'Human Detection' },
      { value: 'fire_detection', label: 'Fire Detection' },
      { value: 'vehicle_detection', label: 'Vehicle Detection' },
      { value: 'intrusion_detection', label: 'Intrusion Detection' },
      { value: 'crowd_detection', label: 'Crowd Detection' },
      { value: 'object_counting', label: 'Object Counting' }
    ];

    const handleCameraSubmit = (e) => {
      e.preventDefault();
      
      if (!selectedFacilityForCamera) return;
      
      const newCamera = {
        id: Date.now(),
        ...cameraFormData,
        facilityId: selectedFacilityForCamera.id,
        status: 'Online',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // Update the facility with the new camera
      setFacilities(prevFacilities => 
        prevFacilities.map(facility => 
          facility.id === selectedFacilityForCamera.id
            ? { ...facility, cameras: [...facility.cameras, `${cameraFormData.name} (${cameraFormData.side})`] }
            : facility
        )
      );
      
      // Reset form and close modal
      setCameraFormData({
        name: '',
        location: '',
        side: '',
        area: '',
        rtspUrl: '',
        aiVisionModel: '',
        description: ''
      });
      setShowCameraModal(false);
      setSelectedFacilityForCamera(null);
    };

    if (!showCameraModal || !selectedFacilityForCamera) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Add Camera</h2>
              <p className="text-gray-400 text-sm">Adding to: {selectedFacilityForCamera.name}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowCameraModal(false);
                setSelectedFacilityForCamera(null);
              }}
            >
              ✕
            </Button>
          </div>
          
          <form onSubmit={handleCameraSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Camera Name *
                </label>
                <input
                  type="text"
                  value={cameraFormData.name}
                  onChange={(e) => setCameraFormData({ ...cameraFormData, name: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="e.g., Front Entrance Camera"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={cameraFormData.location}
                  onChange={(e) => setCameraFormData({ ...cameraFormData, location: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="e.g., Main Entrance Lobby"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Side/Direction *
                </label>
                <select
                  value={cameraFormData.side}
                  onChange={(e) => setCameraFormData({ ...cameraFormData, side: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  required
                >
                  <option value="">Select Direction</option>
                  {sides.map((side) => (
                    <option key={side.value} value={side.value}>
                      {side.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Area *
                </label>
                <input
                  type="text"
                  value={cameraFormData.area}
                  onChange={(e) => setCameraFormData({ ...cameraFormData, area: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="e.g., Reception Area, Parking Lot"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                RTSP URL *
              </label>
              <input
                type="url"
                value={cameraFormData.rtspUrl}
                onChange={(e) => setCameraFormData({ ...cameraFormData, rtspUrl: e.target.value })}
                className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="rtsp://username:password@ip:port/stream"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: rtsp://admin:password123@192.168.1.100:554/stream1
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                AI Vision Model Type *
              </label>
              <select
                value={cameraFormData.aiVisionModel}
                onChange={(e) => setCameraFormData({ ...cameraFormData, aiVisionModel: e.target.value })}
                className="w-full bg-slate-700 border border-slate-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                required
              >
                <option value="">Select AI Model</option>
                {aiVisionModels.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={cameraFormData.description}
                onChange={(e) => setCameraFormData({ ...cameraFormData, description: e.target.value })}
                className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Additional details about camera placement, coverage area, or special notes..."
                rows="3"
              />
            </div>
            
            <div className="flex gap-3 pt-6 border-t border-slate-600">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setShowCameraModal(false);
                  setSelectedFacilityForCamera(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Add Camera
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  const AddFacilityModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      location: '',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newFacility = {
        id: facilities.length + 1,
        ...formData,
        cameras: [],
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setFacilities([...facilities, newFacility]);
      setFormData({ name: '', location: '', description: '' });
      setShowAddModal(false);
    };

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Add New Facility</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddModal(false)}
            >
              ✕
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facility Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter facility name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter location"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Enter description"
                rows="3"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Add Facility
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Facility Management"
        description="Manage your facilities and their associated cameras"
      />
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <SearchInput
          placeholder="Search facilities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-md"
        />
        
        <Button
          variant="primary"
          onClick={handleAddFacility}
          className="sm:w-auto"
        >
          Add Facility
        </Button>
      </div>
      
      <Grid cols="1" mdCols="2" lgCols="3" gap="6">
        {filteredFacilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </Grid>
      
      {filteredFacilities.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No facilities found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first facility'}
          </p>
          <Button variant="primary" onClick={handleAddFacility}>
            Add Facility
          </Button>
        </Card>
      )}
      
      <FacilityManageModal />
      <AddCameraModal />
      <AddFacilityModal />
    </PageContainer>
  );
}

export default Facility;