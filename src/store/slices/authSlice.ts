import { createSlice } from '@reduxjs/toolkit'
import { destroyCookie } from 'nookies'

const initialState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user
    },
    logout(state, action) {
      destroyCookie(null, 'access-token')
      state.user = null
    },
  },
})

const { actions, reducer } = authSlice
export const { login, logout } = actions
export default reducer
