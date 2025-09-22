import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useCallback, useContext } from "react";
import { useUserContext } from "../context/UserSelf";

export const HttpsApiResponse = createContext(undefined);

const AxiosService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

const createApiErrorResponse = (error) => {
  let errorMessage = "An error occurred while processing your request.";

  if (error.response) {
    errorMessage = error.response.data?.detail || errorMessage;
  } else if (error.request) {
    errorMessage = "No response received from the server.";
  } else {
    errorMessage = error.message;
  }
  return {
    success: false,
    errorMsg: errorMessage,
    response: {},
  };
};

export const HttpsApiResponseProvider = ({ children }) => {
  const { token, setToken } = useUserContext();

  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();

  AxiosService.defaults.headers.common["Content-Type"] = "application/json";
  AxiosService.defaults.headers.common["Accept"] = "application/json";

  const attachToken = useCallback(async () => {
    try {
      if (isSignedIn && isLoaded) {
        const response = await getToken();
        if (response) {
          AxiosService.defaults.headers.common["Authorization"] =
            `Bearer ${response}`;
          setToken(response);
        }
      }
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  }, [isSignedIn, isLoaded, getToken, setToken]);

  const get = useCallback(
    async (endpoint) => {
      await attachToken();
      return AxiosService.get(endpoint)
        .then((response) => {
          console.log(`GET request to ${endpoint}:`, response.status);
          if (response?.data?.nextCursor) {
            return {
              success: true,
              errorMsg: "",
              response: response.data,
              nextCursor: response.data.nextCursor,
            };
          }
          return {
            success: true,
            errorMsg: "",
            response: response.data,
          };
        })
        .catch((error) => {
          console.error(`GET: ${endpoint} failed:`, error?.response);
          return createApiErrorResponse(error);
        });
    },
    [attachToken]
  );

  const post = useCallback(
    async (endpoint, data, headers = {}) => {
      await attachToken();
      return AxiosService.post(endpoint, data, { headers })
        .then((response) => {
          console.log(`POST request to ${endpoint}:`, response.status);
          return {
            success: true,
            errorMsg: "",
            response: response.data,
          };
        })
        .catch((error) => {
          console.error(`POST: ${endpoint} failed:`, error?.response);
          return createApiErrorResponse(error);
        });
    },
    [attachToken]
  );

  const put = useCallback(
    async (endpoint, data) => {
      await attachToken();
      return AxiosService.put(endpoint, data)
        .then((response) => {
          console.log(`PUT request to ${endpoint}:`, response.status);
          return {
            success: true,
            errorMsg: "",
            response: response.data,
          };
        })
        .catch((error) => {
          console.error(`PUT: ${endpoint} failed:`, error?.response);
          return createApiErrorResponse(error);
        });
    },
    [attachToken]
  );

  const deleteMe = useCallback(
    async (endpoint, data) => {
      await attachToken();
      return AxiosService.delete(endpoint, data)
        .then((response) => {
          console.log(`DELETE request to ${endpoint}:`, response.status);
          return {
            success: true,
            errorMsg: "",
            response: response.data,
          };
        })
        .catch((error) => {
          console.error(`DELETE: ${endpoint} failed:`, error?.response);
          return createApiErrorResponse(error);
        });
    },
    [attachToken]
  );

  return (
    <HttpsApiResponse.Provider value={{ token, get, post, put, deleteMe }}>
      {children}
    </HttpsApiResponse.Provider>
  );
};

export const useHttpsApiResponse = () => {
  const context = useContext(HttpsApiResponse);
  if (!context) {
    throw new Error(
      "useHttpsApiResponse must be used within a HttpsApiResponseProvider"
    );
  }
  return context;
};
