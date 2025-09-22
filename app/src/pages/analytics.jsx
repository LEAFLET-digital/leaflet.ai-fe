function Analytics() {
  return (
    <div className="min-h-full p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 glow-text">Analytics</h1>
        
        {/* Analytics Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">System Performance</h3>
            <div className="h-32 bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-400">Performance Chart</p>
            </div>
            <p className="text-sm text-gray-300">CPU, Memory, Network usage</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Camera Analytics</h3>
            <div className="h-32 bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-400">Activity Graph</p>
            </div>
            <p className="text-sm text-gray-300">Detection events and activity</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Storage Usage</h3>
            <div className="h-32 bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-400">Storage Chart</p>
            </div>
            <p className="text-sm text-gray-300">Disk usage and capacity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;