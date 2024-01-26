import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(_state, { payload: notification }) {
      return notification;
    },
    hideNotification(_state, _action) {
      return '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
