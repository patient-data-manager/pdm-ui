import {
  combineReducers
} from 'redux';

import currentUser from './current_user_reducer';
const rootReducer = combineReducers({currentUser});
export default rootReducer;
