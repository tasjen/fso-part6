import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((e) => e.content.includes(filter))
  );
  const dispatch = useDispatch();

  const handleVote = (anecdoteObject) => {
    dispatch(voteAnecdote(anecdoteObject));
    dispatch(setNotification(`you voted '${anecdoteObject.content}'`, 5));
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdoteObject) => (
          <div key={anecdoteObject.id}>
            <div>{anecdoteObject.content}</div>
            <div>
              has {anecdoteObject.votes}
              <button onClick={() => handleVote(anecdoteObject)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
