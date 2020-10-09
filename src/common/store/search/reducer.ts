import { createSlice } from '@reduxjs/toolkit'
import { SearchState } from 'common/types'

const initialState: SearchState = {
  isFetching: false,
  error: undefined,
  items: []
}

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    fetchBusinessesPending: (state) => {
      state.isFetching = true
      state.error = undefined
    },
    fetchBusinessesSuccess: (state, action) => {
      state.isFetching = false
      state.items = action.payload
    },
    fetchBusinessesError: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
})

export const {
  fetchBusinessesPending,
  fetchBusinessesSuccess,
  fetchBusinessesError
} = search.actions

export default search.reducer
