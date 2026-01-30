import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTask, editTask } from '../../store/slices/tasksSlice'
import { USERS } from '../../store/slices/tasksSlice'
import './TaskForm.css'

function TaskForm({ editingId, initialTask, onCancelEdit }) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [assignedTo, setAssignedTo] = useState(initialTask?.assignedTo ?? '')

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title ?? '')
      setDescription(initialTask.description ?? '')
      setAssignedTo(initialTask.assignedTo ?? '')
    } else {
      setTitle('')
      setDescription('')
      setAssignedTo('')
    }
  }, [editingId, initialTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    if (editingId) {
      dispatch(editTask({
        id: editingId,
        title: trimmedTitle,
        description: description.trim(),
        assignedTo,
      }))
      onCancelEdit?.()
    } else {
      dispatch(addTask({
        id: crypto.randomUUID(),
        title: trimmedTitle,
        description: description.trim(),
        assignedTo,
      }))
    }
    setTitle('')
    setDescription('')
    setAssignedTo('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form-input"
        placeholder={editingId ? 'Título de la tarea' : 'Título de la nueva tarea'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus={!!editingId}
        aria-label="Título"
      />
      <textarea
        className="task-form-textarea"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        aria-label="Descripción"
      />
      <div className="task-form-row">
        <label className="task-form-label">
          Asignar a:
          <select
            className="task-form-select"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            aria-label="Usuario asignado"
          >
            <option value="">— Sin asignar —</option>
            {USERS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="task-form-actions">
        {editingId && (
          <button
            type="button"
            className="task-form-btn task-form-btn-cancel"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        )}
        <button type="submit" className="task-form-btn task-form-btn-submit">
          {editingId ? 'Guardar' : 'Añadir tarea'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
