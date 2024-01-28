import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import anecdotesService from './services/anecdotes';
import NotificationContext from './context/NotificationContext';
import { useContext } from 'react';

const App = () => {
  const queryClient = useQueryClient();
  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (anecdoteObject) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], [...anecdotes, anecdoteObject]);
    },
  });
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: (anecdoteObject) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((e) => (e.id !== anecdoteObject.id ? e : anecdoteObject))
      );
    },
  });
  const { setNotification } = useContext(NotificationContext);

  if (anecdotesQuery.isLoading) {
    return <div>loading data...</div>;
  } else if (anecdotesQuery.isError) {
    return <pre>{JSON.stringify(anecdotesQuery.error)}</pre>;
  }

  const anecdotes = anecdotesQuery.data;

  const addAnecdote = (anecdoteObject) => {
    newAnecdoteMutation.mutate(anecdoteObject);
  };
  const voteAnecdote = (anecdoteObject) => {
    updateAnecdoteMutation.mutate({
      ...anecdoteObject,
      votes: anecdoteObject.votes + 1,
    });
    setNotification(`anecdote '${anecdoteObject.content}' voted`);
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
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
