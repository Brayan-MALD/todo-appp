<<<<<<< HEAD
import { useState } from 'react';

export default function TareaItem({ tarea, alternarEstado, eliminarTarea, actualizarTitulo }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tituloTemporal, setTituloTemporal] = useState(tarea.title);

  const manejarGuardado = () => {
    if (tituloTemporal.trim() === '') return alert('El título no puede estar vacío');
    actualizarTitulo(tarea.id, tituloTemporal);
    setModoEdicion(false);
  };

  return (
    <li>
      {modoEdicion ? (
        <>
          <input
            type="text"
            value={tituloTemporal}
            onChange={(e) => setTituloTemporal(e.target.value)}
          />
          <button onClick={manejarGuardado}>Guardar</button>
        </>
      ) : (
        <>
          <span
            className={`todo-text ${tarea.completed ? 'completed' : ''}`}
            onDoubleClick={() => setModoEdicion(true)}
          >
            {tarea.title}
          </span>
          <div className="actions">
            <button onClick={() => alternarEstado(tarea.id)}>✔</button>
            <button onClick={() => eliminarTarea(tarea.id)}>🗑️</button>
          </div>
        </>
      )}
=======
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
      <button disabled style={{ marginLeft: '5px' }}>
        ✏️ Editar
      </button>
>>>>>>> 8b9808952aa16ad877d622e65ad9c62c46edc353
    </li>
  );
}
