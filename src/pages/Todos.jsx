import { useEffect, useState } from 'react';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
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

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>{' '}
            - <strong>{todo.completed ? '✅ Completado' : '⏳ Pendiente'}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
