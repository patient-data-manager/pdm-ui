import { expect, LocalStorageMock } from '../../lib/test_helper';
import { tokenExpired, getToken } from '../../lib/utils';

global.localStorage = new LocalStorageMock();

describe('test the library functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieved the correct access token', () => {
    localStorage.setItem("hdm_state", JSON.stringify({
      "currentUser": {
        "profile": {},
        "accessToken": {
          "access_token": "f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303",
          "token_type": "bearer",
          "expires_in": 7200,
          "created_at": 1529678369
        }
      }
    }));
    let g = getToken();
    expect(g).to.equal("f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303");
  });

  it('retrieved the correct access token of undefined', () => {
    localStorage.setItem("hdm_state", JSON.stringify({
      "currentUser": {
        "profile": {},
        "accessToken": {
          "token_type": "bearer",
          "expires_in": 7200,
          "created_at": 1529678369
        }
      }
    }));
    let g = getToken();
    expect(g).to.equal(undefined);
  });

  it('retrieved the correct access token of undefined with no accessToken key', () => {
    localStorage.setItem("hdm_state", JSON.stringify({"currentUser":{"profile":{}}}))
    let g = getToken();
    expect(g).to.equal(undefined);
  });

  it('could not find any data and return undefined for access token found', () => {
    let g = getToken();
    expect(g).to.equal(undefined);
  });

  it('could not find the key for currentUser', () => {
    localStorage.setItem("hdm_state", JSON.stringify({}))
    let g = getToken();
    expect(g).to.equal(undefined);
  });

  it('correctly said a token has expired', () => {
    localStorage.setItem("hdm_state", JSON.stringify({
      "currentUser": {
        "profile": {},
        "accessToken": {
          "access_token": "f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303",
          "token_type": "bearer",
          "expires_in": 7200,
          "created_at": 1529678369
        }
      }
    }));
    let g = tokenExpired();
    expect(g).to.equal(true);
  });

  it('correctly said a token has not expired yet', () => {
    var current_time = new Date().getTime() / 1000;
    var object_dict = {
      "currentUser": {
        "profile": {},
        "accessToken": {
          "access_token": "f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303",
          "token_type": "bearer",
          "expires_in": 7200,
          "created_at": current_time
        }
      }
    };
    localStorage.setItem("hdm_state", JSON.stringify(object_dict));
    let g = tokenExpired();
    expect(g).to.equal(false);
  })

  it('could not find any data and return true for access token expired', () => {
    let g = tokenExpired();
    expect(g).to.equal(true);
  });

  it('could not find the created_at key and says token expired ', () => {
    localStorage.setItem("hdm_state", JSON.stringify({
      "currentUser": {
        "profile": {},
        "accessToken": {
          "access_token": "f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303",
          "token_type": "bearer",
          "expires_in": 7200
        }
      }
    }));
    let g = tokenExpired();
    expect(g).to.equal(true);
  });

  it('could not find the expired key and says token expired ', () => {
    localStorage.setItem("hdm_state", JSON.stringify({
      "currentUser": {
        "profile": {},
        "accessToken": {
          "access_token": "f2b43339b45eb2fb75c177ced506ccd5462d2511095e33724d8b477352b72303",
          "token_type": "bearer"
        }
      }
    }));
    let g = tokenExpired();
    expect(g).to.equal(true);
  });

  it('could not find any key data at all and says token expired', () => {
    localStorage.setItem("hdm_state", JSON.stringify({"currentUser":{"profile":{}}}));
    let g = tokenExpired();
    expect(g).to.equal(true);
  });
});
