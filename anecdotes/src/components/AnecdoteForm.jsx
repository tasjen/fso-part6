import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAdd = (event) => {
    event.preventDefault();
    const anecdote = event.target.content.value;
    dispatch(addAnecdote(anecdote));
    dispatch(setNotification(`new anecdote '${anecdote}'`, 5))
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
