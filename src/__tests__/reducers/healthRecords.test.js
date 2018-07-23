import reducer from '../../reducers/healthRecords';
import healthRecordData from '../data/fhir_bundle.json';
import * as types from '../../actions/types';

describe('health record reducer', () => {
  it('should fetch and group health record', () => {
    const action = { type: types.LOAD_HEALTH_RECORD_SUCCESS, healthRecord: healthRecordData };
    const startState = {};
    const nextState = reducer(startState, action);
    expect(nextState.healthRecord.Condition.length).toEqual(2);
    expect(nextState.healthRecord.Observation.length).toEqual(32);
    expect(nextState.healthRecord.Encounter.length).toEqual(7);
  });
});
