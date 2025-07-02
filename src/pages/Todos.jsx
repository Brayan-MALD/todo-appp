import { useEffect, useState } from 'react';

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Todos</h2>
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
