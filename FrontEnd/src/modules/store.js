import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deviceType: 'Loading',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setDeviceType(state, action) {
      state.deviceType = action.payload;
    },
  },
});

const { actions, reducer } = reviewSlice;
export const { setDeviceType } = actions;
export default reducer;
