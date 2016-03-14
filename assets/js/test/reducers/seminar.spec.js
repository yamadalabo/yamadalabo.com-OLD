import test from 'ava';
import seminarReducer from '../../reducers/seminar';
import { SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE, SEMINAR_RESET } from '../../actions';
import { entities1, entities2, time1, time2 } from '../helper/infoForState';

const initialState = {
  entities: [],
  offset: 0,
  updatedAt: null,
  isFetching: false,
  shouldReload: false,
};

test('reducer should handle initial state', t => {
  t.same(
    seminarReducer(undefined, {}),
    initialState
  );
});

test('reducer should handle SEMINAR_REQUEST', t => {
  const preStates = [
    initialState,
    Object.assign({}, initialState, {
      isFetching: true,
    }, {
      entities: entities1,
      offset: entities1.length - 1,
      updatedAt: time1,
      isFetching: false,
      shouldReload: true,
    }),
  ];

  t.same(
    seminarReducer(preStates[0], {
      type: SEMINAR_REQUEST,
    }),
    Object.assign({}, preStates[0], {
      isFetching: true,
    })
  );

  t.same(
    seminarReducer(preStates[1], {
      type: SEMINAR_REQUEST,
    }),
    Object.assign({}, preStates[1], {
      isFetching: true,
    })
  );
});

test('reducer should handle SEMINAR_SUCCESS', t => {
  const preStates = [
    Object.assign({}, initialState, {
      isFetching: true,
    }),
    Object.assign({}, initialState, {
      isFetching: true,
    }, {
      entities: entities1,
      offset: entities1.length - 1,
      updatedAt: time1,
      isFetching: false,
      shouldReload: true,
    }, {
      isFetching: true,
    }),
  ];

  t.same(
    seminarReducer(preStates[0], {
      type: SEMINAR_SUCCESS,
      payload: {
        entities: entities1,
        offset: entities1.length - 1,
        updatedAt: time1,
        shouldReload: true,
      },
    }),
    Object.assign(preStates[0], {
      entities: entities1,
      offset: entities1.length - 1,
      updatedAt: time1,
      isFetching: false,
      shouldReload: true,
    })
  );

  t.same(
    seminarReducer(preStates[1], {
      type: SEMINAR_SUCCESS,
      payload: {
        entities: entities2,
        offset: entities1.length + entities2.length - 1,
        updatedAt: time2,
        shouldReload: false,
      },
    }),
    Object.assign({}, preStates[1], {
      entities: [...entities1, ...entities2],
      offset: entities1.length + entities2.length - 1,
      updatedAt: time2,
      isFetching: false,
      shouldReload: false,
    })
  );
});

test('reducer should handle SEMINAR_FAILURE', t => {
  const preStates = [
    Object.assign({}, initialState, {
      isFetching: true,
    }),
    Object.assign({}, initialState, {
      isFetching: true,
    }, {
      entities: entities1,
      offset: entities1.length - 1,
      updatedAt: time1,
      isFetching: false,
      shouldReload: true,
    }, {
      isFetching: true,
    }),
  ];

  t.same(
    seminarReducer(preStates[0], {
      type: SEMINAR_FAILURE,
    }),
    Object.assign({}, preStates[0], {
      isFetching: false,
    })
  );

  t.same(
    seminarReducer(preStates[1], {
      type: SEMINAR_FAILURE,
    }),
    Object.assign({}, preStates[1], {
      isFetching: false,
    })
  );
});

test('reducer should handle SEMINAR_RESET', t => {
  const preStates = [
    initialState,
    Object.assign({}, initialState, {
      isFetching: true,
    }, {
      entities: entities1,
      offset: entities1.length - 1,
      updatedAt: time1,
      isFetching: false,
      shouldReload: true,
    }),
  ];

  t.same(
    seminarReducer(preStates[0], {
      type: SEMINAR_RESET,
    }),
    initialState
  );

  t.same(
    seminarReducer(preStates[1], {
      type: SEMINAR_RESET,
    }),
    Object.assign(preStates[1], {
      entities: [],
      offset: 0,
      shouldReload: false,
    })
  );
});
