import * as types from './types';
import axios from 'axios';

export function fetchPatientEverything(id) {
  return (dispatch, getState) => {
    const access_token = getState().auth.accessToken;
    return dispatch({
      type: types.FETCH_PATIENT_EVERYTHING,
      payload: axios.get('/api/v1/Patient/'+id+'/$everything?access_token='+access_token,{},
       {headers: {'X-Key-Inflection': 'camel',
          'Accept': 'application/json'}})
    });
  };
}
