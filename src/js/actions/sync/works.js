export const START_FETCHING = 'START_FETCHING_WORKS';
export const SUCCEED_IN_FETCHING = 'SUCCEED_IN_FETCHING_WORKS';
export const FAIL_TO_FETCH = 'FAIL_TO_FETCH_WORKS';
export const RESET_ERROR = 'RESET_FETCHING_WORKS_ERROR';
export const CHANGE_FILTER = 'CHANGE_WORKS_FILTER';

export function startFetching() {
  return {
    type: START_FETCHING,
  };
}

export function succeedInFetching(entities) {
  return {
    type: SUCCEED_IN_FETCHING,
    payload: {
      entities,
    },
  };
}

export function failToFetch(error) {
  return {
    type: FAIL_TO_FETCH,
    error,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    payload: {
      filter,
    },
  };
}
