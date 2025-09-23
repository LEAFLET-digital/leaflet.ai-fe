import { forwardRef } from "react";

const Button = forwardRef(({ 
  variant = "primary", 
  size = "md", 
  className = "",
  children,
  disabled = false,
  loading = false,
  icon,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "modern-btn text-white hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500",
    secondary: "glass-effect text-white border border-white/20 hover:bg-white/10 hover:border-white/40 focus:ring-white/50",
    ghost: "text-white hover:bg-white/10 focus:ring-white/50",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500",
    success: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };
  
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  
  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;