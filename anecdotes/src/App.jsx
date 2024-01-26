import { useSelector, useDispatch } from 'react-redux';
import { vote, add } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    console.log('vote', id);
    dispatch(vote(id));
  };
  const handleAdd = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(add(content));
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          <input name="content"/>
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
