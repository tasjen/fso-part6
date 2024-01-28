import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { getAll } from './services/anecdotes';

const App = () => {
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
  });
  if (anecdotesQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (anecdotesQuery.isError) {
    return <pre>{JSON.stringify(anecdotesQuery.error)}</pre>;
  }
  const anecdotes = anecdotesQuery.data;

  const handleVote = (anecdote) => {
    console.log('vote');
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
