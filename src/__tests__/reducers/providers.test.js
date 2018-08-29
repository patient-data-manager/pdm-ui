import * as types from '../../actions/types';
import reducer from '../../reducers/providers';

const mockProfileProviderA = { id: 1, profile_id: 3, provider_id: 1 };
const mockProfileProviderB = { id: 2, profile_id: 3, provider_id: 2 };

describe('providers reducer', () => {
  const origWindowAssign = window.location.assign;

  beforeEach(() => { window.location.assign = jest.fn(); });
  afterEach(() => { window.location.assign = origWindowAssign; });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      providers: [],
      profileProviders: [],
      loadProviders: { isLoading: false, loadStatus: null },
      loadProfileProviders: { isLoading: false, loadStatus: null },
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


  // ----------------------- LOAD PROFILE  PROVIDERS -------------------------------- //
  it('should handle loading profile providers', () => {
    const previousState = { profileProviders: [],  loadProfileProviders: { isLoading: false, loadStatus: null } };

    let action = { type: types.PROFILE_PROVIDERS_REQUEST };
    let newState = { loadProfileProviders: { isLoading: true, loadStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.LOAD_PROFILE_PROVIDERS_SUCCESS,
      providers: [mockProfileProviderA, mockProfileProviderB] };
    newState = {
      profileProviders: [mockProfileProviderA, mockProfileProviderB],
      loadProfileProviders: { isLoading: false, loadStatus: 'success' }
    };
    expect(reducer(previousState, action)).toEqual(newState);

    action = { type: types.LOAD_PROFILE_PROVIDERS_FAILURE,
      status: 'Test status', statusText: 'Test status message' };
    newState = { profileProviders: [], loadProfileProviders: { isLoading: false, loadStatus: 'failure' } };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  it('should handle deleting profile providers', () => {
    const previousState = { profileProviders: [mockProfileProviderA, mockProfileProviderB],
      loadProfileProviders: { isLoading: false, loadStatus: null } };

    let action = { type: types.DELETE_PROFILE_PROVIDER_SUCCESS,
      profileProviderId: mockProfileProviderA.id };
    let newState = { profileProviders: [mockProfileProviderB],
      loadProfileProviders: { isLoading: false, loadStatus: null } };
    expect(reducer(previousState, action)).toEqual(newState);
  });

  // ----------------------- LINK PROVIDER --------------------------------- //
  it('should handle linking a provider', () => {
    const previousState = { linkProvider: { isLinking: false, linkStatus: null } };

    let action = { type: types.LINK_PROVIDER_REQUEST };
    let newState = { linkProvider: { isLinking: true, linkStatus: null } };
    expect(reducer([], action)).toEqual(newState);

    action = { type: types.LINK_PROVIDER_SUCCESS, redirectUri: 'http://localhost:8000/oauth' };
    newState = {
      linkProvider: { isLinking: false, linkStatus: 'success' }
    };
    expect(reducer(previousState, action)).toEqual(newState);
    expect(window.location.assign).toBeCalledWith('http://localhost:8000/oauth');

    action = { type: types.LINK_PROVIDER_FAILURE, status: 'Test status', statusText: 'Test status message' };
    newState = { linkProvider: { isLinking: false, linkStatus: 'failure' } };
    expect(reducer(previousState, action)).toEqual(newState);
  });
});
