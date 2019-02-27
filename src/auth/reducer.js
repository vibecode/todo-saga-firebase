import { Record } from 'immutable'

export const AuthState = new Record({
  authenticated: false,
  uid: null,
  user: null
})

export function authReducer(state = new AuthState(), { payload, type }) {
  return state
}
