import expect from 'expect';
import seminarReducer from '../../reducers/seminar';
import { SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE } from '../../actions';

describe('Seminar reducers', () => {
  it('should handle initial state', () => {
    expect(
      seminarReducer(undefined, {})
    ).toEqual({
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: false,
      shouldReload: false,
    });
  });

  it('should handle SEMINAR_REQUEST', () => {
    expect(
      seminarReducer({
        entities: [],
        offset: 0,
        updatedAt: null,
        isFetching: false,
        shouldReload: false,
      }, {
        type: SEMINAR_REQUEST,
      })
    ).toEqual({
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: true,
      shouldReload: false,
    });

    expect(
      seminarReducer({
        entities: [
          {
            title: 'test',
            body: '<p>test</p>',
          },
        ],
        offset: 1,
        updatedAt: 1000000,
        isFetching: false,
        shouldReload: true,
      }, {
        type: SEMINAR_REQUEST,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
        },
      ],
      offset: 1,
      updatedAt: 1000000,
      isFetching: true,
      shouldReload: true,
    });
  });

  it('should handle SEMINAR_SUCCESS', () => {
    expect(
      seminarReducer({
        entities: [],
        offset: 0,
        updatedAt: null,
        isFetching: true,
        shouldReload: false,
      }, {
        type: SEMINAR_SUCCESS,
        payload: {
          entities: [
            {
              title: 'test',
              body: '<p>test</p>',
            },
          ],
          offset: 1,
          updatedAt: 1000000,
          shouldReload: true,
        },
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
        },
      ],
      offset: 1,
      updatedAt: 1000000,
      isFetching: false,
      shouldReload: true,
    });

    expect(
      seminarReducer({
        entities: [
          {
            title: 'test',
            body: '<p>test</p>',
          },
        ],
        offset: 1,
        updatedAt: 1000000,
        isFetching: true,
        shouldReload: true,
      }, {
        type: SEMINAR_SUCCESS,
        payload: {
          entities: [
            {
              title: 'test2',
              body: '<p>test2</p>',
            },
          ],
          offset: 2,
          updatedAt: 1100000,
          shouldReload: false,
        },
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
        },
        {
          title: 'test2',
          body: '<p>test2</p>',
        },
      ],
      offset: 2,
      updatedAt: 1100000,
      isFetching: false,
      shouldReload: false,
    });
  });

  it('should handle SEMINAR_FAILURE', () => {
    expect(
      seminarReducer({
        entities: [],
        offset: 0,
        updatedAt: null,
        isFetching: true,
        shouldReload: false,
      }, {
        type: SEMINAR_FAILURE,
      })
    ).toEqual({
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: false,
      shouldReload: false,
    });

    expect(
      seminarReducer({
        entities: [
          {
            title: 'test',
            body: '<p>test</p>',
          },
        ],
        offset: 1,
        updatedAt: 1000000,
        isFetching: true,
        shouldReload: true,
      }, {
        type: SEMINAR_FAILURE,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
        },
      ],
      offset: 1,
      updatedAt: 1000000,
      isFetching: false,
      shouldReload: true,
    });
  });
});
