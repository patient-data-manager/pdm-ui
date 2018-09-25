import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import profilesReducer from './profiles';
import providersReducer from './providers';
import healthRecordsReducer from './healthRecords';
import dashboardReducer from './dashboard';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  profiles: profilesReducer,
  providers: providersReducer,
  healthRecords: healthRecordsReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
