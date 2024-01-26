export const changeFilterTo = (filter) => {
  return {
    type: 'CHANGE',
    payload: filter,
  };
};

const filterReducer = (state = '', action) => {
  console.log(state);

  if (action.type === 'CHANGE') {
    return action.payload;
  }
  return state;
};

export default filterReducer;
