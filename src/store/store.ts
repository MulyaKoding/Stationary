import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slice/globalSlice";
import bookingStepSlice from "./slice/bookingStepSlice";
import formBookingSlice from "./slice/formBookingSlice";

/**
 * Redux store configuration with TypeScript support
 * Combines all slice reducers into a single store
 */
export const store = configureStore({
  reducer: {
    global: globalSlice,
    bookingStep: bookingStepSlice,
    formBooking: formBookingSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type for dispatch function
export type AppDispatch = typeof store.dispatch;

// Export typed versions of store methods
export const getState = store.getState;
export const dispatch = store.dispatch;

// Type-safe hooks (optional - for use in components)
// These can be used instead of the default useSelector and useDispatch
export type { RootState as AppRootState };
export type { AppDispatch as StoreDispatch };