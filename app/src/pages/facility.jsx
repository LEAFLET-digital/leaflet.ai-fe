import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  PageContainer,
  PageHeader,
  Grid,
  Button,
  SearchInput,
  FacilityCard,
  FacilityManageModal,
  AddFacilityModal,
  AddCameraModal,
  EditCameraModal
} from '../components';
import manageCameraFacilityApi from '../apiContext/mangeCameraFacility';

function Facility() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showEditCameraModal, setShowEditCameraModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedFacilityForCamera, setSelectedFacilityForCamera] = useState(null);
  const [selectedCameraForEdit, setSelectedCameraForEdit] = useState(null);

  const { 
    getFacilities, 
    addFacility, 
    updateFacility, 
    deleteFacility, 
    addCamera, 
    updateCamera, 
    deleteCamera 
  } = manageCameraFacilityApi();
  
  const filteredFacilities = facilities.filter(facility =>
    facility.facilityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load facilities on component mount
  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      const response = await getFacilities();
      if (response.success) {
        setFacilities(response.response);
        setError(null);
      } else {
        setError(response.errorMsg);
      }
    } catch (err) {
      setError('Failed to load facilities');
      console.error('Error loading facilities:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleCreateFacility = async (facilityData) => {
    try {
      const response = await addFacility(facilityData);
      if (response.success) {
        await loadFacilities(); // Refresh the list
        setShowAddModal(false);
      } else {
        setError(response.errorMsg);
      }
    } catch (err) {
      setError('Failed to create facility');
      console.error('Error creating facility:', err);
    }
  };

  const handleUpdateFacility = async (facilityData) => {
    try {
      const response = await updateFacility(selectedFacility.id, facilityData);
      if (response.success) {
        await loadFacilities(); // Refresh the list
        setShowManageModal(false);
        setSelectedFacility(null);
      } else {
        setError(response.errorMsg);
      }
    } catch (err) {
      setError('Failed to update facility');
      console.error('Error updating facility:', err);
    }
  };

  const handleDeleteFacility = async (facilityId) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        const response = await deleteFacility(facilityId);
        if (response.success) {
          await loadFacilities(); // Refresh the list
        } else {
          setError(response.errorMsg);
        }
      } catch (err) {
        setError('Failed to delete facility');
        console.error('Error deleting facility:', err);
      }
    }
  };

  const handleCreateCamera = async (cameraData) => {
    try {
      const response = await addCamera({
        ...cameraData,
        facilityId: selectedFacilityForCamera.id
      });
      if (response.success) {
        await loadFacilities(); // Refresh the list
        setShowCameraModal(false);
        setSelectedFacilityForCamera(null);
      } else {
        setError(response.errorMsg);
      }
    } catch (err) {
      setError('Failed to add camera');
      console.error('Error adding camera:', err);
    }
  };

  const handleCameraClick = (camera, facilityName) => {
    // Navigate to cameras page with camera information
    if (userId) {
      navigate(`/dashboard/${userId}/cameras`, {
        state: {
          selectedCamera: camera,
          facility: facilityName
        }
      });
    }
  };

  const handleEditCamera = (camera) => {
    setSelectedCameraForEdit(camera);
    setShowEditCameraModal(true);
  };

  const handleUpdateCamera = async (cameraData) => {
    try {
      const response = await updateCamera({
        cameraId: selectedCameraForEdit.id,
        cameraName: cameraData.cameraName,
        location: cameraData.location,
        direction: cameraData.direction,
        area: cameraData.area,
        rtspUrl: cameraData.rtspUrl,
        description: cameraData.description
      });
      if (response.success) {
        await loadFacilities(); // Refresh the list
        setShowEditCameraModal(false);
        setSelectedCameraForEdit(null);
      } else {
        setError(response.errorMsg);
      }
    } catch (err) {
      setError('Failed to update camera');
      console.error('Error updating camera:', err);
    }
  };

  const handleDeleteCamera = async (cameraId) => {
    if (window.confirm('Are you sure you want to delete this camera?')) {
      try {
        const response = await deleteCamera(cameraId);
        if (response.success) {
          await loadFacilities(); // Refresh the list
        } else {
          setError(response.errorMsg || 'Failed to delete camera');
        }
      } catch (err) {
        setError('Failed to delete camera');
        console.error('Error deleting camera:', err);
      }
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <PageHeader 
          title="Facility Management"
          description="Manage your facilities and their associated cameras"
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
          title="Facility Management"
          description="Manage your facilities and their associated cameras"
        />
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-red-400 text-lg">{error}</div>
          <Button variant="primary" onClick={loadFacilities}>
            Retry
          </Button>
        </div>
      </PageContainer>
    );
  }

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

      {filteredFacilities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="text-gray-400 text-lg">No facilities found</div>
          <Button variant="primary" onClick={handleAddFacility}>
            Create your first facility
          </Button>
        </div>
      ) : (
        <Grid cols="1" mdCols="2" lgCols="3" gap="6">
          {filteredFacilities.map((facility) => (
            <FacilityCard 
              key={facility.id} 
              facility={facility}
              onEdit={handleEditFacility}
              onAddCamera={handleAddCamera}
              onCameraClick={handleCameraClick}
            />
          ))}
        </Grid>
      )}
      
      <FacilityManageModal 
        isOpen={showManageModal}
        onClose={() => {
          setShowManageModal(false);
          setSelectedFacility(null);
        }}
        selectedFacility={selectedFacility}
        onCameraClick={handleCameraClick}
        onEditCamera={handleEditCamera}
        onDeleteCamera={handleDeleteCamera}
        onAddCamera={handleAddCamera}
      />
      
      <AddCameraModal 
        isOpen={showCameraModal}
        onClose={() => {
          setShowCameraModal(false);
          setSelectedFacilityForCamera(null);
        }}
        selectedFacility={selectedFacilityForCamera}
        onSubmit={handleCreateCamera}
      />
      
      <EditCameraModal 
        isOpen={showEditCameraModal}
        onClose={() => {
          setShowEditCameraModal(false);
          setSelectedCameraForEdit(null);
        }}
        selectedCamera={selectedCameraForEdit}
        onSubmit={handleUpdateCamera}
      />
      
      <AddFacilityModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateFacility}
      />
    </PageContainer>
  );
}

export default Facility;