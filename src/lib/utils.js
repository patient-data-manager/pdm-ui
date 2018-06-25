//function which retrieves the token from the current hdm_state
export function getToken() {
  let currentState = loadState()
  //if undefined state, then return undefined for the token
  if (typeof currentState === "undefined") {
    return undefined;
  }
  //otherwise, check the resulting JavaScript object for the proper keys.
  //If any of the keys do not exist in the correponsing order, return undefined.
  if (currentState.currentUser && currentState.currentUser.accessToken) {
        //if access_token key exists, obtain the key and return it.
        return(currentState['currentUser']['accessToken']['access_token']);
      }
    }


//function which determines if the token has expired.
export function tokenExpired() {
  var currentState = loadState();
  //if state obtained is undefined, then return true indicating token has expired
  //and a new token is required.
  if (typeof currentState === "undefined") {
    return true;
  }
  //otherwise, check for corresponding keys to first find the time the token was created at.
  //if it exists.
  if (currentState.currentUser && currentState.currentUser.accessToken) {
    let accessToken = currentState.currentUser.accessToken;
    let dateCreated = accessToken.created_at || 0;
    let expires_in =  accessToken.expires_in || 0;
    let expiration = dateCreated + expires_in;
    let current_time = new Date().getTime() / 1000;
    return (current_time > expiration);
  }
  return true;
}


function loadState() {
  try {
    let persistedState = localStorage.getItem('hdm_state');
    try {
      let a = JSON.parse(persistedState);
    }

    catch (err) {
      return undefined;
    }

    if (persistedState === null) {
      return undefined;
    }
    return JSON.parse(persistedState);

  } catch (err) {
    return undefined;
  }
}
