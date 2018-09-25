import * as types from './types';

// ------------------------- DASHBOARD ------------------------------------------ //

export default function setDashboardOpen(navIsOpen) {
  return {
    type: types.SET_DASHBOARD_NAV_OPEN,
    navIsOpen
  };
}
