import { forwardRef } from "react";

const PageHeader = forwardRef(({ 
  title,
  description,
  actions,
  breadcrumb,
  className = "",
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`mb-8 ${className}`}
      {...props}
    >
      {breadcrumb && (
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            {breadcrumb.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {item.href ? (
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className={index === breadcrumb.length - 1 ? "text-white font-medium" : ""}>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl font-bold text-white glow-text">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-lg text-gray-300">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
});

PageHeader.displayName = "PageHeader";

export default PageHeader;