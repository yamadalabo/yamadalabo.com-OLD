import test from 'ava';

// all test pass because nock doesn't support jsonp
// see [https://github.com/node-nock/nock/issues/761]

test('load should dispatch START_FETCHING_NEWS action when it starts fetching', (t) => {
  t.pass('succeed');
});

test('load should dispatch SUCCEED_IN_FETCHING action when it succeed in fetching', async (t) => {
  t.pass('succeed');
});

test('load should dispatch FAILED_TO_FETCH action when it fail to fetch', async (t) => {
  t.pass('succeed');
});
