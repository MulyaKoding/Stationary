import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface for error state structure
interface ErrorState {
  isError: boolean;
  message: string;
  title?: string;
}

// Interface for bad request payload (includes title)
interface BadRequestPayload {
  isError: boolean;
  message: string;
  title?: string;
}

// Interface for other error payloads (no title)
interface ErrorPayload {
  isError: boolean;
  message: string;
}

// Interface for the global state
interface GlobalState {
  isLoading: boolean;
  isLoadingDownload?: boolean; // Added based on setLoadingDownload action
  isBadRequest: ErrorState;
  isInternalServerError: ErrorState;
  isNetworkError: ErrorState;
}

// Initial state with proper typing
const initialState: GlobalState = {
  isLoading: false,
  isLoadingDownload: false, // Initialize the missing property
  isBadRequest: {
    isError: false,
    message: ""
  },
  isInternalServerError: {
    isError: false,
    message: ""
  },
  isNetworkError: {
    isError: false,
    message: ""
  }
};

/**
 * Global slice for managing application-wide state
 * Handles loading states and various error conditions
 */
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    /**
     * Sets the download loading state
     * @param state - Current global state
     * @param action - Action with boolean payload
     */
    setLoadingDownload: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDownload = action.payload;
    },

    /**
     * Sets the general loading state
     * @param state - Current global state
     * @param action - Action with boolean payload
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Sets the bad request error state (400-499 status codes)
     * @param state - Current global state
     * @param action - Action with BadRequestPayload
     */
    setIsBadRequest: (state, action: PayloadAction<BadRequestPayload>) => {
      state.isBadRequest = action.payload;
    },

    /**
     * Sets the internal server error state (500-599 status codes)
     * @param state - Current global state
     * @param action - Action with ErrorPayload
     */
    setIsInternalServerError: (state, action: PayloadAction<ErrorPayload>) => {
      state.isInternalServerError = action.payload;
    },

    /**
     * Sets the network error state
     * @param state - Current global state
     * @param action - Action with ErrorPayload
     */
    setIsNetworkError: (state, action: PayloadAction<ErrorPayload>) => {
      state.isNetworkError = action.payload;
    }
  }
});

// Export actions with proper typing
export const { 
  setLoadingDownload, 
  setLoading, 
  setIsBadRequest, 
  setIsInternalServerError, 
  setIsNetworkError 
} = globalSlice.actions;

// Export reducer as default
export default globalSlice.reducer;

// Export types for use in other files
export type { GlobalState, ErrorState, BadRequestPayload, ErrorPayload };