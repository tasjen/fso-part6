import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_state, { payload: notification }) {
      return notification;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
