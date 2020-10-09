import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'common/store/configureStore'
import App from 'common/app'

const store = configureStore(window.__PRELOADED_STATE__)

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const worker = require('./mocks').default
  worker.start()
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('../common/app', () => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
}
