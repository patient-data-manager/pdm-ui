export function getToken() {
  let currentState = loadState()
  console.log("current state");
  console.log(currentState);
  if (typeof currentState === "undefined") {
    return undefined;
  }
  else if ('currentUser' in currentState) {
    if ('accessToken' in currentState['currentUser']) {
      if ('access_token' in currentState['currentUser']['accessToken']) {
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


export function tokenExpired() {
  var currentState = loadState();
  var dateCreated = 0;
  var expiration = 0;
  if (typeof currentState === "undefined") {
    return true;
  }
  else if ('currentUser' in currentState) {
    if ('accessToken' in currentState['currentUser']) {
      if ('created_at' in currentState['currentUser']['accessToken']) {
        dateCreated = currentState['currentUser']['accessToken']['created_at'];
      }
      else {
        return true;
      }
      if ('expires_in' in currentState['currentUser']['accessToken']) {
        expiration = dateCreated + currentState['currentUser']['accessToken']['expires_in'];
        var current_time = new Date().getTime() / 1000;
        if (current_time < expiration) {
          return false;
        }
        else {
          return true;
        }
      }
    }
    else {
      return true;
    }
  }
  else {
    return true;
  }
}


function loadState() {
  try {
    let persistedState = localStorage.getItem('hdm_state');
    console.log("persist");
    console.log(persistedState);
    try {
      let a = JSON.parse(persistedState);
      console.log(a);
      console.log(typeof persistedState);
    }

    catch (err) {
      console.log(err);
    }

    if (persistedState === null) {
      return undefined;
    }
    return JSON.parse(persistedState);

  } catch (err) {
    return undefined;
  }
}
