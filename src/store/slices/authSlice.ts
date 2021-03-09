import { createSlice } from '@reduxjs/toolkit'
import { destroyCookie } from 'nookies'

const initialState = {
  username: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload.username
    },
    logout(state, action) {
      destroyCookie(null, 'access-token')
      state.username = ''
    },
  },
})

const { actions, reducer } = authSlice
export const { login, logout } = actions
export default reducer
