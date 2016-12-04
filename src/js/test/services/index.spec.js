import test from 'ava';
import jsdomify from 'jsdomify';
import nock from 'nock';
import { callApi } from '../../services';

const mockUrl = 'http://example.com';

test.before(() => jsdomify.create());
test.after(() => jsdomify.destroy());

test('callApi should return result when request succeeded', (t) => {
  nock(mockUrl)
    .get('/')
    .reply(200, {
      response: {
        id: 1000,
        body: 'test',
      },
    });

  callApi(mockUrl)
    .then(obj =>
      t.deepEqual(obj, {
        id: 1000,
        body: 'test',
      }),
    );
});

test('callApi should return error when request failed', (t) => {
  nock(mockUrl)
    .get('/')
    .replyWithError('Somthing bad happened');

  callApi(mockUrl)
    .then(obj =>
      t.deepEqual(obj, { error: 'Something bad happened' }),
    );
});
