import { TodoColumn } from '@interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TodoState = {
  columns: { [key: string]: TodoColumn }
  columnOrder: string[]
}

const initialState: TodoState = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      tasks: [
        { id: 'task-1', content: 'Hello World 1' },
        { id: 'task-2', content: 'Hello World 2' },
        { id: 'task-3', content: 'Hello World 3' },
        { id: 'task-4', content: 'Hello World 4' },
      ],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      tasks: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      tasks: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setColumnOrder: (
      state,
      action: PayloadAction<{ columnOrder: string[] }>
    ) => {
      state.columnOrder = action.payload.columnOrder
    },
    setTasksInColumn: (
      state,
      action: PayloadAction<{ column: TodoColumn }>
    ) => {
      state.columns = {
        ...state.columns,
        [action.payload.column.id]: action.payload.column,
      }
    },
  },
})

const { actions, reducer } = todoSlice

export const { setColumnOrder, setTasksInColumn } = actions

export default reducer
