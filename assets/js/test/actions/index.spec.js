import assert from 'power-assert';
import nock from 'nock';
import isEqual from 'lodash/lang/isEqual';
import moment from 'moment';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../../middleware/api';
import * as actions from '../../actions';
import { PROFESSOR, GRADUATE } from '../../constants/AuthorTypes';

const middlewares = [api, thunk];
const mockTime = moment('2014-04-23T09:54:51').unix();
const mockResponse = {
  meta: {
    status: 200,
    msg: 'OK',
  },
  response: {
    blog: {
      title: 'yamadalab',
      posts: 3,
    },
    total_users: 10,
    users: [
      {
        name: 'nishitani',
      },
      {
        name: 'morito',
      },
    ],
    posts: [
      {
        blog_name: 'yamadalab',
        id: 1000000,
        type: 'text',
        timestamp: mockTime,
        state: 'published',
        format: 'html',
        tags: [
          'paper',
        ],
        title: 'test',
        body: '<p>test</p>',
      },
      {
        blog_name: 'yamadalab',
        id: 1000000,
        type: 'text',
        timestamp: mockTime,
        state: 'published',
        format: 'html',
        tags: [
          'paper',
        ],
        title: 'test2',
        body: '<p>test2</p>',
      },
      {
        blog_name: 'yamadalab',
        id: 1000000,
        type: 'text',
        timestamp: mockTime,
        state: 'published',
        format: 'html',
        tags: [
          'paper',
        ],
        title: 'test3',
        body: '<p>test3</p>',
      },
    ],
  },
  total_posts: 3,
};

function mockStore(getState, expectedAction, done, index = 0) {
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  let dispatchedTime = 0;
  let finished = false;

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        if (action.updatedAt) {
          action.updatedAt = mockTime;
        }

        if (dispatchedTime === index) {
          finished = true;
          try {
            assert(isEqual(action, expectedAction));
            done();
          } catch (err) {
            done(err);
          }
        } else if (!finished && dispatchedTime > index) {
          done();
        }

        ++dispatchedTime;
        return action;
      },
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

describe('actions', () => {
  const mockState = {
    news: {
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: false,
      shouldReload: false,
    },
    professor: {
      entities: [],
      updatedAt: null,
      isFetching: false,
    },
    graduate: {
      entities: [],
      updatedAt: null,
      isFetching: false,
    },
    seminar: {
      entities: [],
      offset: 0,
      updatedAt: null,
      isFetching: false,
      shouldReload: false,
    },
    errorMessage: null,
  };

  describe('loadNews', () => {
    beforeEach(() => {
      nock('http://api.tumblr.com')
        .get('/v2/blog/yamadalab-ocu.tumblr.com/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO&limit=10&offset=0')
        .reply(200, mockResponse);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create NEWS_REQUEST when starting request', done => {
      const expectedAction = {
        type: actions.NEWS_REQUEST,
      };
      const store = mockStore(mockState, expectedAction, done);
      store.dispatch(actions.loadNews());
    });

    it('should create NEWS_SUCCESS action if fetching data successfully', done => {
      const mockNewsEntities = [
        {
          title: 'test',
          body: '<p>test</p>',
        },
        {
          title: 'test2',
          body: '<p>test2</p>',
        },
        {
          title: 'test3',
          body: '<p>test3</p>',
        },
      ];

      const expectedAction = {
        type: actions.NEWS_SUCCESS,
        payload: {
          entities: mockNewsEntities,
          offset: 3,
          updatedAt: mockTime,
          shouldReload: false,
        },
      };
      const store = mockStore(mockState, expectedAction, done, 1);
      store.dispatch(actions.loadNews());
    });
    // Need to test failure case
  });

  describe('loadWorks', () => {
    const mockWorksEntities = [
      {
        title: 'test',
        body: '<p>test</p>',
        workType: 'paper',
        timestamp: mockTime,
      },
      {
        title: 'test2',
        body: '<p>test2</p>',
        workType: 'paper',
        timestamp: mockTime,
      },
      {
        title: 'test3',
        body: '<p>test3</p>',
        workType: 'paper',
        timestamp: mockTime,
      },
    ];

    describe('when arg, author is professor', () => {
      beforeEach(() => {
        nock('http://api.tumblr.com')
          .get('/v2/blog/yamadalab-professor.tumblr.com/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO')
          .reply(200, mockResponse);
      });

      afterEach(() => {
        nock.cleanAll();
      });

      it('should create WORKS_REQUEST when starting request', done => {
        const expectedAction = {
          type: actions.WORKS_REQUEST,
          authorType: PROFESSOR,
        };
        const store = mockStore(mockState, expectedAction, done);
        store.dispatch(actions.loadWorks(PROFESSOR));
      });

      it('should create WORKS_SUCCESS if fetching data successfully', done => {
        const expectedAction = {
          type: actions.WORKS_SUCCESS,
          payload: {
            entities: mockWorksEntities,
            offset: 3,
            updatedAt: mockTime,
            shouldReload: false,
          },
          authorType: PROFESSOR,
        };
        const store = mockStore(mockState, expectedAction, done, 1);
        store.dispatch(actions.loadWorks(PROFESSOR));
      });
    });

    describe('when arg, author is graduate', () => {
      beforeEach(() => {
        nock('http://api.tumblr.com')
          .get('/v2/blog/yamadalab-graduate.tumblr.com/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO')
          .reply(200, mockResponse);
      });

      afterEach(() => {
        nock.cleanAll();
      });

      it('should create WORKS_REQUEST when staring request', done => {
        const expectedAction = {
          type: actions.WORKS_REQUEST,
          authorType: GRADUATE,
        };
        const store = mockStore(mockState, expectedAction, done);
        store.dispatch(actions.loadWorks(GRADUATE));
      });

      it('should create WORKS_SUCCESS if fetching data successfully', done => {
        const expectedAction = {
          type: actions.WORKS_SUCCESS,
          payload: {
            entities: mockWorksEntities,
            offset: 3,
            updatedAt: mockTime,
            shouldReload: false,
          },
          authorType: GRADUATE,
        };
        const store = mockStore(mockState, expectedAction, done, 1);
        store.dispatch(actions.loadWorks(GRADUATE));
      });
    });
  });

  describe('loadSeminar', () => {
    beforeEach(() => {
      nock('http://api.tumblr.com')
        .get('/v2/blog/yamadalab-seminar.tumblr.com/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO&offset=0')
        .reply(200, mockResponse);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create SEMINAR_REQUEST when starting request', done => {
      const expectedAction = {
        type: actions.SEMINAR_REQUEST,
      };
      const store = mockStore(mockState, expectedAction, done);
      store.dispatch(actions.loadSeminar());
    });

    it('should create SEMINAR_SUCCESS if fetching data successfully', done => {
      const mockWorksEntities = [
        {
          title: 'test',
          body: '<p>test</p>',
        },
        {
          title: 'test2',
          body: '<p>test2</p>',
        },
        {
          title: 'test3',
          body: '<p>test3</p>',
        },
      ];
      const expectedAction = {
        type: actions.SEMINAR_SUCCESS,
        payload: {
          entities: mockWorksEntities,
          offset: 3,
          updatedAt: mockTime,
          shouldReload: false,
        },
      };
      const store = mockStore(mockState, expectedAction, done, 1);
      store.dispatch(actions.loadSeminar());
    });
  });
});
