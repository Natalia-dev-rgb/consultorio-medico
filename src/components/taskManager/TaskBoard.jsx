import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { reorderTasks } from '../../store/slices/tasksSlice'
import { TASK_STATUS } from '../../store/slices/tasksSlice'
import TaskCard from './TaskCard'
import './TaskBoard.css'

const COLUMNS = [
  { id: TASK_STATUS.PENDING, title: 'Pendientes' },
  { id: TASK_STATUS.IN_PROGRESS, title: 'En progreso' },
  { id: TASK_STATUS.COMPLETED, title: 'Completadas' },
]

function filterTasks(items, filter, searchText, filterByUser) {
  let list = [...items]
  if (filter !== 'all') {
    list = list.filter((t) => t.status === filter)
  }
  if (searchText.trim()) {
    const q = searchText.trim().toLowerCase()
    list = list.filter(
      (t) =>
        (t.title || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
    )
  }
  if (filterByUser) {
    list = list.filter((t) => t.assignedTo === filterByUser)
  }
  return list
}

function sortByDateAndOrder(list, sortOrder) {
  const asc = sortOrder === 'oldest'
  return [...list].sort((a, b) => {
    const da = new Date(a.createdAt).getTime()
    const db = new Date(b.createdAt).getTime()
    if (da !== db) return asc ? da - db : db - da
    return a.order - b.order
  })
}

function TaskBoard({ editingId, onEdit }) {
  const dispatch = useDispatch()
  const { items, filter, searchText, sortOrder, filterByUser } = useSelector(
    (state) => state.tasks
  )

  const grouped = useMemo(() => {
    const filtered = filterTasks(items, filter, searchText, filterByUser)
    const pending = sortByDateAndOrder(
      filtered.filter((t) => t.status === TASK_STATUS.PENDING),
      sortOrder
    )
    const inProgress = sortByDateAndOrder(
      filtered.filter((t) => t.status === TASK_STATUS.IN_PROGRESS),
      sortOrder
    )
    const completed = sortByDateAndOrder(
      filtered.filter((t) => t.status === TASK_STATUS.COMPLETED),
      sortOrder
    )
    return { pending, inProgress, completed }
  }, [items, filter, searchText, sortOrder, filterByUser])

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return
    dispatch(
      reorderTasks({
        sourceStatus: source.droppableId,
        sourceIndex: source.index,
        destStatus: destination.droppableId,
        destIndex: destination.index,
      })
    )
  }

  const columnLists = {
    [TASK_STATUS.PENDING]: grouped.pending,
    [TASK_STATUS.IN_PROGRESS]: grouped.inProgress,
    [TASK_STATUS.COMPLETED]: grouped.completed,
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {COLUMNS.map((col) => (
          <div key={col.id} className="task-board-column">
            <h2 className="task-board-column-title">{col.title}</h2>
            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`task-board-list ${snapshot.isDraggingOver ? 'task-board-list--dragging' : ''}`}
                >
                  {columnLists[col.id].map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={index}
                      onEdit={onEdit}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

export default TaskBoard
