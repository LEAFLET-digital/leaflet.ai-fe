import { forwardRef } from "react";

const Loading = forwardRef(({ 
  size = "md",
  color = "blue",
  text,
  overlay = false,
  className = "",
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };
  
  const colors = {
    blue: "border-blue-500",
    white: "border-white",
    gray: "border-gray-500"
  };
  
  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.blue;
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeClass} border-4 border-gray-300 border-t-transparent rounded-full animate-spin ${colorClass}`}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-400">{text}</p>
      )}
    </div>
  );
  
  if (overlay) {
    return (
      <div
        ref={ref}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}
        {...props}
      >
        {spinner}
      </div>
    );
  }
  
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center p-4 ${className}`}
      {...props}
    >
      {spinner}
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;