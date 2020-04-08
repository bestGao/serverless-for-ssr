/* eslint-disable no-underscore-dangle */

import { createStore } from 'redux'
import rootReducer from './reducers'

export default (preloadedState: any) => createStore(
  rootReducer,
  preloadedState,
  (process.env.IS_BROWSER && window.__REDUX_DEVTOOLS_EXTENSION__)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined,
)
