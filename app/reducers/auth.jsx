import axios from 'axios'
import { browserHistory } from 'react-router'

/* ------------- ACTIONS ---------------- */

const AUTHENTICATED = 'AUTHENTICATED'

/* ------------- ACTION CREATER ---------------- */

export const authenticated = user => ({ type: AUTHENTICATED, user })

/* ------------- REDUCERS ---------------- */

export default function reducer(state=null, action) {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  default:
    return state
  }
}

/* ------------- DISPATCHERS ---------------- */

export const login = (username, password, success, fail) =>
  dispatch => {
    axios.post('/api/auth/login/local', {username, password})
    .then(() => {
      dispatch(whoami())
      success()
    })
    .catch(() => {
      dispatch(whoami())
      fail()
    })
  }

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => {
        if (browserHistory.getCurrentLocation().pathname.slice(0, 6) === '/users') browserHistory.replace('/')
      })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch => {
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        return dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
  }
