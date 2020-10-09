import { createSlice } from '@reduxjs/toolkit'
import { BusinessState } from 'common/types'

const initialState: BusinessState = {
  isFetching: false,
  error: undefined,
  item: undefined
}

const business = createSlice({
  name: 'business',
  initialState,
  reducers: {
    fetchBusinessPending: (state) => {
      state.isFetching = true
      state.error = undefined
    },
    fetchBusinessSuccess: (state, action) => {
      state.isFetching = false
      state.item = action.payload
    },
    fetchBusinessError: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
})

export const {
  fetchBusinessPending,
  fetchBusinessSuccess,
  fetchBusinessError
} = business.actions

export default business.reducer
