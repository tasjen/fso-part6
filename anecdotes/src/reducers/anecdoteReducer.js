import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, { payload: anecdoteObject }) {
      return state.map((e) =>
        e.id !== anecdoteObject.id ? e : anecdoteObject
      );
    },
    setAnecdotes(_state, { payload: arrayOfAnecdoteObject }) {
      return arrayOfAnecdoteObject;
    },
    appendAnecdote(state, { payload: anecdoteObject }) {
      state.push(anecdoteObject);
    },
  },
});

const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const fetchAllAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObject = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(anecdoteObject));
  };
};

export const voteAnecdote = (anecdoteObject) => {
  return async (dispatch) => {
    const anecdoteToUpdate = {
      ...anecdoteObject,
      votes: anecdoteObject.votes + 1,
    }
    await anecdoteService.update(anecdoteToUpdate);
    dispatch(updateAnecdote(anecdoteToUpdate));
  };
};

export default anecdoteSlice.reducer;
