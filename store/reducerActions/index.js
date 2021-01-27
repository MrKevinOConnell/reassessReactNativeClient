
import chatroomsReducerActions from './chatrooms';
import userReducerActions from './user';

const reducerActions = {
  sync: {
    ...chatroomsReducerActions.sync,
    ...userReducerActions.sync,
  },
  async: {
    ...chatroomsReducerActions.async,
    ...userReducerActions.async,
  },
};
export default reducerActions;
