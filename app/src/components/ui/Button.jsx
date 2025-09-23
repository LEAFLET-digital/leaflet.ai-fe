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
    primary: "bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-slate-600 text-white border border-slate-500 hover:bg-slate-700 focus:ring-slate-500",
    ghost: "bg-transparent text-white border border-slate-600 hover:bg-slate-700 focus:ring-slate-500",
    danger: "bg-red-600 text-white border border-red-500 hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white border border-green-500 hover:bg-green-700 focus:ring-green-500"
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