import { createSlice } from '@reduxjs/toolkit'
import { destroyCookie } from 'nookies'

const initialState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      destroyCookie(null, 'access-token')
      state.isAuthenticated = false
    },
  },
})

const { actions, reducer } = authSlice
export const { login, logout } = actions
export default reducer
