import { CALL_API } from 'redux-api-middleware';

import getApiUrl from '.'

import types from '../types';

export function searchUser(query) {
  return {
    [CALL_API]: {
      endpoint: `${getApiUrl()}/search/users?q=${query}`,
      method: 'GET',
      types: [
        types.user.USER_SEARCH_REQUEST,
        {
          type: types.user.USER_SEARCH_SUCCESS,
          meta: (action, state, response) => ({
            url: response.url,
            paging: response.headers.get('Link'),
          }),
        },
        types.user.USER_SEARCH_FAILURE,
      ],
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
    },
  };
}

export function getUser(username) {
  return {
    [CALL_API]: {
      endpoint: `${getApiUrl()}/users/${username}`,
      method: 'GET',
      types: [
        types.user.USER_GET_REQUEST,
        types.user.USER_GET_SUCCESS,
        types.user.USER_GET_FAILURE,
      ],
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
    },
  };
}

export function getUserRepos(endpoint) {
  return {
    [CALL_API]: {
      endpoint,
      method: 'GET',
      types: [
        types.user.USER_GET_REPOS_REQUEST,
        {
          type: types.user.USER_GET_REPOS_SUCCESS,
          meta: (action, state, response) => ({
            url: response.url,
            paging: response.headers.get('Link'),
          }),
        },
        types.user.USER_GET_REPOS_FAILURE,
      ],
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
    },
  };
}

export function clearResults() {
  return {
    type: types.user.USER_SEARCH_CLEAR_RESULTS,
  }
}

export function updateUserNotes(userID, notes) {
  return {
    type: types.localStorage.LOCALSTORAGE_SET_REQUEST,
    payload: {
      key: userID,
      value: notes,
    }
  }
}

export function retrieveUserNotes(userID) {
  return {
    type: types.localStorage.LOCALSTORAGE_GET_REQUEST,
    payload: {
      key: userID,
    }
  }
}

export function removeUserNotes(userID) {
  return {
    type: types.localStorage.LOCALSTORAGE_REM_REQUEST,
    payload: {
      key: userID,
    }
  }
}
