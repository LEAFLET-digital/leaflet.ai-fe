import { useCallback } from "react";
import { useHttpsApiResponse } from "./httpsResponseContext";

const userApi = () => {
  const { get, put } = useHttpsApiResponse();

  const fetchUserData = useCallback(async () => {
    const response = await get(`/api/user/user-info/`);
    if (!response.success) {
      throw new Error(response.errorMsg || "Failed to fetch user data");
    }
    return response.response;
  }, [get]);

  const updateUser = useCallback(
    async (userData) => {
      const response = await put(`/api/user/user-info/`, userData);
      if (!response.success) {
        throw new Error(response.errorMsg || "Failed to update user");
      }
      return response.response;
    },
    [put]
  );

  return {
    fetchUserData,
    updateUser,
  };
};

export default userApi;
