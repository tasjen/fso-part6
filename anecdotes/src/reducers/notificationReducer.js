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

const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (notification, durationInSec) => {
  return async (dispatch) => {
    dispatch(showNotification(notification));
    setTimeout(() => {
      dispatch(hideNotification());
    }, durationInSec * 1000);
  };
};
export default notificationSlice.reducer;
