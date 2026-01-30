import { useSelector } from 'react-redux'
import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList({ editingId, onEdit, onCancelEdit }) {
  const { items, filter } = useSelector((state) => state.tasks)

  const filteredItems = items.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  if (items.length === 0) {
    return (
      <p className="task-list-empty">
        No hay tareas. Añade una arriba para comenzar.
      </p>
    )
  }

  if (filteredItems.length === 0) {
    return (
      <p className="task-list-empty">
        {filter === 'completed'
          ? 'No hay tareas completadas.'
          : 'No hay tareas pendientes.'}
      </p>
    )
  }

  return (
    <ul className="task-list" aria-label="Lista de tareas">
      {filteredItems.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  )
}

export default TaskList
