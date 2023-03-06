import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  store: '',
  startDate: 0,
  endDate: 0,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setStore(state, action) {
      state.store = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
  },
});

const { actions, reducer } = reviewSlice;
export const { setStore, setStartDate, setEndDate } = actions;
export default reducer;
