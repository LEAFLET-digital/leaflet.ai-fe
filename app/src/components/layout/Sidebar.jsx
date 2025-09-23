import { forwardRef } from "react";

const Sidebar = forwardRef(({ 
  width = "w-80",
  className = "",
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`${width} h-full flex flex-col modern-card p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

const SidebarHeader = ({ className = "", children, ...props }) => (
  <div className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
);

const SidebarContent = ({ className = "", children, scrollable = true, ...props }) => (
  <div 
    className={`flex-1 ${scrollable ? 'overflow-y-auto max-h-[calc(100vh-300px)] pr-2' : ''} ${className}`} 
    {...props}
  >
    {children}
  </div>
);

const SidebarFooter = ({ className = "", children, ...props }) => (
  <div className={`mt-6 pt-6 border-t border-white/10 ${className}`} {...props}>
    {children}
  </div>
);

Sidebar.displayName = "Sidebar";
SidebarHeader.displayName = "SidebarHeader";
SidebarContent.displayName = "SidebarContent";
SidebarFooter.displayName = "SidebarFooter";

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };
export default Sidebar;