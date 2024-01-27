import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdote';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAdd = async (event) => {
    event.preventDefault();
    const anecdote = event.target.content.value;
    const anecdoteObject = await anecdoteService.createNew(anecdote);
    dispatch(addAnecdote(anecdoteObject));
    event.target.content.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
