import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga'
import { history } from './history'
import createRootReducer from './reducers'
import sagas from './sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  let middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history))

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(
        middleware,
        devToolsExtension()
      )
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
