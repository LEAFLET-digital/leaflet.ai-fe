import { forwardRef } from "react";

const PageContainer = forwardRef(({ 
  maxWidth = "7xl",
  padding = "p-6",
  className = "",
  children,
  ...props 
}, ref) => {
  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    "full": "max-w-full",
    "none": ""
  };
  
  const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses["7xl"];
  
  return (
    <div
      ref={ref}
      className={`min-h-full ${padding} ${className}`}
      {...props}
    >
      <div className={`${maxWidthClass} mx-auto`}>
        {children}
      </div>
    </div>
  );
});

PageContainer.displayName = "PageContainer";

export default PageContainer;