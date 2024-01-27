import { createSlice } from '@reduxjs/toolkit';

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, { payload: anecdoteObject }) {
      // const anecdoteObject = asObject(anecdote);
      state.push(anecdoteObject);
    },
    voteAnecdote(state, { payload: id }) {
      return state.map((anecdoteObject) =>
        anecdoteObject.id !== id
          ? anecdoteObject
          : { ...anecdoteObject, votes: anecdoteObject.votes + 1 }
      );
    },
    fetchAllAnecdotes(_state, { payload: arrayOfAnecdoteObject }) {
      return arrayOfAnecdoteObject;
    },
  },
});

export const { addAnecdote, voteAnecdote, fetchAllAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
