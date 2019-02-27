import { List, Record } from 'immutable'

export const TasksState = new Record({
  filter: '',
  list: new List()
})

export function tasksReducer(state = new TasksState(), { payload, type }) {
  return state
}
