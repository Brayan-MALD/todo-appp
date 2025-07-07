import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import '../style.css';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ENDPOINT = 'http://localhost:3000/todos';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(ENDPOINT);
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

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return alert('El campo no puede estar vacío');

    const nuevo = {
      title: newTodo,
      completed: false
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      const data = await res.json();
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      alert('No se pudo agregar la tarea');
    }
  };

  const toggleTodo = async (id) => {
    const actual = todos.find((t) => t.id === id);
    const modificado = { ...actual, completed: !actual.completed };

    await fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: modificado.completed })
    });

    setTodos(todos.map((t) => (t.id === id ? modificado : t)));
  };

  const eliminarTodo = async (id) => {
    await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h2>Mis Tareas</h2>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          placeholder="Nuevo todo..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Añadir</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={eliminarTodo} />
      )}
    </div>
  );
}

