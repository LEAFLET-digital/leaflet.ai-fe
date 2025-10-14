import { useState, useEffect } from 'react';
import userApi from '../apiContext/UserApi';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    phone_number: '',
    company_name: '',
    job_title: '',
    date_of_birth: '',
    address: '',
    description: ''
  });
  const [originalData, setOriginalData] = useState({});

  const { fetchUserData, updateUser } = userApi();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserData();
        setUserData(data);
        
        // Format date for input field
        const formattedData = {
          ...data,
          date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : ''
        };
        
        setFormData(formattedData);
        setOriginalData(formattedData);
      } catch (err) {
        console.error('Error loading user data:', err);
        if (err.message?.includes('Authentication credentials')) {
          setError('Please log in again to access your profile');
        } else {
          setError(err.message || 'Failed to load user data');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [fetchUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSuccess(false); // Clear success message when user starts editing
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      // Only send changed fields
      const changedFields = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== originalData[key]) {
          changedFields[key] = formData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        setError('No changes to save');
        return;
      }

      const updatedData = await updateUser(changedFields);
      setUserData(updatedData.user || updatedData);
      setOriginalData(formData);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setError(null);
    setSuccess(false);
  };

  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== originalData[key]);
  };

  if (loading) {
    return (
      <div className="min-h-full p-6 flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="min-h-full p-6 flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  const displayName = `${formData.first_name || ''} ${formData.last_name || ''}`.trim() || formData.username || 'User';
  const roleDisplay = formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : 'User';

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 glow-text">Profile</h1>
        
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-400">
            Profile updated successfully!
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSave}>
          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="modern-card p-6 text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {formData.profile_picture ? (
                    <img 
                      src={formData.profile_picture} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-400">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{displayName}</h3>
                <p className="text-gray-300 mb-4">{roleDisplay}</p>
                <p className="text-sm text-gray-400 mb-4">
                  Member since {userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}
                </p>
                <button type="button" className="modern-btn w-full" disabled>
                  Change Avatar
                </button>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="modern-card p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Username</label>
                      <input 
                        type="text" 
                        name="username"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly
                        title="Email cannot be changed"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="first_name"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="last_name"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Role</label>
                      <select 
                        name="role"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="admin">Administrator</option>
                        <option value="operator">Operator</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone_number"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.phone_number || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        name="company_name"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.company_name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Job Title</label>
                      <input 
                        type="text" 
                        name="job_title"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        value={formData.job_title || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Date of Birth</label>
                    <input 
                      type="date" 
                      name="date_of_birth"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      value={formData.date_of_birth || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Address</label>
                    <textarea 
                      name="address"
                      rows={3}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Description</label>
                    <textarea 
                      name="description"
                      rows={3}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button 
                      type="submit" 
                      className={`modern-btn flex-1 ${!hasChanges() || saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!hasChanges() || saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button"
                      onClick={handleCancel}
                      className={`bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors flex-1 ${!hasChanges() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!hasChanges()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="modern-card p-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-6">Security</h3>
                <div className="space-y-4">
                  <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg text-white transition-colors">
                    Change Password
                  </button>
                  <button type="button" className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-white transition-colors">
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;