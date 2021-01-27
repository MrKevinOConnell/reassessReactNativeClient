import axios from 'axios';
import _ from 'lodash';
const SOCKET_SERVER_URL = 'http://localhost:8080';
const loginAuthReducerActions = {
  // Synchronous actions
  sync: {
    UPDATE_GOALS__STARTED: (state) => ({...state, updatingGoals: true}),
    UPDATE_GOALS__FAILED: (state, {payload}) => ({
      ...state,
      updatingGoals: false,
      updatingGoalsError: payload,
    }),
    UPDATE_GOALS__FINISHED: (state, {payload}) => ({
      ...state,
      updatingGoals: false,
      currentUser: {...payload},
    }),
  },
  // Asynchronous actions
  // Each async action should have 3 related synchronous actions:
  // __STARTED, __FAILED, __FINISHED

  async: {
    UPDATE_GOALS: ({dispatch}) => async ({payload}) => {
      try {
        dispatch({type: 'UPDATE_GOALS__STARTED'});
        const id = payload.id;
        const res = await axios.post(
          `${SOCKET_SERVER_URL}/api/users/${id}/goals`,
          payload,
        );
        dispatch({type: 'UPDATE_GOALS__FINISHED', payload: res.data});
      } catch (err) {
        dispatch({
          type: 'UPDATE_GOALS__FAILED',
          payload: _.get(err, 'response.data'),
        });
      }
    },
  },
};

export default loginAuthReducerActions;
