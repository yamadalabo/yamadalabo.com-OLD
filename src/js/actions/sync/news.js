export const START_FETCHING = 'START_FETCHING_NEWS';
export const SUCCEED_IN_FETCHING = 'SUCCEED_IN_FETCHING_NEWS';
export const FAILED_TO_FETCH = 'FAILED_TO_FETCH_NEWS';

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

export function failedToFetch(error) {
  return {
    type: FAILED_TO_FETCH,
    error,
  };
}
