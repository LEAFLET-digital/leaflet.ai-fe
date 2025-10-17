import { useState } from 'react';
import { Card, Button } from '../ui';

const AddFacilityModal = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facilityData = {
      facilityName: formData.name,
      location: formData.location,
      description: formData.description,
      organization: ''
    };
    
    await onSubmit(facilityData);
    setFormData({ name: '', location: '', description: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Facility</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
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
              onClick={onClose}
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

export default AddFacilityModal;