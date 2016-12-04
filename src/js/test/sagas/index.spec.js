import test from 'ava';
import 'babel-polyfill';
import { put, call } from 'redux-saga/effects';
import { loadNews, loadWorks, loadSeminar,
         createUrl, convertForNewsAndSeminar, convertForWorks,
         NEWS_HOSTNAME, WORKS_HOSTNAME, SEMINAR_HOSTNAME } from '../../sagas';
import { callApi } from '../../services';
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE,
         WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE,
         SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE } from '../../actions';

const result = {
  posts: [],
  total_posts: 0,
};

const error = 'Something bad happened';

test('loadNews saga must dispatch NEWS_REQUEST action', (t) => {
  const generator = loadNews();

  t.deepEqual(
    generator.next().value,
    put({ type: NEWS_REQUEST }),
  );
});

test('loadNews saga must call callApi with url and params', (t) => {
  const generator = loadNews();
  generator.next();

  t.deepEqual(
    generator.next().value,
    call(callApi, createUrl(NEWS_HOSTNAME)),
  );
});

test('loadNews saga must dispatch NEWS_SUCCESS action if callApi succeed', (t) => {
  const generator = loadNews();
  generator.next();
  generator.next();

  const payload = convertForNewsAndSeminar(result);

  t.deepEqual(
    generator.next({ result }).value,
    put({ type: NEWS_SUCCESS, payload }),
  );
});

test('loadNews saga must dispatch NEWS_FAILURE action if callApi failed', (t) => {
  const generator = loadNews();
  generator.next();
  generator.next();

  t.deepEqual(
    generator.next({ error }).value,
    put({ type: NEWS_FAILURE, error }),
  );
});

test('loadWorks saga must dispatch WORKS_REQUEST action', (t) => {
  const generator = loadWorks();

  t.deepEqual(
    generator.next().value,
    put({ type: WORKS_REQUEST }),
  );
});

test('loadWorks saga must call callApi with url', (t) => {
  const generator = loadWorks();
  generator.next();

  t.deepEqual(
    generator.next().value,
    call(callApi, createUrl(WORKS_HOSTNAME)),
  );
});

test('loadWorks saga must dispatch WORKS_FAILURE action if callApi succeeded', (t) => {
  const generator = loadWorks();
  generator.next();
  generator.next();

  t.deepEqual(
    generator.next({ error }).value,
    put({ type: WORKS_FAILURE, error }),
  );
});

test('loadWorks saga must dispatch WORKS_SUCCESS action if callApi failed', (t) => {
  const generator = loadWorks();
  generator.next();
  generator.next();

  const payload = convertForWorks(result);

  t.deepEqual(
    generator.next({ result }).value,
    put({ type: WORKS_SUCCESS, payload }),
  );
});

test('loadSeminar saga must dispatch SEMINAR_REQUEST action', (t) => {
  const generator = loadSeminar();

  t.deepEqual(
    generator.next().value,
    put({ type: SEMINAR_REQUEST }),
  );
});

test('loadSeminar saga must call callApi with url and params', (t) => {
  const generator = loadSeminar();
  generator.next();

  t.deepEqual(
    generator.next().value,
    call(callApi, createUrl(SEMINAR_HOSTNAME)),
  );
});

test('loadSeminar saga must dispatch SEMINAR_SUCCESS action if callApi succeeded', (t) => {
  const generator = loadSeminar();
  generator.next();
  generator.next();

  const payload = convertForNewsAndSeminar(result);

  t.deepEqual(
    generator.next({ result }).value,
    put({ type: SEMINAR_SUCCESS, payload }),
  );
});

test('loadSeminar saga must dispatch SEMINAR_FAILURE action if callApi failed', (t) => {
  const generator = loadSeminar();
  generator.next();
  generator.next();

  t.deepEqual(
    generator.next({ error }).value,
    put({ type: SEMINAR_FAILURE, error }),
  );
});
