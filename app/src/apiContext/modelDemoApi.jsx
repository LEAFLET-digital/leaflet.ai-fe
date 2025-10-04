import { useCallback } from "react";
import { useHttpsApiResponse } from "./HttpsApiResponse";

const modelDemoApi = () => {
  const { get, post, deleteMe } = useHttpsApiResponse();

  const startInference = useCallback(
    async (modelData) => {
      return await post("api/cvmodel/", modelData);
    },
    [post]
  );

  const stopInference = useCallback(
    async (modelData) => {
      console.log("Stopping inference with data:", modelData.task_id);
      const { task_id } = modelData; // ✅ extract task_id from modelData
      return await deleteMe(`/api/cvmodel/?taskId=${task_id}`);
    },
    [deleteMe]
  );

  const getAllModels = useCallback(async () => {
    const response = await get("api/cvmodel/models/", {});
    return response;
  }, [get]);

  return {
    startInference,
    stopInference,
    getAllModels,
  };
};

export default modelDemoApi;
