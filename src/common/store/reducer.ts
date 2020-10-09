import { combineReducers, EnhancedStore } from '@reduxjs/toolkit'
import { searchReducer } from './search'
import { businessReducer } from './business'
import { dictReducer } from './dictionary'

const rootReducer = combineReducers({
  search: searchReducer,
  business: businessReducer,
  dictionary: dictReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = EnhancedStore<RootState>['dispatch']
