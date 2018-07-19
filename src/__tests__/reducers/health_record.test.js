
import healthRecord from '../../reducers/health_record';
import healthRecordData from '../data/fhir_bundle.json';
import * as types from '../../actions/types';

describe('health record reducer', () => {
  xit('should fetch and group health record', () => {
    // const payloadData = { data: healthRecordData };
    const action = { type: types.FETCH_PATIENT_EVERYTHING_SUCCESS, data: healthRecordData };
    const startState = {};
    const nextState = healthRecord(startState, action);
    expect(nextState.healthRecord.Condition.length).toEqual(2);
    expect(nextState.healthRecord.Observation.length).toEqual(32);
    expect(nextState.healthRecord.Encounter.length).toEqual(7);
  });
});
