import { useState } from 'react'
import { Link } from 'react-router-dom'
import TaskForm from './TaskForm'
import TaskBoard from './TaskBoard'
import FilterTasks from './FilterTasks'
import './TaskManager.css'

function TaskManager() {
  const [editingTask, setEditingTask] = useState(null)

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  return (
    <div className="task-manager">
      <header className="task-manager-header">
        <Link to="/" className="task-manager-back">
          ← Volver al portafolio
        </Link>
        <h1 className="task-manager-title">Task Management</h1>
        <p className="task-manager-subtitle">
          Gestiona tus tareas. Arrastra entre columnas. Los datos se guardan en tu navegador.
        </p>
      </header>

      <main className="task-manager-main">
        <TaskForm
          editingId={editingTask?.id}
          initialTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />
        <FilterTasks />
        <TaskBoard editingId={editingTask?.id} onEdit={handleEdit} />
      </main>
    </div>
  )
}

export default TaskManager
