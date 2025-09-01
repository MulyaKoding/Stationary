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
 */
export const fetcher = async <T = any>(url: string): Promise<T> => {
  try {
    const { data } = await axiosClient.get<ApiResponse<T>>(url);
    return data?.data ?? ({} as T);
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response?.status === 401) {
      clearAllCookie();
    }

    throw axiosError;
  }
};

/**
 * Fetcher function untuk SWR yang mengembalikan seluruh response data
 */
export const fetcherMeta = async <T = any>(
  url: string
): Promise<ApiResponse<T>> => {
  try {
    const { data } = await axiosClient.get<ApiResponse<T>>(url);
    return data ?? {};
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response?.status === 401) {
      clearAllCookie();
    }

    throw axiosError;
  }
};
