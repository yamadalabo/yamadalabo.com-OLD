export const NEWS_REQUEST = 'NEWS_REQUEST';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_FAILURE = 'NEWS_FAILURE';
export const NEWS_RESET = 'NEWS_RESET';

export function loadNews() {
  return {
    type: NEWS_REQUEST,
  };
}

export function resetNews() {
  return {
    type: NEWS_RESET,
  };
}

export const WORKS_REQUEST = 'WORKS_REQUEST';
export const WORKS_SUCCESS = 'WORKS_SUCCESS';
export const WORKS_FAILURE = 'WORKS_FAILURE';
export const WORKS_CHANGE_FILTER = 'WORKS_CHANGE_FILTER';

export function loadWorks() {
  return {
    type: WORKS_REQUEST,
  };
}

export function changeWorksFilter(filter) {
  return {
    type: WORKS_CHANGE_FILTER,
    payload: {
      filter,
    },
  };
}

export const SEMINAR_REQUEST = 'SEMINAR_REQUEST';
export const SEMINAR_SUCCESS = 'SEMINAR_SUCCESS';
export const SEMINAR_FAILURE = 'SEMINAR_FAILURE';
export const SEMINAR_RESET = 'SEMINAR_RESET';

export function loadSeminar() {
  return {
    type: SEMINAR_REQUEST,
  };
}

export function resetSeminar() {
  return {
    type: SEMINAR_RESET,
  };
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE,
  };
}
