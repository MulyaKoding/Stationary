import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for booking information
interface BookingInfo {
  Id_Pegawai: string;
  TglBooking: string;
  JamBooking: string;
}

// Interface for form booking data
interface FormBookingData {
  Title: string;
  NamaPasien: string;
  JenisKelamin: string;
  NoHp: string;
  TanggalLahir: string;
  Alamat: string;
  Booking: BookingInfo;
}

// Interface for the form booking state
interface FormBookingState {
  formBooking: FormBookingData;
}

// Initial state with proper typing
const initialState: FormBookingState = {
  formBooking: {
    Title: "",
    NamaPasien: "",
    JenisKelamin: "",
    NoHp: "",
    TanggalLahir: "",
    Alamat: "",
    Booking: {
      Id_Pegawai: "",
      TglBooking: "",
      JamBooking: "",
    }
  },
};

/**
 * Form booking slice for managing booking form state
 * Handles patient information and booking details
 */
const formBookingSlice = createSlice({
  name: 'formBooking',
  initialState,
  reducers: {
    /**
     * Sets the complete form booking data
     * @param state - Current form booking state
     * @param action - Action with FormBookingData payload
     */
    setFormBooking: (state, action: PayloadAction<FormBookingData>) => {
      state.formBooking = action.payload;
    },

    /**
     * Updates specific patient information fields
     * @param state - Current form booking state
     * @param action - Action with partial FormBookingData payload
     */
    updatePatientInfo: (state, action: PayloadAction<Partial<Omit<FormBookingData, 'Booking'>>>) => {
      state.formBooking = {
        ...state.formBooking,
        ...action.payload
      };
    },

    /**
     * Updates booking information only
     * @param state - Current form booking state
     * @param action - Action with BookingInfo payload
     */
    updateBookingInfo: (state, action: PayloadAction<BookingInfo>) => {
      state.formBooking.Booking = action.payload;
    },

    /**
     * Updates partial booking information
     * @param state - Current form booking state
     * @param action - Action with partial BookingInfo payload
     */
    updatePartialBookingInfo: (state, action: PayloadAction<Partial<BookingInfo>>) => {
      state.formBooking.Booking = {
        ...state.formBooking.Booking,
        ...action.payload
      };
    },

    /**
     * Resets the form booking to initial state
     * @param state - Current form booking state
     */
    resetFormBooking: (state) => {
      state.formBooking = initialState.formBooking;
    }
  },
});

// Export actions with proper typing
export const { 
  setFormBooking, 
  updatePatientInfo, 
  updateBookingInfo, 
  updatePartialBookingInfo, 
  resetFormBooking 
} = formBookingSlice.actions;

// Export reducer as default
export default formBookingSlice.reducer;

// Export types for use in other files
export type { FormBookingState, FormBookingData, BookingInfo };