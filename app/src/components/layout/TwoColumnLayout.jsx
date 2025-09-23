import { forwardRef } from "react";

const TwoColumnLayout = forwardRef(({ 
  leftColumn,
  rightColumn,
  leftWidth = "flex-1",
  rightWidth = "w-80",
  gap = "gap-6",
  className = "",
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`flex ${gap} h-[calc(100vh-200px)] ${className}`}
      {...props}
    >
      <div className={leftWidth}>
        {leftColumn}
      </div>
      <div className={rightWidth}>
        {rightColumn}
      </div>
    </div>
  );
});

TwoColumnLayout.displayName = "TwoColumnLayout";

export default TwoColumnLayout;