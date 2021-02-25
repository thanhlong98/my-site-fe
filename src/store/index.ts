import { configureStore } from '@reduxjs/toolkit'

import auhReducer from './slices/authSlice'

export default configureStore({
  reducer: {
    auth: auhReducer,
  },
  devTools: typeof window !== 'undefined',
})
