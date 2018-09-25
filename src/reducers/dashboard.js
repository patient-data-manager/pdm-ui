import * as types from '../actions/types';

const defaultState = {
  navIsOpen: false
};

function dashboard(state = defaultState, action) {
  switch (action.type) {
  case types.SET_DASHBOARD_NAV_OPEN:
    return {
      ...state,
      navIsOpen: action.navIsOpen
    };
  default:
    return state;
  }
}

export default dashboard;
