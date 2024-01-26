import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilterTo(_state, { payload: filter }) {
      return filter;
    },
  },
});

export const { changeFilterTo } = filterSlice.actions;
export default filterSlice.reducer;
