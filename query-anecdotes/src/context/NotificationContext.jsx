import { createContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload;
    case 'HIDE':
      return '';
    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');
  const setNotification = (message) => {
    dispatch({ type: 'SHOW', payload: message });
    setTimeout(() => dispatch({ type: 'HIDE' }), 5000);
  };
  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
