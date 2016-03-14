import test from 'ava';
import newsReducer from '../../reducers/news';
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE, NEWS_RESET } from '../../actions';
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
    newsReducer(undefined, {}),
    initialState
  );
});

test('reducer should handle NEWS_REQUEST', t => {
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
    newsReducer(preStates[0], {
      type: NEWS_REQUEST,
    }),
    Object.assign({}, preStates[0], {
      isFetching: true,
    })
  );

  t.same(
    newsReducer(preStates[1], {
      type: NEWS_REQUEST,
    }),
    Object.assign({}, preStates[1], {
      isFetching: true,
    })
  );
});

test('reducer should handle NEWS_SUCCESS', t => {
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
    newsReducer(preStates[0], {
      type: NEWS_SUCCESS,
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
    newsReducer(preStates[1], {
      type: NEWS_SUCCESS,
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

test('reducer should handle NEWS_FAILURE', t => {
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
    newsReducer(preStates[0], {
      type: NEWS_FAILURE,
    }),
    Object.assign({}, preStates[0], {
      isFetching: false,
    })
  );

  t.same(
    newsReducer(preStates[1], {
      type: NEWS_FAILURE,
    }),
    Object.assign({}, preStates[1], {
      isFetching: false,
    })
  );
});

test('reducer should handle NEWS_RESET', t => {
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
    newsReducer(preStates[0], {
      type: NEWS_RESET,
    }),
    initialState
  );

  t.same(
    newsReducer(preStates[1], {
      type: NEWS_RESET,
    }),
    Object.assign(preStates[1], {
      entities: [],
      offset: 0,
      shouldReload: false,
    })
  );
});
