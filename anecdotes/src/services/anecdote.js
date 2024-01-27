import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getAll = async () => {
  const res = await axios.get(`${baseUrl}/anecdotes`);
  return res.data;
};

const createNew = async (anecdote) => {
  const anecdoteObject = { content: anecdote, votes: 0 };
  const res = await axios.post(`${baseUrl}/anecdotes`, anecdoteObject);
  return res.data;
};

const update = (anecdoteObject) => {
  axios.put(`${baseUrl}/anecdotes/${anecdoteObject.id}`, anecdoteObject);
}

export default { getAll, createNew, update };
