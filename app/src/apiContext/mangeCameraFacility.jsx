import { useCallback } from "react";
import { useHttpsApiResponse } from "./httpsResponseContext";

const manageCameraFacilityApi = () => {
  const { get, post, deleteMe, put } = useHttpsApiResponse();

  // Camera Preview/Inference APIs
  const startInference = useCallback(
    async (modelData) => {
      return await post("api/cvmodel/handle-camera-preview/", modelData);
    },
    [post]
  );

  const stopInference = useCallback(
    async (modelData) => {
      console.log("Stopping inference with data:", modelData.task_id);
      const { task_id } = modelData;
      return await deleteMe(`api/cvmodel/handle-camera-preview/?taskId=${task_id}`);
    },
    [deleteMe]
  );

  // Camera Management APIs
  const addCamera = useCallback(
    async (cameraData) => {
      return await post("api/cvmodel/camera/", cameraData);
    },
    [post]
  );

  const updateCamera = useCallback(
    async (cameraData) => {
      return await put("api/cvmodel/camera/", cameraData);
    },
    [put]
  );

  const deleteCamera = useCallback(
    async (cameraId) => {
      return await deleteMe(`api/cvmodel/camera/?cameraId=${cameraId}`);
    },
    [deleteMe]
  );

  // Facility Management APIs
  const getFacilities = useCallback(async () => {
    const response = await get("api/cvmodel/facility/");
    return response;
  }, [get]);

  const addFacility = useCallback(
    async (facilityData) => {
      return await post("api/cvmodel/facility/", facilityData);
    },
    [post]
  );

  const updateFacility = useCallback(
    async (facilityId, facilityData) => {
      return await put(`api/cvmodel/facility/?facilityId=${facilityId}`, facilityData);
    },
    [put]
  );

  const deleteFacility = useCallback(
    async (facilityId) => {
      return await deleteMe(`api/cvmodel/facility/?facilityId=${facilityId}`);
    },
    [deleteMe]
  );

  // Models API
  const getAllModels = useCallback(async () => {
    const response = await get("api/cvmodel/models/");
    return response;
  }, [get]);

  return {
    // Camera Preview/Inference
    startInference,
    stopInference,
    // Camera Management
    addCamera,
    updateCamera,
    deleteCamera,
    // Facility Management
    getFacilities,
    addFacility,
    updateFacility,
    deleteFacility,
    // Models
    getAllModels,
  };
};

export default manageCameraFacilityApi;
