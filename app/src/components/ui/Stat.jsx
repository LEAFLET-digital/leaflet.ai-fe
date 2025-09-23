import { forwardRef } from "react";

const Stat = forwardRef(({ 
  title,
  value,
  description,
  icon,
  color = "blue",
  change,
  changeType,
  className = "",
  ...props 
}, ref) => {
  const colorClasses = {
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    cyan: "text-cyan-400",
    orange: "text-orange-400"
  };
  
  const colorClass = colorClasses[color] || colorClasses.blue;
  
  return (
    <div
      ref={ref}
      className={`bg-slate-800/50 rounded-lg p-4 text-center ${className}`}
      {...props}
    >
      {icon && (
        <div className={`text-2xl mb-2 ${colorClass}`}>
          {icon}
        </div>
      )}
      {title && (
        <div className="text-sm text-gray-400 mb-1">{title}</div>
      )}
      <div className={`text-2xl font-bold ${colorClass}`}>
        {value}
      </div>
      {description && (
        <div className="text-sm text-gray-400 mt-1">{description}</div>
      )}
      {change && (
        <div className={`text-xs mt-2 ${
          changeType === 'positive' ? 'text-green-400' :
          changeType === 'negative' ? 'text-red-400' :
          'text-gray-400'
        }`}>
          {changeType === 'positive' && '↗ '}
          {changeType === 'negative' && '↘ '}
          {change}
        </div>
      )}
    </div>
  );
});

Stat.displayName = "Stat";

export default Stat;