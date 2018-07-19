import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import profilesReducer from './profiles';
import providersReducer from './provider_reducer';
import healthRecord  from './health_record';
const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  profiles: profilesReducer,
  providers: providersReducer,
  healthRecord: healthRecord
});

export default rootReducer;
