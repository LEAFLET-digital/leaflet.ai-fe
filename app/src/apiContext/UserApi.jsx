import { useCallback } from "react";
import { useHttpsApiResponse } from "./HttpsApiResponse";

const userApi = () => {
  const { get, post } = useHttpsApiResponse();

  const fetchUserData = useCallback(async () => {
    const response = await get(`/api/user/`);
    if (!response.success) {
      throw new Error(response.errorMsg || "Failed to fetch user data");
    }
    return response.response;
  }, [get]);

  const createNewUser = useCallback(
    async (userData) => {
      const response = await post(`/api/user/`, userData);
      if (!response.success) {
        throw new Error(response.errorMsg || "Failed to create new user");
      }
      return response.response;
    },
    [post]
  );

  return {
    fetchUserData,
    createNewUser,
  };
};

export default userApi;
