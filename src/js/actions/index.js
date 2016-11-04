export const NEWS_LOAD = 'NEWS_LOAD';
export const NEWS_REQUEST = 'NEWS_REQUEST';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_FAILURE = 'NEWS_FAILURE';
export const NEWS_RESET = 'NEWS_RESET';

export function loadNews() {
  return {
    type: NEWS_LOAD,
  };
}

export function resetNews() {
  return {
    type: NEWS_RESET,
  };
}

export const WORKS_LOAD = 'WORKS_LOAD';
export const WORKS_REQUEST = 'WORKS_REQUEST';
export const WORKS_SUCCESS = 'WORKS_SUCCESS';
export const WORKS_FAILURE = 'WORKS_FAILURE';
export const WORKS_CHANGE_FILTER = 'WORKS_CHANGE_FILTER';

export function loadWorks() {
  return {
    type: WORKS_LOAD,
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

export const SEMINAR_LOAD = 'SEMINAR_LOAD';
export const SEMINAR_REQUEST = 'SEMINAR_REQUEST';
export const SEMINAR_SUCCESS = 'SEMINAR_SUCCESS';
export const SEMINAR_FAILURE = 'SEMINAR_FAILURE';
export const SEMINAR_RESET = 'SEMINAR_RESET';

export function loadSeminar() {
  return {
    type: SEMINAR_LOAD,
  };
}

export function resetSeminar() {
  return {
    type: SEMINAR_RESET,
  };
}

export const ERROR_MESSAGE_RESET = 'ERROR_MESSAGE_RESET';
export function resetErrorMessage() {
  return {
    type: ERROR_MESSAGE_RESET,
  };
}
