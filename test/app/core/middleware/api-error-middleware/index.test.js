import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { ApiError } from 'redux-api-middleware';

import getApiUrl from '../../../../../src/app/core/actions';
import { getUser } from '../../../../../src/app/core/actions/user.action';

import types from '../../../../../src/app/core/types';

import { middlewares } from '../../../../../src/app/core/middlewares';

const mockStore = configureMockStore(middlewares);

describe('Validation of API Errors', () => {
  it('redirects to Page Not Found when it gets an ApiError with status 404', () => {
    // given
    const username='johndoe';
    const error = new ApiError(404, 'Not Found', {});
    const expected = [
      {
        meta: undefined,
        payload: undefined,
        type: types.user.USER_GET_REQUEST,
      },
      {
        error: true,
        meta: undefined,
        payload: error,
        type: types.user.USER_GET_FAILURE,
      }
    ];

    nock(getApiUrl())
      .get(`/users/${username}`)
      .reply(404, {});

    // when
    const store = mockStore({});


    // then
    return store.dispatch(getUser(username))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});