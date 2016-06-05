import keyMirror from 'keymirror';
import fetch from 'isomorphic-fetch';

export const LoginActions = keyMirror({
  REQUEST_AUTH: null,
  RECEIVE_AUTH: null
});

export const requestAuth = (username, password) => {
  return {
    type: LoginActions.REQUEST_AUTH,
    username,
    password
  };
};

export const receiveAuth = (username, auth) => {
  return {
    type: LoginActions.RECEIVE_AUTH,
    username,
    auth
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(requestAuth(username, password));

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((username, token) => {
        dispatch(receiveAuth(username, token));
      })
  }
};
