import { useState } from 'react';
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
