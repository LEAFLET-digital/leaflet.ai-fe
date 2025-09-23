import { forwardRef } from "react";

const Card = forwardRef(({ 
  variant = "default",
  className = "",
  children,
  hover = true,
  padding = "p-6",
  ...props 
}, ref) => {
  const baseClasses = "border-radius-16 transition-all duration-300";
  
  const variants = {
    default: "modern-card",
    glass: "glass-effect",
    solid: "bg-slate-700 border border-slate-600",
    gradient: "gradient-bg"
  };
  
  const hoverEffect = hover ? "hover:transform hover:-translate-y-1" : "";
  const variantClasses = variants[variant] || variants.default;
  
  return (
    <div
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${hoverEffect} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-xl font-semibold text-white ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-gray-300 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`mt-4 pt-4 border-t border-white/10 ${className}`} {...props}>
    {children}
  </div>
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;