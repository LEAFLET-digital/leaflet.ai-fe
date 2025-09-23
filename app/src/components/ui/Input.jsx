import { forwardRef, useState } from "react";

const Input = forwardRef(({ 
  type = "text",
  variant = "default",
  size = "md",
  className = "",
  error,
  label,
  placeholder,
  icon,
  rightIcon,
  disabled = false,
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  
  const baseClasses = "w-full border rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    glass: "glass-effect border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
    solid: "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };
  
  const variantClasses = error 
    ? "bg-slate-800 border-red-500 text-white placeholder-gray-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
    : variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.md;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            ${baseClasses} 
            ${variantClasses} 
            ${sizeClasses} 
            ${icon ? "pl-10" : ""} 
            ${rightIcon ? "pr-10" : ""} 
            ${className}
          `}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;