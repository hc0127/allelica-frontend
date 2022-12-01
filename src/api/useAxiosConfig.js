// useAxios.js
import { useState, useMemo } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 60000,
});

const axiosController = new AbortController();

function fetcher(url) {
  return axiosInstance.get(url).then((res) => res.data);
}

function setAuthorization(token) {
  axiosInstance.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
}

function useAxiosConfig() {
  //const notify = useNotify();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  async function handleSuccessRequest(config) {
    setPendingRequests(pendingRequests + 1);
    if (axiosController.signal) config.signal = axiosController.signal;
    if (!token) {
      const retrieved_token = await getAccessTokenSilently();

      config.headers.Authorization = retrieved_token ? `Bearer ${retrieved_token}` : '';

      setAuthorization(retrieved_token);
      setToken(retrieved_token);
    }
    setIsLoading(true);
    return config;
  }

  function handleErrorRequest(error) {
    return Promise.reject(error);
  }

  function handleSuccessResponse(response) {
    setIsLoading(false);
    return response;
  }

  function handleErrorResponse(error) {
    setIsLoading(false);
    setPendingRequests(pendingRequests - 1);

    if (axios.isAxiosError(error) && error.response) {
      // console.log("error response", error.response.data.error);
      // notification.error({
      //   description: error.response.statusText,
      //   message: JSON.stringify(error.response.data.error),
      // });
      //throw new Error(error.response.error);
      console.log(error);
    } else {
      // notification.warning({
      //   description: error.response.statusText,
      //   message: error.response,
      // });
      //throw new Error("Unexpected error!");
      //throw new Error(error.error);
      console.log("warning");
    }
  }

  useMemo(
    () =>
      axiosInstance.interceptors.request.use(
        handleSuccessRequest,
        handleErrorRequest
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useMemo(
    () =>
      axiosInstance.interceptors.response.use(
        handleSuccessResponse,
        handleErrorResponse
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    axiosInstance,
    axiosController,
    fetcher,
    isLoading,
    setAuthorization,
  };
}

export default useAxiosConfig;
