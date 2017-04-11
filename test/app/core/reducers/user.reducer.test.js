import userReducer, { initialState } from '../../../../src/app/core/reducers/user.reducer';
import types from '../../../../src/app/core/types';

describe('Validation on user reducer', () => {
  it('returns the initialState', () => {
    // given

    // when
    const actual = userReducer(undefined, {});

    // then
    expect(actual).toEqual(initialState);
  });

  it('handles the searchUser sucessful result', () => {
    // given
    const username = 'johndoe';

    const payload = {
      total_count: 1,
      items: [
        {
          login: username,
          id: 1,
          type: 'User',
          name: username,
        }
      ],
    };

    const link = `<https://api.github.com/search/users?q=${username}&page=2>; rel="next", <https://api.github.com/search/users?q=${username}&page=34>; rel="last"`;

    const action = {
      payload,
      type: types.user.USER_SEARCH_SUCCESS,
      meta: {
        paging: link,
        url: `https://api.github.com/search/users?q=${username}`,
      },
    };

    const expected = {
      ...initialState,
      current: {
        notes: "",
        repos: {
          paging: [],
          results: []
        },
        result: null
      },
      search: {
        paging: [
          {
            page: 1,
            rel: "current",
            url: "https://api.github.com/search/users?q=johndoe"
          },
          {
            page: "2",
            q: "johndoe",
            rel: "next",
            url: "https://api.github.com/search/users?q=johndoe&page=2"
          },
          {
            page: "34",
            q: "johndoe",
            rel: "last",
            url: "https://api.github.com/search/users?q=johndoe&page=34"
          }
        ],
        results: [
          {
            id: 1,
            login: "johndoe",
            name: "johndoe",
            type: "User"
          }
        ],
        total: 1
      }
    };

    // when
    const actual = userReducer(undefined, action);

    // then
    expect(actual).toEqual(expected);
  });

  it('handles the getUser sucessful result', () => {
    // given
    const username = 'johndoe';

    const payload = {
      total_count: 1,
      items: [
        {
          login: username,
          id: 1,
          type: 'User',
          name: username,
        }
      ],
    };

    const action = {
      payload,
      type: types.user.USER_GET_SUCCESS,
      meta: undefined,
    };

    const expected = {
      ...initialState,
      current: {
        notes: "",
        repos: {
          paging: [],
          results: []
        },
        result: {
          items: [
            {
              id: 1,
              login: "johndoe",
              name: "johndoe",
              type: "User"
            }
          ],
          total_count: 1
        }
      },
      search: {
        paging: [],
        results: [],
        total: 0
      }
    };

    // when
    const actual = userReducer(undefined, action);

    // then
    expect(actual).toEqual(expected);
  });

  it('handles the getUserRepos sucessful result', () => {
    // given
    const username = 'johndoe';

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

    const link = `<https://api.github.com/user/${username}/repos?page=2>; rel="next", <https://api.github.com/user/${username}/repos?page=34>; rel="last"`;

    const action = {
      payload,
      type: types.user.USER_GET_REPOS_SUCCESS,
      meta: {
        paging: link,
        url: `https://api.github.com/users/${username}/repos`,
      },
    };

    const expected = {
      ...initialState,
      current: {
        notes: "",
        repos: {
          paging: [
            {
              page: 1,
              rel: "current",
              url: "https://api.github.com/users/johndoe/repos"
            },
            {
              page: "2",
              rel: "next",
              url: "https://api.github.com/user/johndoe/repos?page=2"
            },
            {
              page: "34",
              rel: "last",
              url: "https://api.github.com/user/johndoe/repos?page=34"
            }
          ],
          results: [
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
          ]
        },
        result: null
      },
      search: {
        paging: [],
        results: [],
        total: 0
      }
    };

    // when
    const actual = userReducer(undefined, action);

    // then
    expect(actual).toEqual(expected);
  });

  it('successfully gets an item from local storage', () => {
    // given
    const action = {
      type: types.localStorage.LOCALSTORAGE_GET_SUCCESS,
      payload: {
        key: 1234,
        value: '1234',
      }
    };

    const expected = {
      current: {
        notes: "1234",
        repos: {
          paging: [],
          results: [],
        },
        result: null
      },
      search: {
        paging: [],
        results: [],
        total: 0
      }
    };

    // when
    const actual = userReducer(undefined, action);

    // then
    expect(actual).toEqual(expected);
  });

  it('successfully gets an item from local storage but returns blank for null value', () => {
    // given
    const action = {
      type: types.localStorage.LOCALSTORAGE_GET_SUCCESS,
      payload: {
        key: 1234,
        value: null,
      }
    };

    const expected = {
      current: {
        notes: "",
        repos: {
          paging: [],
          results: [],
        },
        result: null
      },
      search: {
        paging: [],
        results: [],
        total: 0
      }
    };

    // when
    const actual = userReducer(undefined, action);

    // then
    expect(actual).toEqual(expected);
  });

  it('resets the state to initialState', () => {
    // given
    const action = {
      type: types.user.USER_SEARCH_CLEAR_RESULTS,
    };

    // when
    const actual = userReducer(undefined, action);

    // then
    expect(actual).toEqual(initialState);
  });
});