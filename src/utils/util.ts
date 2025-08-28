import { twMerge } from "tailwind-merge";
import { clearAllCookie } from "../helpers/clearAllCookie";
import axiosClient from "../libs/axios";
import clsx, { ClassValue } from "clsx";
import { AxiosError } from "axios";

// Utility function untuk menggabungkan class names dengan Tailwind merge
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Interface untuk response data standar
interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  status?: string;
}

// Interface untuk error response
interface ErrorResponse {
  status: number;
  message?: string;
}

/**
 * Fetcher function untuk SWR yang mengembalikan data.data
 * @param url - URL endpoint yang akan di-fetch
 * @returns Promise yang resolve dengan data.data atau reject dengan error
 */
export const fetcher = async <T = any>(url: string): Promise<T> => {
  console.log("Fetcher called with URL:", url);
  
  try {
    const response = await axiosClient.get<ApiResponse<T>>(url);

    return response.data?.data || ({} as T);
  } catch (error) {
    console.error("Fetcher - Error:", error);
    const axiosError = error as AxiosError<ErrorResponse>;
    
    if (axiosError.response?.status === 401) {
      clearAllCookie();
    }
    
    throw error;
  }
};

/**
 * Fetcher function untuk SWR yang mengembalikan seluruh response data
 * @param url - URL endpoint yang akan di-fetch
 * @returns Promise yang resolve dengan response.data atau reject dengan error
 */
export const fetcherMeta = async <T = any>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosClient.get<ApiResponse<T>>(url);
    return response.data || {};
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    
    // Handle 401 unauthorized
    if (axiosError.response?.status === 401) {
      // clearAllCookie(); // Uncomment jika diperlukan
    }
    
    // Re-throw error untuk SWR error handling
    throw error;
  }
};