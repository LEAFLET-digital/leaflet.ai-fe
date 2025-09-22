function Dashboard() {
  return (
    <div className="min-h-full p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 glow-text">Dashboard</h1>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Analytics Overview</h3>
            <p className="text-gray-300">View your system analytics and performance metrics.</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Camera Status</h3>
            <p className="text-gray-300">Monitor all connected cameras and their status.</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <p className="text-gray-300">Access frequently used features and settings.</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <p className="text-gray-300">Latest system activity and notifications.</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Storage Usage</h3>
            <p className="text-gray-300">Monitor storage capacity and usage trends.</p>
          </div>
          
          <div className="modern-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">System Health</h3>
            <p className="text-gray-300">Overall system performance and health status.</p>
          </div>
        </div>
        
        {/* Additional content to test scrolling */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Reports</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="modern-card p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Report {item}</h4>
                <p className="text-gray-300">This is a sample report item to demonstrate scrolling behavior in the dashboard layout.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
