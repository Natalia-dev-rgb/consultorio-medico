import { useDispatch } from 'react-redux'
import { Draggable } from '@hello-pangea/dnd'
import { updateTaskStatus, removeTask } from '../../store/slices/tasksSlice'
import { TASK_STATUS } from '../../store/slices/tasksSlice'
import './TaskCard.css'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function TaskCard({ task, index, onEdit }) {
  const dispatch = useDispatch()
  const isCompleted = task.status === TASK_STATUS.COMPLETED

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card task-card--status-${task.status} ${snapshot.isDragging ? 'task-card--dragging' : ''} ${isCompleted ? 'task-card--completed' : ''}`}
        >
          <div className="task-card-header">
            <input
              type="checkbox"
              className="task-card-checkbox"
              checked={isCompleted}
              onChange={() => {
                const next = isCompleted ? TASK_STATUS.PENDING : TASK_STATUS.COMPLETED
                dispatch(updateTaskStatus({ id: task.id, status: next }))
              }}
              aria-label={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
            />
            <h3 className="task-card-title">{task.title}</h3>
          </div>
          {task.description && (
            <p className="task-card-description">{task.description}</p>
          )}
          <div className="task-card-meta">
            <time className="task-card-date" dateTime={task.createdAt}>
              {formatDate(task.createdAt)}
            </time>
            {task.assignedTo && (
              <span className="task-card-user">{task.assignedTo}</span>
            )}
          </div>
          <div className="task-card-actions">
            <button
              type="button"
              className="task-card-btn task-card-btn-edit"
              onClick={() => onEdit(task)}
              aria-label="Editar tarea"
            >
              Editar
            </button>
            <button
              type="button"
              className="task-card-btn task-card-btn-delete"
              onClick={() => dispatch(removeTask(task.id))}
              aria-label="Eliminar tarea"
            >
              Eliminar
            </button>
          </div>
        </li>
      )}
    </Draggable>
  )
}

export default TaskCard
