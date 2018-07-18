import * as types from '../../actions/types';
import reducer from '../../reducers/providers';

describe('providers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      providers: [],
      loadProviders: { isLoading: false, loadStatus: null },
      linkProvider: { isLinking: false, linkStatus: null }
    });
  });

  // ----------------------- LOAD PROVIDERS -------------------------------- //
  it('should handle loading providers', () => {
    const previousState = { loadProviders: { isLoading: false, loadStatus: null } };

    let action = { type: types.PROVIDERS_REQUEST };
    let newState = { loadProviders: { isLoading: true, loadStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.LOAD_PROVIDERS_SUCCESS, providers: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }] };
    newState = {
      providers: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }],
      loadProviders: { isLoading: false, loadStatus: 'success' }
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.LOAD_PROVIDERS_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = { loadProviders: { isLoading: false, loadStatus: 'failure' } };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ----------------------- LINK PROVIDER --------------------------------- //
  it('should handle linking a provider', () => {
    const previousState = { linkProvider: { isLinking: false, linkStatus: null } };

    let action = { type: types.LINK_PROVIDER_REQUEST };
    let newState = { linkProvider: { isLinking: true, linkStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.LINK_PROVIDER_SUCCESS };
    newState = {
      linkProvider: { isLinking: false, linkStatus: 'success' }
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.LINK_PROVIDER_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = { linkProvider: { isLinking: false, linkStatus: 'failure' } };
    expect(reducer(previousState, action)).toEqual(newState);
  });
});
