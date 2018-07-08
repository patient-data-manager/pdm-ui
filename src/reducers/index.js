import {
  combineReducers
} from 'redux';

import currentUser from './current_user_reducer';
import profiles from './profiles_reducer'
const rootReducer = combineReducers({currentUser,profiles});
export default rootReducer;
