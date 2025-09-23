import { forwardRef } from "react";

const Badge = forwardRef(({ 
  variant = "default",
  size = "md",
  className = "",
  children,
  dot = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full transition-colors";
  
  const variants = {
    default: "bg-gray-500/20 text-gray-300",
    primary: "bg-blue-500/20 text-blue-400",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    danger: "bg-red-500/20 text-red-400",
    info: "bg-cyan-500/20 text-cyan-400",
    online: "bg-green-500/20 text-green-400",
    offline: "bg-red-500/20 text-red-400"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };
  
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.md;
  
  return (
    <span
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-2 h-2 rounded-full mr-2 ${
          variant === 'success' || variant === 'online' ? 'bg-green-400' :
          variant === 'danger' || variant === 'offline' ? 'bg-red-400' :
          variant === 'warning' ? 'bg-yellow-400' :
          variant === 'info' ? 'bg-cyan-400' :
          variant === 'primary' ? 'bg-blue-400' : 'bg-gray-400'
        }`} />
      )}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;