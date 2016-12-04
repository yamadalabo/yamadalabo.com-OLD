export const START_FETCHING = 'START_FETCHING_NEWS';
export const SUCCEED_IN_FETCHING = 'SUCCEED_IN_FETCHING_NEWS';
export const FAIL_TO_FETCH = 'FAIL_TO_FETCH_NEWS';
export const RESET_ERROR = 'RESET_ERROR';

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
