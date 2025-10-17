import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  PageContainer,
  PageHeader,
  TwoColumnLayout,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SearchInput,
  CameraCard,
  CameraFeed,
  StatsGrid,
  Button,
  Card,
  MockCameraSender
} from '../components';
import manageCameraFacilityApi from '../apiContext/mangeCameraFacility';

function Cameras() {
  const location = useLocation();
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { getFacilities, startInference, stopInference } = manageCameraFacilityApi();

  // Load cameras from facilities
  useEffect(() => {
    loadCameras();
  }, []);

  const loadCameras = async () => {
    try {
      setLoading(true);
      const response = await getFacilities();
      if (response.success) {
        const allCameras = [];
        response.response.forEach(facility => {
          if (facility.cameras) {
            facility.cameras.forEach(camera => {
              allCameras.push({
                ...camera,
                facilityName: facility.facilityName,
                status: 'Online' // Default status
              });
            });
          }
        });
        setCameras(allCameras);
        if (allCameras.length > 0 && !selectedCamera) {
          setSelectedCamera(allCameras[0]);
        }
        setError(null);
      } else {
        setError(response.errorMsg);
      }
    } catch (err) {
      setError('Failed to load cameras');
      console.error('Error loading cameras:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation from facility page
  useEffect(() => {
    if (location.state?.selectedCamera && cameras.length > 0) {
      const selectedCameraFromState = location.state.selectedCamera;
      
      // If it's a camera object, find by id or name
      let foundCamera;
      if (typeof selectedCameraFromState === 'object') {
        foundCamera = cameras.find(camera => 
          camera.id === selectedCameraFromState.id ||
          camera.cameraName === selectedCameraFromState.cameraName
        );
      } else {
        // If it's a string, find by name
        foundCamera = cameras.find(camera => 
          camera.cameraName?.toLowerCase().includes(selectedCameraFromState.toLowerCase())
        );
      }
      
      if (foundCamera) {
        setSelectedCamera(foundCamera);
      }
    }
  }, [location.state, cameras]);
  
  const filteredCameras = cameras.filter(camera =>
    camera.cameraName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.facilityName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Performance stats data
  const performanceStats = [
    { title: "FPS", value: "30", color: "blue" },
    { title: "Resolution", value: "1920x1080", color: "green" },
    { title: "Uptime", value: "24h", color: "purple" },
    { title: "Storage Used", value: "2.1GB", color: "yellow" }
  ];

  // Analytics stats data
  const analyticsStats = [
    { 
      title: "Motion Detection", 
      value: "127", 
      description: "Events detected",
      color: "orange" 
    },
    { 
      title: "Network Status", 
      value: "98%", 
      description: "Signal strength",
      color: "green" 
    },
    { 
      title: "Recording Time", 
      value: "18:34", 
      description: "Hours recorded",
      color: "cyan" 
    }
  ];

  const handleCameraSelect = (camera) => {
    setSelectedCamera(camera);
  };

  if (loading) {
    return (
      <PageContainer>
        <PageHeader 
          title="Camera Management"
          description="Monitor and manage all your security cameras"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeader 
          title="Camera Management"
          description="Monitor and manage all your security cameras"
        />
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-red-400 text-lg">{error}</div>
          <Button variant="primary" onClick={loadCameras}>
            Retry
          </Button>
        </div>
      </PageContainer>
    );
  }

  if (cameras.length === 0) {
    return (
      <PageContainer>
        <PageHeader 
          title="Camera Management"
          description="Monitor and manage all your security cameras"
        />
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <div className="text-gray-400 text-lg">No cameras found</div>
          <div className="text-gray-500 text-center">
            <p>Add cameras to your facilities to see them here.</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Camera Management"
        description="Monitor and manage all your security cameras"
      />
      
      <TwoColumnLayout
        leftColumn={
          <div className="flex flex-col space-y-6">
            {/* Camera Feed */}
            <CameraFeed 
              camera={selectedCamera} 
              enableWebSocket={true}
            />
            
            {/* Mock Camera Sender for Testing */}
            <MockCameraSender cameraId={selectedCamera?.id || "test_camera_001"} />

            {/* Analytics Section */}
            <Card>
              <h3 className="text-xl font-semibold text-white mb-4">Analytics & Performance</h3>
              
              {/* Performance Stats */}
              <StatsGrid stats={performanceStats} cols="4" className="mb-6" />
              
              {/* Analytics Stats */}
              <StatsGrid stats={analyticsStats} cols="3" />
            </Card>
          </div>
        }
        rightColumn={
          <Sidebar>
            <SidebarHeader>
              <h3 className="text-xl font-semibold text-white mb-4">Camera List</h3>
              
              <SearchInput
                placeholder="Search cameras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SidebarHeader>
            
            <SidebarContent>
              <div className="space-y-3">
                {filteredCameras.map((camera) => (
                  <CameraCard
                    key={camera.id}
                    camera={camera}
                    isSelected={selectedCamera?.id === camera.id}
                    onClick={handleCameraSelect}
                  />
                ))}
              </div>
            </SidebarContent>
          </Sidebar>
        }
      />
    </PageContainer>
  );
}

export default Cameras;
