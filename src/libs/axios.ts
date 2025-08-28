import { clearAllCookie, clearAllLocalStorage, clearAllSession } from "@/helpers/clearAllCookie";
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

// Interface untuk error response
interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

// Interface untuk axios error dengan custom response
interface CustomAxiosError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

const axiosClient = axios.create({
  // all axios can be used, shown in axios documentation
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

axiosClient.interceptors.request.use(
  (axiosConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const cookies = new Cookies();
    const token: string | undefined = cookies.get("token");
    
    if (token && axiosConfig.headers) {
      axiosConfig.headers.Authorization = `${token}`;
    }

    return axiosConfig;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: CustomAxiosError): Promise<CustomAxiosError> => {
    const status: number | null = error?.response ? error?.response?.status : null;
    
    if (status === 401) {
      clearAllCookie();
      clearAllLocalStorage();
      clearAllSession();
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;