const CameraFormFields = ({ 
  formData, 
  onFormDataChange, 
  sides, 
  aiVisionModels 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Camera Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
            className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            placeholder="e.g., Front Entrance Camera"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onFormDataChange({ ...formData, location: e.target.value })}
            className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            placeholder="e.g., Main Entrance Lobby"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Side/Direction *
          </label>
          <select
            value={formData.side}
            onChange={(e) => onFormDataChange({ ...formData, side: e.target.value })}
            className="w-full bg-slate-700 border border-slate-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select Direction</option>
            {sides.map((side) => (
              <option key={side.value} value={side.value}>
                {side.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Area *
          </label>
          <input
            type="text"
            value={formData.area}
            onChange={(e) => onFormDataChange({ ...formData, area: e.target.value })}
            className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            placeholder="e.g., Reception Area, Parking Lot"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          RTSP URL *
        </label>
        <input
          type="url"
          value={formData.rtspUrl}
          onChange={(e) => onFormDataChange({ ...formData, rtspUrl: e.target.value })}
          className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
          placeholder="rtsp://username:password@ip:port/stream"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Example: rtsp://admin:password123@192.168.1.100:554/stream1
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          AI Vision Model Type *
        </label>
        <select
          value={formData.aiVisionModel}
          onChange={(e) => onFormDataChange({ ...formData, aiVisionModel: e.target.value })}
          className="w-full bg-slate-700 border border-slate-500 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
          required
        >
          <option value="">Select AI Model</option>
          {aiVisionModels.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
          className="w-full bg-slate-700 border border-slate-500 text-white placeholder-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
          placeholder="Additional details about camera placement, coverage area, or special notes..."
          rows="3"
        />
      </div>
    </>
  );
};

export default CameraFormFields;