import { useEffect, useState } from 'react';
<<<<<<< HEAD
import '../style.css';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [entrada, setEntrada] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState(null);
  const [filtroActual, setFiltroActual] = useState('todas');

const ENDPOINT = 'http://localhost:3000/todos';

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const respuesta = await fetch(ENDPOINT);
        if (!respuesta.ok) throw new Error('Error al obtener tareas');
        const resultado = await respuesta.json();
        setTareas(resultado);
      } catch (e) {
        console.error(e);
        setMensajeError('No se pudo obtener la lista');
      } finally {
        setCargando(false);
      }
    };

    obtenerTareas();
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!entrada.trim()) return alert('Por favor escribe algo');

    const nuevaTarea = {
      title: entrada,
      completed: false
    };

    try {
      const respuesta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
      });

      const data = await respuesta.json();
      setTareas((prev) => [...prev, data]);
      setEntrada('');
    } catch (err) {
      alert('No se pudo agregar la tarea');
    }
  };

  const alternarEstado = async (id) => {
    const tareaActual = tareas.find((t) => t.id === id);
    const tareaModificada = { ...tareaActual, completed: !tareaActual.completed };

    await fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: tareaModificada.completed })
    });

    setTareas(tareas.map((t) => (t.id === id ? tareaModificada : t)));
  };

  const eliminarTarea = async (id) => {
    await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const tareasVisibles = tareas.filter((t) => {
    if (filtroActual === 'completadas') return t.completed;
    if (filtroActual === 'pendientes') return !t.completed;
    return true;
  });

  return (
    <div className="container">
      <h2>Mis Tareas</h2>

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={entrada}
          placeholder="Escribe una tarea..."
          onChange={(e) => setEntrada(e.target.value)}
        />
        <button type="submit">Añadir</button>
      </form>

      <div className="filtro-select">
        <label>Filtrar: </label>
        <select value={filtroActual} onChange={(e) => setFiltroActual(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="pendientes">Pendientes</option>
        </select>
      </div>

      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}

      {cargando ? (
        <p>Cargando tareas...</p>
      ) : (
        <ul>
          {tareasVisibles.map((t) => (
            <li key={t.id}>
              <span
                className={`todo-text ${t.completed ? 'completed' : ''}`}
                onClick={() => alternarEstado(t.id)}
              >
                {t.title}
              </span>
              <div className="actions">
                <button onClick={() => alternarEstado(t.id)}>✔</button>
                <button onClick={() => eliminarTarea(t.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
=======
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
>>>>>>> 8b9808952aa16ad877d622e65ad9c62c46edc353
      )}
    </div>
  );
}
