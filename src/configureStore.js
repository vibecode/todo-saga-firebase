import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga'
import { history } from './history'
import createRootReducer from './reducers'
import sagas from './sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  let middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history))

  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

    if (composeEnhancers) {
      middleware = composeEnhancers(middleware)
    }
  }

  const store = createStore(
    createRootReducer(history),
    initialState,
    middleware
  )

  sagaMiddleware.run(sagas)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history))
    })
  }

  return store
}
