import * as types from './types';

// ------------------------- DASHBOARD NAV --------------------------------- //

export default function setDashboardOpen(navIsOpen) {
  return {
    type: types.SET_DASHBOARD_NAV_OPEN,
    navIsOpen
  };
}
