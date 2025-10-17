import { useState, useEffect } from 'react';
import { Card, Button } from '../ui';
import CameraFormFields from './CameraFormFields';

const EditCameraModal = ({ 
  isOpen, 
  onClose, 
  selectedCamera, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    side: '',
    area: '',
    rtspUrl: '',
    aiVisionModel: '',
    description: ''
  });

  // Initialize form with selected camera data
  useEffect(() => {
    if (selectedCamera) {
      setFormData({
        name: selectedCamera.cameraName || selectedCamera.name || '',
        location: selectedCamera.location || '',
        side: selectedCamera.direction || '',
        area: selectedCamera.area || '',
        rtspUrl: selectedCamera.rtspUrl || '',
        aiVisionModel: selectedCamera.modelTopic || '',
        description: selectedCamera.description || ''
      });
    }
  }, [selectedCamera]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCamera) return;
    
    const cameraData = {
      cameraName: formData.name,
      location: formData.location,
      direction: formData.side,
      area: formData.area,
      rtspUrl: formData.rtspUrl,
      description: formData.description,
      modelTopic: formData.aiVisionModel,
      modelType: 'Computer Vision'
    };
    
    await onSubmit(cameraData);
  };

  if (!isOpen || !selectedCamera) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Edit Camera</h2>
            <p className="text-gray-400 text-sm">Editing: {selectedCamera.cameraName || selectedCamera.name}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <CameraFormFields
            formData={formData}
            onFormDataChange={setFormData}
            sides={sides}
            aiVisionModels={aiVisionModels}
          />
          
          <div className="flex gap-3 pt-6 border-t border-slate-600">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Update Camera
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditCameraModal;