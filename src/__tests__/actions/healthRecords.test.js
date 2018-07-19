import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from '../../actions/profiles';
import * as types from '../../actions/types';

// const mockProfileA = { id: 1, name: "Jane Doe" };
// const mockProfileB = { id: 2, name: "John Doe" };
// const mockProfileC = { id: 1, name: "Janey Doe" };
const mockHealthRecord = { id: 1 };

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('health records actions', () => {
  // ----------------------- LOAD HEALTH RECORD ---------------------------- //
  describe('should handle loading a health record', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create LOAD_HEALTH_RECORD_SUCCESS after successfully loading a health record', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: mockHealthRecord });
      });

      const store = mockStore({ healthRecord: {}, auth: { accessToken: 'abc' } });
      const expectedActions = [
        { type: types.HEALTH_RECORD_REQUEST },
        { type: types.LOAD_HEALTH_RECORD_SUCCESS, healthRecord: mockHealthRecord }
      ];

      return store.dispatch(actions.loadHealthRecord(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
