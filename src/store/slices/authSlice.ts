import { createSlice } from '@reduxjs/toolkit'

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
      state.username = ''
    },
  },
})

const { actions, reducer } = authSlice
export const { login, logout } = actions
export default reducer
