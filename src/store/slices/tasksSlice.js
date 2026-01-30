import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'task-manager-tasks'
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}
export const USERS = ['Ana', 'Luis', 'Carla']

const VALID_STATUSES = [TASK_STATUS.PENDING, TASK_STATUS.IN_PROGRESS, TASK_STATUS.COMPLETED]

const normalizeTask = (t) => {
  const status = VALID_STATUSES.includes(t.status) ? t.status : TASK_STATUS.PENDING
  return {
    id: t.id || crypto.randomUUID(),
    title: String(t.title ?? '').trim(),
    description: String(t.description ?? '').trim(),
    status,
    createdAt: t.createdAt && !isNaN(new Date(t.createdAt).getTime()) ? t.createdAt : new Date().toISOString(),
    assignedTo: t.assignedTo ?? '',
    order: typeof t.order === 'number' && !Number.isNaN(t.order) ? t.order : 0,
  }
}

const loadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const raw = JSON.parse(data)
    if (!Array.isArray(raw)) return []
    return raw.map((t) => {
      if (t.text !== undefined && t.completed !== undefined) {
        return normalizeTask({
          id: t.id,
          title: t.text || '',
          description: '',
          status: t.completed ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING,
          createdAt: t.createdAt,
          assignedTo: t.assignedTo,
          order: t.order,
        })
      }
      return normalizeTask(t)
    })
  } catch {
    return []
  }
}

const saveTasksToStorage = (tasks) => {
  try {
    const toSave = tasks.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status,
      createdAt: t.createdAt,
      assignedTo: t.assignedTo,
      order: t.order,
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch (e) {
    console.warn('No se pudo guardar en localStorage', e)
  }
}

const nextOrder = (items) => {
  if (items.length === 0) return 0
  return Math.max(...items.map((t) => t.order), 0) + 1
}

const initialState = {
  items: loadTasksFromStorage(),
  filter: 'all',
  searchText: '',
  sortOrder: 'newest',
  filterByUser: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { id, title, description, assignedTo } = action.payload
      const pending = state.items.filter((t) => t.status === TASK_STATUS.PENDING)
      state.items.push({
        id,
        title: (title || '').trim(),
        description: (description || '').trim(),
        status: TASK_STATUS.PENDING,
        createdAt: new Date().toISOString(),
        assignedTo: assignedTo || '',
        order: nextOrder(pending),
      })
      saveTasksToStorage(state.items)
    },
    editTask: (state, action) => {
      const { id, title, description, assignedTo } = action.payload
      const task = state.items.find((t) => t.id === id)
      if (task) {
        if (title !== undefined) task.title = title.trim()
        if (description !== undefined) task.description = description.trim()
        if (assignedTo !== undefined) task.assignedTo = assignedTo
        saveTasksToStorage(state.items)
      }
    },
    removeTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
      saveTasksToStorage(state.items)
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload
      const task = state.items.find((t) => t.id === id)
      if (task) {
        task.status = status
        const inColumn = state.items.filter((t) => t.status === status)
        task.order = nextOrder(inColumn) - 1
        saveTasksToStorage(state.items)
      }
    },
    reorderTasks: (state, action) => {
      const { sourceStatus, sourceIndex, destStatus, destIndex } = action.payload
      const asc = state.sortOrder === 'oldest'
      const byStatus = (status) =>
        state.items
          .filter((t) => t.status === status)
          .sort((a, b) => {
            const da = new Date(a.createdAt).getTime()
            const db = new Date(b.createdAt).getTime()
            if (da !== db) return asc ? da - db : db - da
            return a.order - b.order
          })
      const sourceList = byStatus(sourceStatus)
      const moved = sourceList[sourceIndex]
      if (!moved) return
      if (sourceStatus === destStatus) {
        sourceList.splice(sourceIndex, 1)
        sourceList.splice(destIndex, 0, moved)
        sourceList.forEach((t, i) => {
          t.order = i
        })
      } else {
        moved.status = destStatus
        sourceList.splice(sourceIndex, 1)
        sourceList.forEach((t, i) => {
          t.order = i
        })
        const destWithoutMoved = state.items
          .filter((t) => t.status === destStatus && t.id !== moved.id)
          .sort((a, b) => {
            const da = new Date(a.createdAt).getTime()
            const db = new Date(b.createdAt).getTime()
            if (da !== db) return asc ? da - db : db - da
            return a.order - b.order
          })
        const destList = [...destWithoutMoved]
        destList.splice(destIndex, 0, moved)
        destList.forEach((t, i) => {
          t.order = i
        })
      }
      saveTasksToStorage(state.items)
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setFilterByUser: (state, action) => {
      state.filterByUser = action.payload
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => t.status !== TASK_STATUS.COMPLETED)
      saveTasksToStorage(state.items)
    },
  },
})

export const {
  addTask,
  editTask,
  removeTask,
  updateTaskStatus,
  reorderTasks,
  setFilter,
  setSearchText,
  setSortOrder,
  setFilterByUser,
  clearCompleted,
} = tasksSlice.actions

export default tasksSlice.reducer
