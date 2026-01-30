import { useDispatch } from 'react-redux'
import { toggleComplete, removeTask } from '../../store/slices/tasksSlice'
import './TaskItem.css'

function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch()

  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <input
        type="checkbox"
        className="task-item-checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleComplete(task.id))}
        aria-label={`Marcar como ${task.completed ? 'pendiente' : 'completada'}`}
      />
      <span
        className="task-item-text"
        onDoubleClick={() => onEdit(task)}
      >
        {task.text}
      </span>
      <div className="task-item-actions">
        <button
          type="button"
          className="task-item-btn task-item-btn-edit"
          onClick={() => onEdit(task)}
          aria-label="Editar tarea"
        >
          Editar
        </button>
        <button
          type="button"
          className="task-item-btn task-item-btn-delete"
          onClick={() => dispatch(removeTask(task.id))}
          aria-label="Eliminar tarea"
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default TaskItem
