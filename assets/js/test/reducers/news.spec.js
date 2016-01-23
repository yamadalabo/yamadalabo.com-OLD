import expect from 'expect';
import newsReducer from '../../reducers/news';
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE } from '../../actions';

describe('news reducers', () => {
  it('should handle initial state', () => {
    expect(
      newsReducer(undefined, {})
    ).toEqual({
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: false,
      shouldReload: false,
    });
  });

  it('should handle NEWS_REQUEST', () => {
    expect(
      newsReducer({
        entities: [],
        offset: 0,
        updatedAt: null,
        isFetching: false,
        shouldReload: false,
      }, {
        type: NEWS_REQUEST,
      })
    ).toEqual({
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: true,
      shouldReload: false,
    });

    expect(
      newsReducer({
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
        type: NEWS_REQUEST,
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

  it('should handle NEWS_SUCCESS', () => {
    expect(
      newsReducer({
        entities: [],
        offset: 0,
        updatedAt: null,
        isFetching: true,
        shouldReload: false,
      }, {
        type: NEWS_SUCCESS,
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
      newsReducer({
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
        type: NEWS_SUCCESS,
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

  it('should handle NEWS_FAILURE', () => {
    expect(
      newsReducer({
        entities: [],
        offset: 0,
        updatedAt: null,
        isFetching: true,
        shouldReload: false,
      }, {
        type: NEWS_FAILURE,
      })
    ).toEqual({
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: false,
      shouldReload: false,
    });

    expect(
      newsReducer({
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
        type: NEWS_FAILURE,
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
