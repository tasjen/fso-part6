import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import anecdotesService from './services/anecdotes';

const App = () => {
  const queryClient = useQueryClient();
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: false,
    refetchOnWindowFocus: true
  });
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (anecdoteObject) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], [...anecdotes, anecdoteObject]);
    },
  });

  if (anecdotesQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (anecdotesQuery.isError) {
    return <pre>{JSON.stringify(anecdotesQuery.error)}</pre>;
  }

  const anecdotes = anecdotesQuery.data;

  const addAnecdote = (anecdoteObject) => {
    newAnecdoteMutation.mutate(anecdoteObject);
  };
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

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
