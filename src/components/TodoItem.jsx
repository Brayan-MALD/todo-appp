export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ cursor: 'pointer' }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.title}
      </span>{' '}
      - <strong>{todo.completed ? '✅ Completado' : '⏳ Pendiente'}</strong>{' '}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
        🗑️
      </button>
    </li>
  );
}
