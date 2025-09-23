import { forwardRef } from "react";

const Grid = forwardRef(({ 
  cols = "1",
  gap = "6",
  className = "",
  children,
  responsive = true,
  ...props 
}, ref) => {
  const responsiveClasses = responsive 
    ? `grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols}`
    : `grid-cols-${cols}`;
  
  return (
    <div
      ref={ref}
      className={`grid ${responsiveClasses} gap-${gap} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const GridItem = forwardRef(({ 
  span = "1",
  className = "",
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`col-span-${span} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Grid.displayName = "Grid";
GridItem.displayName = "GridItem";

export { Grid, GridItem };
export default Grid;