import { useEffect, useState } from 'react';

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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Cargando todos...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ cursor: 'pointer' }}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.title}
              </span>{' '}
              - <strong>{todo.completed ? '✅ Completado' : '⏳ Pendiente'}</strong>{' '}
              <button onClick={() => eliminarTodo(todo.id)} style={{ marginLeft: '10px' }}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
