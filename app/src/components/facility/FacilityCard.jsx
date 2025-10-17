import { Card, Badge, Button } from '../ui';

const FacilityCard = ({ 
  facility, 
  onEdit, 
  onAddCamera, 
  onCameraClick 
}) => {
  const statusVariant = 'success'; // Default to active since backend doesn't return status
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{facility.facilityName}</h3>
          <p className="text-gray-300 text-sm mb-1">{facility.location}</p>
          <p className="text-gray-400 text-xs">{facility.description}</p>
        </div>
        <Badge variant={statusVariant} size="sm">
          Active
        </Badge>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 text-sm font-medium">Cameras</span>
          <Badge variant="primary" size="sm">
            {facility.cameras?.length || 0}
          </Badge>
        </div>
        
        <div className="space-y-2">
          {(facility.cameras || []).slice(0, 2).map((camera, index) => (
            <div 
              key={camera.id || index} 
              className="bg-slate-600/80 border border-slate-500 rounded-lg p-3 cursor-pointer hover:bg-slate-600 hover:border-slate-400 transition-all duration-200 hover:shadow-lg"
              onClick={() => onCameraClick(camera, facility.facilityName)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">{camera.cameraName}</span>
                </div>
                <Badge variant="success" size="sm">Online</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 text-gray-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>1920x1080</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>30 FPS</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{camera.direction || camera.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{camera.modelTopic || 'Human Detection'}</span>
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t border-slate-500">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Last Activity</span>
                  <span className="text-xs text-green-400">2 min ago</span>
                </div>
              </div>
            </div>
          ))}
          
          {(facility.cameras?.length || 0) > 2 && (
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">
                  +{(facility.cameras?.length || 0) - 2} more cameras
                </span>
              </div>
            </div>
          )}
          
          {(!facility.cameras || facility.cameras.length === 0) && (
            <div className="bg-slate-700/30 border border-slate-600 border-dashed rounded-lg p-4 text-center">
              <svg className="w-6 h-6 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-500">No cameras added yet</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-auto">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(facility)}
        >
          Manage
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onAddCamera(facility.id)}
        >
          Add Camera
        </Button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-600">
        <p className="text-xs text-gray-500">
          Created: {new Date(facility.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
};

export default FacilityCard;