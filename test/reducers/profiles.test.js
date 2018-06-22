import { expect } from '../test_helper';
import  profiles  from '../../src/reducers/profiles_reducer';
import {
  CREATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_FULFILLED,
  DELETE_PROFILE_FULFILLED,
  FETCH_PROFILES_FULFILLED
} from '../../src/actions/types';
import keyBy from 'lodash/keyBy';
function findProfile(profiles, id){
  var found = profiles.find(function(element) {
    return element.id == id;
  });
  return found;
}


describe('profiles reducer', () => {
  const profileData = [{id:1,name:"TestP1",first_name: "Joe", last_name: "blow", gender:"M", dob:""},
                    {id:2,name:"TestP2",first_name: "Joe", last_name: "snow", gender:"M", dob:""}];
  const newProfile = {id:3,name:"TestP3",first_name: "Joseph", last_name: "blow", gender:"M", dob:""};
  const updatedProfile = {id:1,name:"Updated Profile",first_name: "Joseph", last_name: "blow", gender:"M", dob:""};

  it('should fetch profiles', () => {
    const payloadData = {data: profileData.slice()};
    const action = {type: FETCH_PROFILES_FULFILLED, payload: payloadData};
    const startState = {}
    const nextState = profiles(startState, action);
    expect(Object.keys(nextState).length).to.equal(2);
  });

  it('should create profiles', () => {
    const payloadData = {data: newProfile};
    const action = {type: CREATE_PROFILE_FULFILLED, payload: payloadData};
    const startState = {}
    const nextState = profiles(keyBy(profileData.slice(), 'id'), action);
    expect(Object.keys(nextState).length).to.equal(3);
  });

  it('should update profiles', () => {
    const payloadData = {data: updatedProfile};
    const current = findProfile(profileData, 1);
    expect(current.name).to.equal("TestP1");
    const action = {type: UPDATE_PROFILE_FULFILLED, payload: payloadData};
    const nextState = profiles(keyBy(profileData.slice(), 'id'), action);
    console.log(nextState);
    const updated = nextState[1];
    expect(updated.name).to.equal("Updated Profile");
  });

  it('should remove profiles', () => {
    const payloadData = {data: {id: 1}};
    const action = {type: DELETE_PROFILE_FULFILLED, payload: payloadData};
    const nextState = profiles(keyBy(profileData.slice(), 'id'), action);
    expect(Object.keys(nextState).length).to.equal(1);

  });
});
