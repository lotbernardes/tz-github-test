import types from '../types';
import { transformPagingParams } from '../helpers';

export const initialState = {
  search: {
    total: 0,
    results: [],
    paging: [],
  },
  current: {
    result: null,
    repos: {
      results: [],
      paging: [],
    },
    notes: "",
  },
};

export default function user(state=initialState, action) {
  switch(action.type) {
    case types.user.USER_GET_SUCCESS: {
      state = {
        ...state,
        current: {
          ...state.current,
          result: action.payload,
        }
      };

      break;
    }

    case types.user.USER_GET_REPOS_SUCCESS: {
      state = {
        ...state,
        current: {
          ...state.current,
          repos: {
            results: action.payload,
            paging: transformPagingParams(action.meta),
          },
        }
      };

      break;
    }

    case types.localStorage.LOCALSTORAGE_GET_SUCCESS: {
      state = {
        ...state,
        current: {
          ...state.current,
          notes: action.payload.value || "",
        }
      };

      break;
    }

    case types.user.USER_SEARCH_SUCCESS: {
      state = {
        ...state,
        search: {
          total: action.payload.total_count,
          results: action.payload.items,
          paging: transformPagingParams(action.meta),
        },
      };

      break;
    }

    case types.user.USER_SEARCH_CLEAR_RESULTS: {
      state = {
        ...initialState,
      };

      break;
    }

    default: {
      break;
    }
  }

  return state;
}