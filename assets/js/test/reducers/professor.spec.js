import expect from 'expect';
import professorReducer from '../../reducers/professor';
import { WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE } from '../../actions';
import { PROFESSOR } from '../../constants/AuthorTypes';

describe('professor reducer', () => {
  it('should handle initial state', () => {
    expect(
      professorReducer(undefined, {})
    ).toEqual({
      entities: [],
      updatedAt: null,
      isFetching: false,
    });
  });

  it('should handle WORKS_REQUEST', () => {
    expect(
      professorReducer({
        entities: [],
        updatedAt: null,
        isFetching: false,
      }, {
        type: WORKS_REQUEST,
        authorType: PROFESSOR,
      })
    ).toEqual({
      entities: [],
      updatedAt: null,
      isFetching: true,
    });

    expect(
      professorReducer({
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
        authorType: PROFESSOR,
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
      professorReducer({
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
        authorType: PROFESSOR,
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
      professorReducer({
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
        authorType: PROFESSOR,
      })
    ).toEqual({
      entities: [
        {
          title: 'test',
          body: '<p>test</p>',
          workType: 'paper',
          timestamp: 1000000,
        },
        {
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
      professorReducer({
        entities: [],
        updatedAt: null,
        isFetching: true,
      }, {
        type: WORKS_FAILURE,
        authorType: PROFESSOR,
      })
    ).toEqual({
      entities: [],
      updatedAt: null,
      isFetching: false,
    });

    expect(
      professorReducer({
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
        authorType: PROFESSOR,
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
