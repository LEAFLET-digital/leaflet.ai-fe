import { forwardRef } from "react";
import { Card, Button } from "../ui";

const EmptyState = forwardRef(({ 
  icon = "📁",
  title = "No data found",
  description = "There's nothing to show here yet.",
  action,
  actionText = "Get Started",
  onAction,
  className = "",
  ...props 
}, ref) => {
  return (
    <Card
      ref={ref}
      className={`text-center py-12 ${className}`}
      variant="glass"
      {...props}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
      
      {(action || onAction) && (
        <div>
          {action || (
            <Button onClick={onAction} variant="primary">
              {actionText}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
});

EmptyState.displayName = "EmptyState";

export default EmptyState;