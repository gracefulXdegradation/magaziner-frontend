import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'
import configureStore from 'common/store/configureStore'
import { RootState } from 'common/store/reducer'
import App from 'common/app'

interface Assets {
  client: {
    css?: string
    js: string
  }
}

let assets: Assets
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST as string)
}
syncLoadAssets()

const server: express.Application = express()

const render = (req: express.Request, res: express.Response) => {
  const preloadedState = {}
  const store = configureStore(preloadedState as RootState)

  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const finalState = store.getState()

  res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Magaziner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f1a208">
        <meta name="apple-mobile-web-app-title" content="Magaziner">
        <meta name="application-name" content="Magaziner">
        <meta name="msapplication-TileColor" content="#f1a208">
        <meta name="theme-color" content="#f1a208">

        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root">${markup}</div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
  </html>`)
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
  .get('*', render)

export default server
