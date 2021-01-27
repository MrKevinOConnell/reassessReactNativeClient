import miscellaneousAuthReducerActions from './miscellaneous';
import loginReducerActions from './login';

const userReducerActions = {
  sync: {
    ...miscellaneousAuthReducerActions.sync,
    ...loginReducerActions.sync,
  },
  async: {
    ...miscellaneousAuthReducerActions.async,
    ...loginReducerActions.async,
  },
};

export default userReducerActions;
