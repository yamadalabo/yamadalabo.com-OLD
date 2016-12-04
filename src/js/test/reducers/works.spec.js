import test from 'ava';
import reducer from '../../reducers/works';
import {
  START_FETCHING,
  SUCCEED_IN_FETCHING,
  FAIL_TO_FETCH,
  RESET_ERROR,
  CHANGE_FILTER,
} from '../../actions/sync/works';
import { SHOW_ALL, SHOW_BOOK } from '../../constants/WorksFilters';
import { worksEntities1 } from '../helper/infoForState';

const initialState = {
  entities: [],
  error: null,
  isFetching: false,
  filter: SHOW_ALL,
};

test('reducer should handle initial state', (t) => {
  t.deepEqual(
    reducer(undefined, {}),
    initialState,
  );
});

test('reducer should handle START_FETCHING', (t) => {
  const preState = initialState;

  t.deepEqual(
    reducer(preState, {
      type: START_FETCHING,
    }),
    Object.assign({}, preState, {
      isFetching: true,
    }),
  );
});

test('reducer should handle SUCCEED_IN_FETCHING', (t) => {
  const preState = Object.assign({}, initialState, {
    isFetching: true,
  });

  t.deepEqual(
    reducer(preState, {
      type: SUCCEED_IN_FETCHING,
      payload: {
        entities: worksEntities1,
      },
    }),
    Object.assign(preState, {
      entities: worksEntities1,
      isFetching: false,
    }),
  );
});

test('reducer should handle FAIL_TO_FETCH', (t) => {
  const preState = Object.assign({}, initialState, {
    isFetching: true,
  });

  // todo: refactoring this
  const error = 'error';
  t.deepEqual(
    reducer(preState, {
      type: FAIL_TO_FETCH,
      error,
    }),
    Object.assign({}, preState, {
      error,
      isFetching: false,
    }),
  );
});

test('reducer shoud handle RESET_ERROR', (t) => {
  const preState = Object.assign({}, initialState, {
    error: 'error',
  });

  t.deepEqual(
    reducer(preState, {
      type: RESET_ERROR,
    }),
    Object.assign({}, preState, {
      error: null,
    }),
  );
});

test('reducer should handle CHANGE_FILTER', (t) => {
  const preState = Object.assign(initialState, {
    isFetching: true,
  }, {
    entities: worksEntities1,
    isFetching: false,
  });

  t.deepEqual(
    reducer(preState, {
      type: CHANGE_FILTER,
      payload: {
        filter: SHOW_BOOK,
      },
    }),
    Object.assign({}, preState, {
      filter: SHOW_BOOK,
    }),
  );
});
