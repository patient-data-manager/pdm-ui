import * as types from '../../actions/types';
import reducer from '../../reducers/dashboard';

describe('dashboard reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      navIsOpen: false
    });
  });

  // ------------------------- SET NAV OPEN -------------------------------- //
  it('should handle setting the dashboard nav to open', () => {
    const previousState = { navIsOpen: false };
    let action = { type: types.SET_DASHBOARD_NAV_OPEN, navIsOpen: true };
    let newState = { navIsOpen: true };
    expect(reducer(previousState, action)).toEqual(newState);
  });
});
