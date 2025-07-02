import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        if (!res.ok) throw new Error('Error al cargar los datos');
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
        setError('Ocurrió un error al cargar los todos.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return alert('El campo no puede estar vacío');

    const nuevo = {
      id: Date.now(),
      title: newTodo,
      completed: false
    };

    setTodos([...todos, nuevo]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    const nuevosTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(nuevosTodos);
  };

  const eliminarTodo = (id) => {
    const nuevosTodos = todos.filter((todo) => todo.id !== id);
    setTodos(nuevosTodos);
  };

  return (
    <div>
      <h2>Lista de Todos</h2>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          placeholder="Nuevo todo..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Placeholder: Filtros */}
      <div style={{ margin: '10px 0' }}>
        <strong>Filtro:</strong>{' '}
        <button disabled>Todos</button>{' '}
        <button disabled>Completados</button>{' '}
        <button disabled>Pendientes</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Cargando todos...</p>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={eliminarTodo} />
      )}
    </div>
  );
}
