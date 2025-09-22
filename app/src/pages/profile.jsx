function Profile() {
  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 glow-text">Profile</h1>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="modern-card p-6 text-center">
              <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-gray-400">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">John Doe</h3>
              <p className="text-gray-300 mb-4">Administrator</p>
              <button className="modern-btn w-full">
                Change Avatar
              </button>
            </div>
          </div>
          
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="modern-card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Role</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none">
                    <option>Administrator</option>
                    <option>Operator</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button className="modern-btn mr-4">
                    Save Changes
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modern-card p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-6">Security</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg text-white transition-colors">
                  Change Password
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-white transition-colors">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;