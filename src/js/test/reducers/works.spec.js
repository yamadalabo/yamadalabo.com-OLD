import test from 'ava';
import worksReducer from '../../reducers/works';
import { WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE, WORKS_CHANGE_FILTER } from '../../actions';
import { SHOW_ALL, SHOW_BOOK } from '../../constants/WorksFilters';
import { worksEntities1, worksEntities2, time1, time2 } from '../helper/infoForState';

const initialState = {
  entities: [],
  updatedAt: null,
  isFetching: false,
  filter: SHOW_ALL,
};

test('reducer should handle initial state', t => {
  t.same(
    worksReducer(undefined, {}),
    initialState
  );
});

test('reducer should handle WORKS_REQUEST', t => {
  const preStates = [
    initialState,
    Object.assign({}, initialState, {
      isFetching: true,
    }, {
      entities: worksEntities1,
      updatedAt: time1,
      isFetching: false,
    }),
  ];

  t.same(
    worksReducer(preStates[0], {
      type: WORKS_REQUEST,
    }),
    Object.assign({}, preStates[0], {
      isFetching: true,
    })
  );

  t.same(
    worksReducer(preStates[1], {
      type: WORKS_REQUEST,
    }),
    Object.assign({}, preStates[1], {
      isFetching: true,
    })
  );
});

test('reducer should handle WORKS_SUCCESS', t => {
  const preStates = [
    Object.assign({}, initialState, {
      isFetching: true,
    }),
    Object.assign({}, initialState, {
      isFetching: true,
    }, {
      entities: worksEntities1,
      updatedAt: time1,
      isFetching: false,
    }),
  ];

  t.same(
    worksReducer(preStates[0], {
      type: WORKS_SUCCESS,
      payload: {
        entities: worksEntities1,
        updatedAt: time1,
      },
    }),
    Object.assign(preStates[0], {
      entities: worksEntities1,
      updatedAt: time1,
      isFetching: false,
    })
  );

  t.same(
    worksReducer(preStates[1], {
      type: WORKS_SUCCESS,
      payload: {
        entities: worksEntities2,
        updatedAt: time2,
      },
    }),
    Object.assign(preStates[1], {
      entities: [...worksEntities1, ...worksEntities2],
      updatedAt: time2,
      isFetching: false,
    })
  );
});

test('reducer should handle WORKS_FAILURE', t => {
  const preStates = [
    Object.assign(initialState, {
      isFetching: true,
    }),
    Object.assign(initialState, {
      isFetching: true,
    }, {
      entities: worksEntities1,
      updatedAt: time1,
      isFetching: false,
    }),
  ];

  t.same(
    worksReducer(preStates[0], {
      type: WORKS_FAILURE,
    }),
    Object.assign(preStates[0], {
      isFetching: false,
    })
  );

  t.same(
    worksReducer(preStates[1], {
      type: WORKS_FAILURE,
    }),
    Object.assign(preStates[1], {
      isFetching: false,
    })
  );
});

test('reducer should handle WORKS_CHANGE_FILTER', t => {
  const preState = Object.assign(initialState, {
    isFetching: true,
  }, {
    entities: worksEntities1,
    updatedAt: time1,
    isFetching: false,
  });

  t.same(
    worksReducer(preState, {
      type: WORKS_CHANGE_FILTER,
      payload: {
        filter: SHOW_BOOK,
      },
    }),
    Object.assign({}, preState, {
      filter: SHOW_BOOK,
    })
  );
});
