import types from '../../types';

import { setLocalStorageItem, getLocalStorageItem, remLocalStorageItem } from '../../helpers';

const success = (type, payload) => ({
  payload,
  type: types.localStorage[`LOCALSTORAGE_${type}_SUCCESS`],
});

const failure = (type, error, payload) => ({
  payload,
  error,
  type: types.localStorage[`LOCALSTORAGE_${type}_FAILURE`],
});

// todo: improve the type capture system to be able to catch any *_LOCALSTORAGE_* instead of hardcoded ones.
export default store => next  => action => {
  if (!!action.type && !!action.payload) {
    switch(action.type) {
      case types.localStorage.LOCALSTORAGE_SET_REQUEST: {
        setLocalStorageItem(action.payload.key, action.payload.value).then(
          () => {
            store.dispatch(success('SET', action.payload));
          },
          (error) => {
            store.dispatch(failure('SET', error, action.payload));
          }
        );

        break;
      }

      case types.localStorage.LOCALSTORAGE_GET_REQUEST: {
        getLocalStorageItem(action.payload.key).then(
          (value) => {
            const payload = {
              value,
              ...action.payload,
            };

            store.dispatch(success('GET', payload));
          },
          (error) => {
            store.dispatch(failure('GET', error, action.payload));
          }
        );

        break;
      }

      case types.localStorage.LOCALSTORAGE_REM_REQUEST: {
        remLocalStorageItem(action.payload.key).then(
          () => {
            store.dispatch(success('REM', action.payload));
          },
          (error) => {
            store.dispatch(failure('REM', error, action.payload));
          }
        );

        break;
      }

      default: {
        return next(action);
      }
    }
  }

  return next(action);
}