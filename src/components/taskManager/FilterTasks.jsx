import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setSearchText, setSortOrder, setFilterByUser, clearCompleted } from '../../store/slices/tasksSlice'
import { USERS, TASK_STATUS } from '../../store/slices/tasksSlice'
import './FilterTasks.css'

function FilterTasks() {
  const dispatch = useDispatch()
  const { filter, searchText, sortOrder, filterByUser, items } = useSelector((state) => state.tasks)
  const completedCount = items.filter((t) => t.status === TASK_STATUS.COMPLETED).length

  return (
    <div className="filter-tasks">
      <div className="filter-tasks-row filter-tasks-status">
        <span className="filter-tasks-label">Estado:</span>
        <div className="filter-tasks-buttons">
          <button
            type="button"
            className={`filter-tasks-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            Todas
          </button>
          <button
            type="button"
            className={`filter-tasks-btn ${filter === TASK_STATUS.PENDING ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(TASK_STATUS.PENDING))}
          >
            Pendientes
          </button>
          <button
            type="button"
            className={`filter-tasks-btn ${filter === TASK_STATUS.IN_PROGRESS ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(TASK_STATUS.IN_PROGRESS))}
          >
            En progreso
          </button>
          <button
            type="button"
            className={`filter-tasks-btn ${filter === TASK_STATUS.COMPLETED ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(TASK_STATUS.COMPLETED))}
          >
            Completadas
          </button>
        </div>
      </div>
      <div className="filter-tasks-row filter-tasks-search">
        <label className="filter-tasks-label" htmlFor="task-search">
          Buscar:
        </label>
        <input
          id="task-search"
          type="text"
          className="filter-tasks-input"
          placeholder="Buscar por título o descripción..."
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          aria-label="Buscar tareas"
        />
      </div>
      <div className="filter-tasks-row filter-tasks-extra">
        <label className="filter-tasks-label" htmlFor="task-sort">
          Ordenar por fecha:
        </label>
        <select
          id="task-sort"
          className="filter-tasks-select"
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          aria-label="Ordenar por fecha"
        >
          <option value="newest">Más nuevas primero</option>
          <option value="oldest">Más viejas primero</option>
        </select>
        <label className="filter-tasks-label" htmlFor="task-user">
          Usuario:
        </label>
        <select
          id="task-user"
          className="filter-tasks-select"
          value={filterByUser}
          onChange={(e) => dispatch(setFilterByUser(e.target.value))}
          aria-label="Filtrar por usuario asignado"
        >
          <option value="">Todos</option>
          {USERS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      {completedCount > 0 && (
        <div className="filter-tasks-stats">
          <button
            type="button"
            className="filter-tasks-clear"
            onClick={() => dispatch(clearCompleted())}
          >
            Limpiar completadas
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterTasks
