import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((e) => e.content.includes(filter))
  );
  const dispatch = useDispatch();

  const handleVote = (anecdoteObject) => {
    dispatch(voteAnecdote(anecdoteObject));
    dispatch(
      showNotification(
        `you voted '${anecdotes.find((e) => e.id === anecdoteObject.id).content}'`
      )
    );
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
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
