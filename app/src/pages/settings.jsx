function Settings() {
  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 glow-text">Settings</h1>
        
        {/* Settings Content */}
        <div className="space-y-6">
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">System Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Enter system name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Timezone</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Camera Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto-recording</span>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                  Enabled
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Motion detection</span>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                  Enabled
                </button>
              </div>
            </div>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email notifications</span>
                <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                  Disabled
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Push notifications</span>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                  Enabled
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;