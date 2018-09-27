import setDashboardOpen from '../../actions/dashboard';
import * as types from '../../actions/types';

describe('dashboard actions', () => {
  // ----------------------- DASHBOARD NAV --------------------------------- //
  describe('set dashboard nav to open', () => {
    it('should create an action to set the dashboard nav to open', () => {
      const expectedAction = {
        type: types.SET_DASHBOARD_NAV_OPEN,
        navIsOpen: true
      };

      expect(setDashboardOpen(true)).toEqual(expectedAction);
    });
  });
});
