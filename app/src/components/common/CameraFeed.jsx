import { forwardRef } from "react";
import { Card, Badge } from "../ui";

const CameraFeed = forwardRef(({ 
  camera,
  width = "w-[800px]",
  height = "h-[410px]",
  className = "",
  onStartPreview, // (cameraId) => Promise
  onStopPreview, // (taskId) => Promise
  isPreviewing = false,
  previewTaskId = null,
  ...props 
}, ref) => {
  if (!camera) return null;
  
  const statusVariant = {
    'Online': 'success',
    'Offline': 'danger',
    'Warning': 'warning'
  }[camera.status] || 'default';
  
  return (
    <Card ref={ref} className={className} {...props}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">{camera.name}</h2>
        <Badge variant={statusVariant}>
          {camera.status}
        </Badge>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className={`${width} ${height} bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center relative overflow-hidden`}>
          {camera.status === 'Online' ? (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-lg">Live Feed</p>
                  <p className="text-gray-400 text-sm">{camera.location}</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-red-600 w-3 h-3 rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                REC
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {!isPreviewing ? (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartPreview?.(camera.id || camera.cameraId || camera.name);
                    }}
                  >
                    Start Preview
                  </button>
                ) : (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStopPreview?.(previewTaskId);
                    }}
                  >
                    Stop Preview
                  </button>
                )}
                {previewTaskId && (
                  <span className="text-xs text-gray-200 ml-2">Task: {previewTaskId}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl text-gray-600 mb-4">📹</div>
              <p className="text-gray-400 text-lg">Camera {camera.status}</p>
              <p className="text-gray-500 text-sm">{camera.location}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
});

CameraFeed.displayName = "CameraFeed";

export default CameraFeed;