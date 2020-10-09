import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore
} from '@reduxjs/toolkit'
import rootReducer, { RootState } from './reducer'

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true
})

export default function configureAppStore(
  preloadedState: RootState
): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production'
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer))
  }

  return store
}
