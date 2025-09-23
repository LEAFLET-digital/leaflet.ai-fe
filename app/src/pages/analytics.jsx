import { PageContainer, PageHeader, Grid, Card, CardHeader, CardTitle, CardDescription } from '../components';

function Analytics() {
  const analyticsCards = [
    {
      title: "System Performance",
      description: "CPU, Memory, Network usage",
      chartType: "Performance Chart"
    },
    {
      title: "Camera Analytics", 
      description: "Detection events and activity",
      chartType: "Activity Graph"
    },
    {
      title: "Storage Usage",
      description: "Disk usage and capacity",
      chartType: "Storage Chart"
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Analytics"
        description="Deep insights into your security system performance"
      />
      
      {/* Analytics Content */}
      <Grid cols="3">
        {analyticsCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <div className="h-32 bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-400">{card.chartType}</p>
            </div>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
}

export default Analytics;