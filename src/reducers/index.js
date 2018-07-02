import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import profilesReducer from './profiles_reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  profiles: profilesReducer
});

export default rootReducer;
