import { useEffect, useState } from 'react';

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
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
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
