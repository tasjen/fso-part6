import { useDispatch } from 'react-redux';
import { add } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const handleAdd = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(add(content));
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
