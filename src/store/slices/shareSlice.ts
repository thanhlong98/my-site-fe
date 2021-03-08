import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalName: '',
}

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    setModal(state, action: { payload: { modalName: string } }) {
      state.modalName = action.payload.modalName
    },
  },
})

const { actions, reducer } = shareSlice
export const { setModal } = actions
export default reducer
