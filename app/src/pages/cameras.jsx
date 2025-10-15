import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import modelDemoApi from '../apiContext/modelDemoApi';
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
  Card
} from '../components';

function Cameras() {
  const location = useLocation();
  const { startInference, stopInference } = modelDemoApi();

  const [selectedCamera, setSelectedCamera] = useState({
    id: 1,
    name: 'Camera 1',
    status: 'Online',
    fps: 30,
    resolution: '1920x1080',
    location: 'Front Door',
    task_id: null,
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

  // keep local mutable camera list for demo; in future populate from API
  const [cameraList, setCameraList] = useState(cameras);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewTaskId, setPreviewTaskId] = useState(null);

  // Handle navigation from facility page
  useEffect(() => {
    if (location.state?.selectedCamera) {
      const cameraName = location.state.selectedCamera;
      const facility = location.state.facility;
      
      // Try to find a matching camera or create a temporary one
      const foundCamera = cameras.find(camera => 
        camera.name.toLowerCase().includes(cameraName.toLowerCase())
      );
      
      if (foundCamera) {
        setSelectedCamera(foundCamera);
      } else {
        // Create a temporary camera entry for the one from facility
        setSelectedCamera({
          id: cameras.length + 1,
          name: cameraName,
          status: 'Online',
          fps: 30,
          resolution: '1920x1080',
          location: facility || 'Unknown Location'
        });
      }
      
      // Set search term to highlight the camera
      setSearchTerm('');
    }
  }, [location.state]);
  
  const filteredCameras = cameras.filter(camera =>
    camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Performance stats data
  const performanceStats = [
    { title: "FPS", value: selectedCamera.fps, color: "blue" },
    { title: "Resolution", value: selectedCamera.resolution, color: "green" },
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

  const handleStartPreview = async (cameraId) => {
    // Start preview via API
    try {
      const payload = {
        cameraId,
        // If backend expects rtsp/model info, include from camera
        rtspUrl: selectedCamera.rtspUrl || '',
        modelType: selectedCamera.modelType || 'Computer Vision',
        modelTopic: selectedCamera.modelTopic || 'Human-detection',
      };
      const res = await startInference(payload);
      if (res?.success) {
        const taskId = res.response?.task_id || res.response?.taskId || res.response?.id || null;
        setIsPreviewing(true);
        setPreviewTaskId(taskId);
        setSelectedCamera((c) => ({ ...c, task_id: taskId }));
      } else {
        console.error('Start preview failed', res.errorMsg);
      }
    } catch (err) {
      console.error('Start preview error', err);
    }
  };

  const handleStopPreview = async (taskId) => {
    try {
      const res = await stopInference({ task_id: taskId });
      if (res?.success) {
        setIsPreviewing(false);
        setPreviewTaskId(null);
        setSelectedCamera((c) => ({ ...c, task_id: null }));
      } else {
        console.error('Stop preview failed', res.errorMsg);
      }
    } catch (err) {
      console.error('Stop preview error', err);
    }
  };

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
            <CameraFeed camera={selectedCamera} />
            
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
                    isSelected={selectedCamera.id === camera.id}
                    onClick={handleCameraSelect}
                    onViewLive={(cam) => {
                      // when clicking View Live from card, select and start preview
                      setSelectedCamera(cam);
                      handleStartPreview(cam.id || cam.name);
                    }}
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
