import { useCallback } from "react";
import { useHttpsApiResponse } from "./httpsResponseContext";

const modelDemoApi = () => {
  const { get, post, deleteMe } = useHttpsApiResponse();

  const startInference = useCallback(
    async (modelData) => {
      // Start a model stream / inference. Backend expects POST to /api/cvmodel/camera/ or handle-camera-preview depending on flow.
      // For starting inference from UI we'll call camera endpoint when creating a camera, and handle-camera-preview for preview actions.
      return await post(`/api/cvmodel/camera/`, modelData);
    },
    [post]
  );

  const stopInference = useCallback(
    async (modelData) => {
      console.log("Stopping inference with data:", modelData.task_id);
      const { task_id } = modelData; // ✅ extract task_id from modelData
      // Backend expects DELETE on camera preview endpoint with query param taskId
      return await deleteMe(`/api/cvmodel/handle-camera-preview/?taskId=${task_id}`);
    },
    [deleteMe]
  );

  const getAllModels = useCallback(async () => {
    const response = await get(`/api/cvmodel/models/`);
    return response;
  }, [get]);

  return {
    startInference,
    stopInference,
    getAllModels,
  };
};

export default modelDemoApi;
