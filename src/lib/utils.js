//function which retrieves the token from the current hdm_state
export function getToken() {
  let currentState = loadState()
  //if undefined state, then return undefined for the token
  if (typeof currentState === "undefined") {
    return undefined;
  }
  //otherwise, check the resulting JavaScript object for the proper keys.
  //If any of the keys do not exist in the correponsing order, return undefined.
  else if ('currentUser' in currentState) {
    if ('accessToken' in currentState['currentUser']) {
      if ('access_token' in currentState['currentUser']['accessToken']) {
        //if access_token key exists, obtain the key and return it.
        return(currentState['currentUser']['accessToken']['access_token']);
      }
      else {
        return undefined;
      }
    }
    else {
      return undefined;
    }
  }
  else {
    return undefined;
  }
}


//function which determines if the token has expired.
export function tokenExpired() {
  var currentState = loadState();
  var dateCreated = 0;
  var expiration = 0;
  //if state obtained is undefined, then return true indicating token has expired
  //and a new token is required.
  if (typeof currentState === "undefined") {
    return true;
  }
  //otherwise, check for corresponding keys to first find the time the token was created at.
  //if it exists.
  else if ('currentUser' in currentState) {
    if ('accessToken' in currentState['currentUser']) {
      if ('created_at' in currentState['currentUser']['accessToken']) {
        //if token's date of creation exists, extract it.
        dateCreated = currentState['currentUser']['accessToken']['created_at'];
      }
      //otherwise, return true indicating the token has expired.
      else {
        return true;
      }
      //Now, check for expires_in token existing. If it does, extract that information
      //and calculate the time the token will expire in.
      if ('expires_in' in currentState['currentUser']['accessToken']) {
        expiration = dateCreated + currentState['currentUser']['accessToken']['expires_in'];
        //obtain the current time by calling the Date() module.
        var current_time = new Date().getTime() / 1000;
        //Check if expiration time has already been reached. If not, return false
        //which indicates that there is still time before the token expires.
        if (current_time < expiration) {
          return false;
        }
        //Otherwise, token has expired.
        else {
          return true;
        }
      }
      //if expires_in token does not exist, return true indicating token has expired.
      else {
        return true;
      }
    }
    //if accessToken is not in the hash, return true indicating token has expired.
    else {
      return true;
    }
  }
  //indicates currentUser key is not in the hdm_state hash.
  else {
    return true;
  }
}


function loadState() {
  try {
    let persistedState = localStorage.getItem('hdm_state');
    try {
      let a = JSON.parse(persistedState);
    }

    catch (err) {
      console.log(err);
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
