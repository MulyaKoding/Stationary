import { setIsBadRequest, setIsInternalServerError, setIsNetworkError } from "@/store/slice/globalSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

// Interface for error response data
interface ErrorResponseData {
  errors?: string;
  title?: string;
  message?: string;
}

// Interface for hook return value
interface UseHandleErrorReturn {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  handleError: (error: AxiosError | Error | unknown) => void;
}

/**
 * Custom hook for handling different types of errors
 * Manages error state and dispatches appropriate Redux actions based on error status
 * 
 * @returns Object containing error message state and error handling function
 */
export const useHandleError = (): UseHandleErrorReturn => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  /**
   * Handles different types of errors and dispatches appropriate actions
   * @param error - The error object to handle
   */
  const handleError = (error: AxiosError | Error | unknown): void => {
    // Type guard to check if error is an AxiosError
    const isAxiosError = (err: unknown): err is AxiosError<ErrorResponseData> => {
      return (
        typeof err === 'object' && 
        err !== null && 
        'isAxiosError' in err &&
        (err as AxiosError).isAxiosError === true
      );
    };

    if (isAxiosError(error)) {
      const status = error.response?.status;
      const errors = error.response?.data?.errors;
      const title = error.response?.data?.title;

      if (status && status >= 400 && status < 500) {
        if (status !== 401) {
          dispatch(
            setIsBadRequest({
              isError: true,
              message: errors || "Something error",
              title: title
            })
          );

          setErrorMessage(errors || "Bad request error");
        }
      } else if (status && status >= 500 && status < 600) {
        dispatch(
          setIsInternalServerError({
            isError: true,
            message: errors || "Something error"
          })
        );
        setErrorMessage(errors || "Internal server error");
      }
    } else if (error instanceof Error) {
      // Check for network error by message
      if (error.message === "Network Error") {
        dispatch(
          setIsNetworkError({
            isError: true,
            message: "Network error occurred"
          })
        );
        setErrorMessage("Network error");
      } else {
        // Handle regular JavaScript errors
        console.error("Regular error:", error.message);
        setErrorMessage(error.message);
      }
    } else {
      // Handle unknown error types
      console.error("Unknown error:", error);
      setErrorMessage("An unknown error occurred");
    }
  };

  return {
    errorMessage,
    setErrorMessage,
    handleError
  };
};