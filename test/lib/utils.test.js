import React from 'react';
import ReactDOM from 'react-dom';
import  { tokenExpired, getToken }  from '../../src/lib/utils';
//global.localStorage= `{"currentUser":{"profile":{},"accessToken":{"access_token":"f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303","token_type":"bearer","expires_in":7200,"created_at":1529678369}}})`
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;
localStorage.setItem("hdm_state", JSON.stringify({"currentUser":{"profile":{},"accessToken":{"access_token":"f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303","token_type":"bearer","expires_in":7200,"created_at":1529678369}}}))

    it('retrieved the correct access token', () => {
      let g = getToken();
      const x = Error('I was created using a function call!');
    });
