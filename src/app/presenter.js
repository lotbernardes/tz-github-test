// https://github.com/ReactTraining/react-router/issues/820#issuecomment-256814655
export const forceTrailingSlash = (nextState, replace) => {
  const trailingSlash = '/';
  const path = nextState.location.pathname;
  const hasTrailingSlash = path.slice(-1) === trailingSlash;

  if (!hasTrailingSlash) {
    replace({
      ...nextState.location,
      pathname: path + trailingSlash,
    });
  }
};

export const forceTrailingSlashOnChange = (prevState, nextState, replace) => {
  forceTrailingSlash(nextState, replace);
};
