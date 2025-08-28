import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface untuk state booking step
interface BookingStepState {
  bookingStep: number;
}

// Initial state dengan type annotation
const initialState: BookingStepState = {
  bookingStep: 0,
};

const bookingStepSlice = createSlice({
  name: 'bookingStep',
  initialState,
  reducers: {
    setBookingStep: (state, action: PayloadAction<number>) => {
      state.bookingStep = action.payload;
    },
  },
});

export const { setBookingStep } = bookingStepSlice.actions;
export default bookingStepSlice.reducer;