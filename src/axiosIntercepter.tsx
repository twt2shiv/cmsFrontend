import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const imsLink: string = import.meta.env.VITE_BACKEND_URL;
interface ErrorResponse {
  success?: boolean;
  message?: string;
  data?: {
    logout?: boolean;
  };
}


const loggedInUser : string | null = localStorage.getItem("accessToken")
console.log(loggedInUser)

const cmsAxios = axios.create({
  baseURL: imsLink,
  headers: {
    "Athorization": `Bearer ${loggedInUser!?.replace(/"/g, '')}`,
  },
});

cmsAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.success !== undefined) {
      return response;
    }
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (error.response && typeof error.response.data === "object") {
      const errorData = error.response.data;

      if (errorData?.message?.toLocaleLowerCase() === "logout") {
        toast.error(errorData.message || "Logout error.");
        localStorage.clear();
        window.location.reload();
        return Promise.reject(error);
      }

      if (errorData.success !== undefined) {
      
        toast.error(errorData.message || "Error occurred.");
        return Promise.reject(errorData);
      }

      if (errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Error while connecting to backend.");
      }

      return Promise.reject(errorData);
    }

    toast.error("An unexpected error occurred.");
    return Promise.reject(error);
  }
);



export { cmsAxios };