import { forwardRef } from "react";
import { Card } from "../ui";
import Badge from "../ui/Badge";

const CameraCard = forwardRef(({ 
  camera,
  isSelected = false,
  onClick,
  className = "",
  ...props 
}, ref) => {
  if (!camera) return null;
  
  const statusVariant = {
    'Online': 'success',
    'Offline': 'danger',
    'Warning': 'warning'
  }[camera.status] || 'default';
  
  return (
    <Card
      ref={ref}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-blue-600/30 border-2 border-blue-500'
          : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
      } ${className}`}
      padding="p-4"
      onClick={() => onClick?.(camera)}
      {...props}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-white">{camera.name}</h4>
        <Badge variant={statusVariant} dot size="sm">
          {camera.status}
        </Badge>
      </div>
      
      <p className="text-sm text-gray-400 mb-2">{camera.location}</p>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{camera.resolution}</span>
        <span>{camera.fps} FPS</span>
      </div>
    </Card>
  );
});

CameraCard.displayName = "CameraCard";

export default CameraCard;