import { configureStore } from '@reduxjs/toolkit'

import auhReducer from './slices/authSlice'
import shareReducer from './slices/shareSlice'
import todoReducer from './slices/todoSlice'

export * from './slices/authSlice'
export * from './slices/shareSlice'
export * from './slices/todoSlice'

export const store = configureStore({
  reducer: {
    auth: auhReducer,
    share: shareReducer,
    todo: todoReducer,
  },
  devTools: typeof window !== 'undefined',
})

export type RootState = ReturnType<typeof store.getState>
