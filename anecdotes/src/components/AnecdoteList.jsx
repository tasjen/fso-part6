import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdote';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((e) => e.content.includes(filter))
  );
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
    const anecdoteToUpdate = anecdotes.find((e) => e.id === id);
    anecdoteService.update({
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    });
    dispatch(
      showNotification(
        `you voted '${anecdotes.find((e) => e.id === id).content}'`
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
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
