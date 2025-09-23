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
    default: "bg-gray-600 text-gray-100 border border-gray-500",
    primary: "bg-blue-600 text-blue-100 border border-blue-500",
    success: "bg-green-600 text-green-100 border border-green-500",
    warning: "bg-yellow-600 text-yellow-100 border border-yellow-500",
    danger: "bg-red-600 text-red-100 border border-red-500",
    info: "bg-cyan-600 text-cyan-100 border border-cyan-500",
    online: "bg-green-600 text-green-100 border border-green-500",
    offline: "bg-red-600 text-red-100 border border-red-500"
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