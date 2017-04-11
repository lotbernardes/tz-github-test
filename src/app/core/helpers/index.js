import parseLinkHeader from 'parse-link-header';

export function transformPagingParams({url, paging}) {
  const regex = /[?&](page)=(\d+)/;
  const match = url.match(regex);

  const page = !!match ? match[2] : 1;
  const current = {
    url,
    page,
    rel: 'current',
  };

  const result = !!parseLinkHeader(paging) ? Object.values(parseLinkHeader(paging)) : [];

  const middle = Math.floor(result.length / 2);

  if (result.length > 2) {
    // github sends next, last, first, prev. we need to reorder to make it right.
    const nextLast = result.splice(0, 2);
    result.splice(middle, 0, ...nextLast);
  }

  if (result.length === 4) {
    result.splice(middle, 0, current);
  } else {
    result.splice(0, 0, current);
  }

  return result;
}

export function setLocalStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    try {
      const storage = window.localStorage;

      storage.setItem(key, value);
      resolve();

    } catch(e) {
      reject(e);
    }
  });
}

export function getLocalStorageItem(key) {
  return new Promise((resolve, reject) => {
    try {
      const storage = window.localStorage;

      const item = storage.getItem(key);
      resolve(item);

    } catch(e) {
      reject(e);
    }
  });
}

export function remLocalStorageItem(key) {
  return new Promise((resolve, reject) => {
    try {
      const storage = window.localStorage;

      storage.removeItem(key);
      resolve();

    } catch(e) {
      reject(e);
    }
  });
}
