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
    CHANGE_HAS_ONBOARDED__STARTED: (state) => ({
      ...state,
      updatingHasOnboarded: true,
    }),
    CHANGE_HAS_ONBOARDED__FAILED: (state, {payload}) => ({
      ...state,
      updatingHasOnboarded: false,
      updatingHasOnboardedError: payload,
    }),
    CHANGE_HAS_ONBOARDED__FINISHED: (state, {payload}) => ({
      ...state,
      updatingHasOnboarded: false,
      updatingHasOnboardedError: null,
      hasOnboarded: payload,
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
    CHANGE_HAS_ONBOARDED: ({dispatch}) => async ({payload}) => {
      try {
        const hasOnboarded = payload;
        dispatch({type: 'CHANGE_HAS_ONBOARDED__STARTED'});
        dispatch({
          type: 'CHANGE_HAS_ONBOARDED__FINISHED',
          payload: hasOnboarded,
        });
      } catch (err) {
        dispatch({
          type: 'CHANGE_HAS_ONBOARDED__FAILED',
          payload: err.response.data,
        });
      }
    },
  },
};

export default loginAuthReducerActions;
