import axios from 'axios';
const SOCKET_SERVER_URL = 'http://localhost:8080';
const loginAuthReducerActions = {
  // Synchronous actions
  sync: {
    LOGIN_USER__STARTED: (state) => ({...state, loggingInUser: true}),
    LOGIN_USER__FAILED: (state, {payload}) => ({
      ...state,
      loggingInUser: false,
      loginError: payload,
    }),
    LOGIN_USER__FINISHED: (state, {payload}) => ({
      ...state,
      loggedIn: true,
      loggingInUser: false,
      loginError: null,
      currentUser: {...payload},
    }),
    SIGN_UP__STARTED: (state) => ({...state, creatingUser: true}),
    SIGN_UP__FAILED: (state, {payload}) => ({
      ...state,
      creatingUser: false,
      creatingUserError: payload,
    }),
    SIGN_UP__FINISHED: (state, {payload}) => ({
      ...state,
      createdUser: true,
      creatingUser: false,
      creatingUserError: null,
      loggedIn: true,
      currentUser: {...payload},
    }),

    LOGOUT_USER: (state) => {
      return {...state, loggedIn: false, loginError: null, currentUser: {}};
    },
  },
  // Asynchronous actions
  // Each async action should have 3 related synchronous actions:
  // __STARTED, __FAILED, __FINISHED
  async: {
    LOGIN_USER: ({dispatch}) => async ({payload}) => {
      try {
        dispatch({type: 'LOGIN_USER__STARTED'});
        const res = await axios.post(
          `${SOCKET_SERVER_URL}/api/users/login`,
          payload,
        );
        dispatch({type: 'LOGIN_USER__FINISHED', payload: res.data});
      } catch (err) {
        dispatch({type: 'LOGIN_USER__FAILED', payload: err.response.data});
      }
    },
    SIGN_UP: ({dispatch}) => async ({payload}) => {
      try {
        dispatch({type: 'SIGN_UP__STARTED'});
        const res = await axios.post(
          `${SOCKET_SERVER_URL}/api/users/signup`,
          payload,
        );
        dispatch({type: 'SIGN_UP__FINISHED', payload: res.data});
      } catch (err) {
        dispatch({type: 'SIGN_UP__FAILED', payload: err.response.data});
      }
    },
  },
};

export default loginAuthReducerActions;
