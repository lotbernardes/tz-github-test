import { push } from 'react-router-redux';

export default store => next => action => {
  if (action.payload && action.payload.constructor.name === 'ApiError') {
    switch(action.payload.status) {
      case 404: {
        store.dispatch(push('/404'));
        break;
      }

      default: {
        return next(action);
      }
    }
  }

  return next(action);
}