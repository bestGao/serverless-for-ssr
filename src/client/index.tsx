import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import App from '@/shared/app'
import createStore from '@/shared/store'
import { pagePrefix } from 'config/shared/env'

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={createStore(window.initialStore)}>
      <Router basename={pagePrefix}>
        <App />
      </Router>
    </Provider>,
    document.querySelector('#root'),
  )
})
