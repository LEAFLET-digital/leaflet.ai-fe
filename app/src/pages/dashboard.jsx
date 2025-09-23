import { PageContainer, PageHeader, Grid, Card, CardHeader, CardTitle, CardDescription } from '../components';

function Dashboard() {
  const dashboardCards = [
    {
      title: "Analytics Overview",
      description: "View your system analytics and performance metrics."
    },
    {
      title: "Camera Status", 
      description: "Monitor all connected cameras and their status."
    },
    {
      title: "Quick Actions",
      description: "Access frequently used features and settings."
    },
    {
      title: "Recent Activity",
      description: "Latest system activity and notifications."
    },
    {
      title: "Storage Usage",
      description: "Monitor storage capacity and usage trends."
    },
    {
      title: "System Health",
      description: "Overall system performance and health status."
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard"
        description="Monitor your security system at a glance"
      />
      
      {/* Dashboard Content */}
      <Grid cols="3" className="mb-8">
        {dashboardCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </Grid>
      
      {/* Recent Reports Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Reports</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Card key={item} padding="p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Report {item}</h4>
              <p className="text-gray-300">This is a sample report item to demonstrate scrolling behavior in the dashboard layout.</p>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;
