import test from 'ava';
import * as actions from '../../actions';

test('loadNews should create NEWS_LOAD action', (t) => {
  t.deepEqual(
    actions.loadNews(),
    { type: actions.NEWS_LOAD },
  );
});

test('resetNews should create NEWS_RESET action', (t) => {
  t.deepEqual(
    actions.resetNews(),
    { type: actions.NEWS_RESET },
  );
});

test('loadWorks should create WORKS_LOAD action', (t) => {
  t.deepEqual(
    actions.loadWorks(),
    { type: actions.WORKS_LOAD },
  );
});

test('changeFilter should create WORKS_CHANGE_FILTER action', (t) => {
  t.deepEqual(
    actions.changeWorksFilter('some filter'),
    {
      type: actions.WORKS_CHANGE_FILTER,
      payload: {
        filter: 'some filter',
      },
    },
  );
});

test('loadSeminar should create SEMINAR_LOAD action', (t) => {
  t.deepEqual(
    actions.loadSeminar(),
    { type: actions.SEMINAR_LOAD },
  );
});

test('resetSeminar should create SEMINAR_RESET action', (t) => {
  t.deepEqual(
    actions.resetSeminar(),
    { type: actions.SEMINAR_RESET },
  );
});

test('resetErrorMessage should create ERROR_MESSAGE_RESET action', (t) => {
  t.deepEqual(
    actions.resetErrorMessage(),
    { type: actions.ERROR_MESSAGE_RESET },
  );
});
