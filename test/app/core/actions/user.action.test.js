import React from 'react';
import { isValidRSAA } from 'redux-api-middleware';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';

import getApiUrl from '../../../../src/app/core/actions';
import * as actions from '../../../../src/app/core/actions/user.action';
import { middlewares } from '../../../../src/app/core/middlewares';
import types from '../../../../src/app/core/types';

const mockStore = configureMockStore(middlewares);
const username = 'johndoe';

describe('Validation of API actions according to RSAA', () => {
  test('if getUser is a valid RSAA action', () => {
    // given
    const resource = actions.getUser(username);
    const expected = true;

    // when
    const actual = isValidRSAA(resource);

    // then
    expect(actual).toBe(expected);

  });

  test('if searchUser is a valid RSAA action', () => {
    // given
    const resource = actions.searchUser(username);
    const expected = true;

    // when
    const actual = isValidRSAA(resource);

    // then
    expect(actual).toBe(expected);

  });
});

describe('Validation of API calling and returns', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  test('if getUser returns sucessfully when it finds the given user', () => {
    // given
    const payload = {
      login: username,
      id: 1,
      type: 'User',
      name: username,
    };

    const expected = [
      {
        type: types.user.USER_GET_REQUEST,
        meta: undefined,
        payload: undefined,
      },
      {
        payload,
        type: types.user.USER_GET_SUCCESS,
        meta: undefined,
      }
    ];

    nock(getApiUrl())
      .get(`/users/${username}`)
      .reply(200, payload);

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.getUser(username))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('sucessfully returns repos for the given user', () => {
    // given
    const payload = [
      {
        id: 61914731,
        name: "bt-cashier",
        full_name: `${username}/bt-cashier`,
        owner: {
          login: username,
          id: 333482,
          url: `https://api.github.com/users/${username}`,
          html_url: `https://github.com/${username}`,
          type: "User",
        }
      },
    ];

    const endpoint = `https://api.github.com/users/${username}/repos`;

    const expected = [
      {
        meta: undefined,
        payload: undefined,
        type: "USER_GET_REPOS_REQUEST"
      },
      {
        meta: {
          paging: null,
          url: "https://api.github.com/users/johndoe/repos"
        },
        payload: [
          {
            full_name: "johndoe/bt-cashier",
            id: 61914731,
            name: "bt-cashier",
            owner: {
              html_url: "https://github.com/johndoe",
              id: 333482,
              login: "johndoe",
              type: "User",
              url: "https://api.github.com/users/johndoe"
            }
          }
        ],
        type: "USER_GET_REPOS_SUCCESS"
      }
    ];

    nock(getApiUrl())
      .get(`/users/${username}/repos`)
      .reply(200, payload);

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.getUserRepos(endpoint))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  test('if searchUser returns sucessfully when it finds users with given name', () => {
    // given
    const payload = {
      login: username,
      id: 1,
      type: 'User',
      name: username,
    };

    const link = `<https://api.github.com/search/users?q=${username}&page=2>; rel="next", <https://api.github.com/search/users?q=${username}&page=34>; rel="last"`;

    const replyHeaders = {
      'Link': link
    };

    const expected = [
      {
        type: types.user.USER_SEARCH_REQUEST,
        meta: undefined,
        payload: undefined,
      },
      {
        payload,
        type: types.user.USER_SEARCH_SUCCESS,
        meta: {
          paging: link,
          url: `https://api.github.com/search/users?q=${username}`,
        },
      }
    ];

    nock(getApiUrl())
      .get(`/search/users?q=${username}`)
      .reply(200, payload, replyHeaders);

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.searchUser(username))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});

describe('Validation of synced actions', () => {
  test('if clearResults is a valid action', () => {
    // given
    const expected = {
      type: types.user.USER_SEARCH_CLEAR_RESULTS,
    };

    // when
    const actual = actions.clearResults();

    // then
    expect(actual).toEqual(expected);
  });
});

describe('Validation of localStorage actions', () => {
  // Storage Mock
  const storageMock = () => {
    const storage = {};

    return {
      setItem(key, value) {
        storage[key] = value || '';
      },
      getItem(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key(key) {
        const keys = Object.keys(storage);
        return keys[key] || null;
      }
    };
  };

  beforeAll(() => {
    window.localStorage = storageMock();
  });

  it('sucessfully sets a value to localStorage', () => {
    // given
    const expected = [
      {
        payload: {
          key: 1234,
          value: "1234"
        },
        type: "LOCALSTORAGE_SET_REQUEST"
      },
      {
        payload: {
          key: 1234,
          value: "1234"
        },
        type: "LOCALSTORAGE_SET_SUCCESS"
      }
    ];

    const userID = 1234;
    const notes = '1234';

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.updateUserNotes(userID, notes))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('sucessfully gets a value from localStorage', () => {
    // given
    const expected = [
      {
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_GET_REQUEST"
      },
      {
        payload: {
          key: 1234,
          value: "1234"
        },
        type: "LOCALSTORAGE_GET_SUCCESS"
      }
    ];

    const userID = 1234;

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.retrieveUserNotes(userID))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('sucessfully removes a value from localStorage', () => {
    // given
    const expected = [
      {
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_REM_REQUEST"
      },
      {
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_REM_SUCCESS"
      }
    ];

    const userID = 1234;

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.removeUserNotes(userID))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});

describe('Validation of localStorage failures', () => {
  const setItemError = new Error('It was not possible to set a new item.');
  const getItemError = new Error('It was not possible to get the requested item.');
  const remItemError = new Error('It was not possible to remove the requested item.');

  const brokenStorageMock = () => {
    const storage = {};

    return {
      setItem(key, value) {
        throw setItemError;
      },
      getItem(key) {
        throw getItemError;
      },
      removeItem(key) {
        throw remItemError;
      },
      get length() {
        return Object.keys(storage).length;
      },
      key(key) {
        const keys = Object.keys(storage);
        return keys[key] || null;
      }
    };
  };

  beforeAll(() => {
    window.localStorage = brokenStorageMock();
  });

  it('throws an error when localStorage is somehow broken', () => {
    // given
    const userID = 1234;
    const notes = '1234';

    // when
    const store = mockStore({});


    // then
    expect(store.dispatch(actions.updateUserNotes(userID, notes))).toThrow();
  });

  it('fails when try to updateUserNotes with broken localStorage', () => {
    // given
    const expected = [
      {
        payload: {
          key: 1234,
          value: "1234"
        },
        type: "LOCALSTORAGE_SET_REQUEST"
      },
      {
        error: setItemError,
        payload: {
          key: 1234,
          value: "1234"
        },
        type: "LOCALSTORAGE_SET_FAILURE"
      }
    ];

    const userID = 1234;
    const notes = '1234';

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.updateUserNotes(userID, notes))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('fails when try to retrieveUserNotes with broken localStorage', () => {
    // given
    const expected = [
      {
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_GET_REQUEST"
      },
      {
        error: getItemError,
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_GET_FAILURE"
      }
    ];

    const userID = 1234;

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.retrieveUserNotes(userID))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('fails when try to removeItem with broken localStorage', () => {
    // given
    const expected = [
      {
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_REM_REQUEST"
      },
      {
        error: remItemError,
        payload: {
          key: 1234,
        },
        type: "LOCALSTORAGE_REM_FAILURE"
      }
    ];

    const userID = 1234;

    // when
    const store = mockStore({});


    // then
    return store.dispatch(actions.removeUserNotes(userID))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});