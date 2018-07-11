import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import profilesReducer from './profiles';
import providersReducer from './provider_reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  profiles: profilesReducer,
  providers: providersReducer
});

export default rootReducer;

