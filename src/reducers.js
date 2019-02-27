import { authReducer } from './auth'
import { tasksReducer } from './tasks'
import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux-immutable'

export default history =>
  combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    router: connectRouter(history)
  })
