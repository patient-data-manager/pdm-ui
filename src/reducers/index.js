import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import profilesReducer from './profiles_reducer';
import providerReducer from './provider_reducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  profiles: profilesReducer,
  providers: providerReducer
});

export default rootReducer;
