import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import fullScreenCircuralProgress from './state/fullScreenCircuralProgress'
import snackbars from './state/snackbars'

const reducer = combineReducers({
  fullScreenCircuralProgress,
  snackbars
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)