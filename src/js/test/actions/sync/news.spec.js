import test from 'ava';
import {
  START_FETCHING,
  SUCCEED_IN_FETCHING,
  FAIL_TO_FETCH,
  RESET_ERROR,
  startFetching,
  succeedInFetching,
  failToFetch,
  resetError,
} from '../../../actions/sync/seminar';

test('startFetching should create START_FETCHING action', (t) => {
  t.deepEqual(
    startFetching(),
    { type: START_FETCHING },
  );
});

test('succeedInFetching should create SUCCEED_IN_FETCHING action', (t) => {
  const entities = ['post1', 'post2'];
  t.deepEqual(
    succeedInFetching(entities),
    {
      type: SUCCEED_IN_FETCHING,
      payload: {
        entities,
      },
    },
  );
});

test('failToFetch should create FAIL_TO_FETCH action', (t) => {
  const error = 'Something bad happened';
  t.deepEqual(
    failToFetch(error),
    {
      type: FAIL_TO_FETCH,
      error,
    },
  );
});

test('resetError should create RESET_ERROR action', (t) => {
  t.deepEqual(
    resetError(),
    { type: RESET_ERROR },
  );
});
