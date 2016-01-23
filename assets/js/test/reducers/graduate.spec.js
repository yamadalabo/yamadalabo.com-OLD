import expect from 'expect';
import graduateReducer from '../../reducers/graduate';
import { WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE } from '../../actions';
import { GRADUATE } from '../../constants/AuthorTypes';

describe('professor reducers', () => {
  it('should handle initial state', () => {
    expect(
      graduateReducer(undefined, {})
    ).toEqual({
      entities: [],
      updatedAt: null,
      isFetching: false,
    });
  });

  it('should handle WORKS_REQUEST', () => {
    expect(
      graduateReducer({
        entities: [],
        updatedAt: null,
        isFetching: false,
      }, {
        type: WORKS_REQUEST,
        authorType: GRADUATE,
      })
    ).toEqual({
      entities: [],
      updatedAt: null,
      isFetching: true,
    });

    expect(
      graduateReducer({
        entities: [
          {
            title: 'test',
            body: '<p>test</p>',
            workType: 'paper',
            timestamp: 1000000,
          },
        ],
        updatedAt: 1000000,
        isFetching: false,
      }, {
        type: WORKS_REQUEST,
        authorType: GRADUATE,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
          workType: 'paper',
          timestamp: 1000000,
        },
      ],
      updatedAt: 1000000,
      isFetching: true,
    });
  });

  it('should handle WORKS_SUCCESS', () => {
    expect(
      graduateReducer({
        entities: [],
        updatedAt: null,
        isFetching: true,
      }, {
        type: WORKS_SUCCESS,
        payload: {
          entities: [
            {
              title: 'test',
              body: '<p>test</p>',
              workType: 'paper',
              timestamp: 1000000,
            },
          ],
          updatedAt: 1000000,
        },
        authorType: GRADUATE,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
          workType: 'paper',
          timestamp: 1000000,
        },
      ],
      updatedAt: 1000000,
      isFetching: false,
    });

    expect(
      graduateReducer({
        entities: [
          {
            title: 'test',
            body: '<p>test</p>',
            workType: 'paper',
            timestamp: 1000000,
          },
        ],
        updatedAt: 1000000,
        isFetching: true,
      }, {
        type: WORKS_SUCCESS,
        payload: {
          entities: [
            {
              title: 'test2',
              body: '<p>test2</p>',
              workType: 'paper',
              timestamp: 1000000,
            },
          ],
          updatedAt: 1100000,
        },
        authorType: GRADUATE,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
          workType: 'paper',
          timestamp: 1000000,
        }, {
          title: 'test2',
          body: '<p>test2</p>',
          workType: 'paper',
          timestamp: 1000000,
        },
      ],
      updatedAt: 1100000,
      isFetching: false,
    });
  });

  it('should handle WORKS_FAILURE', () => {
    expect(
      graduateReducer({
        entities: [],
        updatedAt: null,
        isFetching: true,
      }, {
        type: WORKS_FAILURE,
        authorType: GRADUATE,
      })
    ).toEqual({
      entities: [],
      updatedAt: null,
      isFetching: false,
    });

    expect(
      graduateReducer({
        entities: [
          {
            title: 'test',
            body: '<p>test</p>',
            workType: 'paper',
            timestamp: 1000000,
          },
        ],
        updatedAt: 1000000,
        isFetching: true,
      }, {
        type: WORKS_FAILURE,
        authorType: GRADUATE,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
          workType: 'paper',
          timestamp: 1000000,
        },
      ],
      updatedAt: 1000000,
      isFetching: false,
    });
  });
});
