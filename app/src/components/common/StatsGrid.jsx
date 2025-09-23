import { forwardRef } from "react";
import { Grid, Stat } from "../ui";

const StatsGrid = forwardRef(({ 
  stats = [],
  cols = "4",
  className = "",
  ...props 
}, ref) => {
  return (
    <Grid
      ref={ref}
      cols={cols}
      responsive={true}
      className={className}
      {...props}
    >
      {stats.map((stat, index) => (
        <Stat
          key={stat.id || index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </Grid>
  );
});

StatsGrid.displayName = "StatsGrid";

export default StatsGrid;