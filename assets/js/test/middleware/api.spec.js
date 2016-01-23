import assert from 'power-assert';
import apiMiddleware, { CALL_API } from '../../middleware/api';

describe('api middleware', () => {
  const doDispatch = () => {};
  const doGetState = () => {};
  const nextHandler = apiMiddleware({ dispatch: doDispatch, getState: doGetState });

  it('must return a function to handle next', () => {
    assert(typeof nextHandler === 'function');
    assert(nextHandler.length === 1);
  });

  describe('handle next', () => {
    it('must return a function to handle action', () => {
      const actionHandler = nextHandler();

      assert(typeof actionHandler === 'function');
      assert(actionHandler.length === 1);
    });

    describe('handle action', () => {
      it('must pass action to next if action does not have CALL_API', done => {
        const actionObj = {};

        const actionHandler = nextHandler(action => {
          assert(action, actionObj);
          done();
        });

        actionHandler(actionObj);
      });

      describe('handle CALL_API', () => {
        const actionHandler = nextHandler();

        describe('handle error', () => {
          it('must throw if pageType is not strings', done => {
            const actionObj = {
              [CALL_API]: {
                actionTypes: ['REQUEST', 'SUCCESS', 'FAILURE'],
                url: 'example.com',
              },
            };

            try {
              actionHandler(actionObj);
            } catch (err) {
              done();
            }
          });

          it('must throw if actionTypes is not array', done => {
            const actionObj = {
              [CALL_API]: {
                pageType: 'WORKS',
                actionTypes: '',
                url: 'example.com',
              },
            };

            try {
              actionHandler(actionObj);
            } catch (err) {
              done();
            }
          });

          it('must throw if actionTypes does not have three element', done => {
            const actionObj = {
              [CALL_API]: {
                pageType: 'WORKS',
                actionTypes: ['REQUEST', 'SUCCESS'],
                url: 'example.com',
              },
            };

            try {
              actionHandler(actionObj);
            } catch (err) {
              done();
            }
          });

          it('must throw if every element of actionTypes is not strings', done => {
            const actionObj = {
              [CALL_API]: {
                pageType: 'WORKS',
                actionTypes: ['REQUEST', 'SUCCESS', 10],
                url: 'example.com',
              },
            };

            try {
              actionHandler(actionObj);
            } catch (err) {
              done();
            }
          });

          it('must throw if url is not strings', done => {
            const actionObj = {
              [CALL_API]: {
                pageType: 'WORKS',
                actionTypes: ['REQUEST', 'SUCCESS', 'FAILURE'],
                url: 10,
              },
            };

            try {
              actionHandler(actionObj);
            } catch (err) {
              done();
            }
          });
        });
      });
    });
  });
});
