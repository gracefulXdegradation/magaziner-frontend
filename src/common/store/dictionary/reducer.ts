import { createSlice } from '@reduxjs/toolkit'
import { DictionaryState } from 'common/types'

const initialState: DictionaryState = {
  isFetching: false,
  error: undefined,
  dictionary: {
    businessTypes: [],
    cities: []
  }
}

const dictionary = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    fetchDictPending: (state) => {
      state.isFetching = true
      state.error = undefined
    },
    fetchDictSuccess: (state, action) => {
      state.isFetching = false
      state.dictionary = action.payload
    },
    fetchDictError: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
})

export const {
  fetchDictPending,
  fetchDictSuccess,
  fetchDictError
} = dictionary.actions

export default dictionary.reducer
