import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
// import anecdoteService from './services/anecdote';
import { useDispatch } from 'react-redux';
import { fetchAllAnecdotes } from './reducers/anecdoteReducer';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // anecdoteService.getAll().then(arrayOfAnecdoteObject => {
    //   dispatch(fetchAllAnecdotes(arrayOfAnecdoteObject))
    // })
    dispatch(fetchAllAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
