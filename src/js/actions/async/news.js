import {
  startFetching,
  succeedInFetching,
  failToFetch,
} from '../sync/news';
import { getNews } from '../../services/api';

const fetchNews = async (offset = 0) => {
  const params = {
    offset,
  };
  const {
    entities,
    error,
    totalPosts,
  } = await getNews(params);

  if (typeof error !== undefined) {
    return {
      error: error.message || 'Something bad happened',
    };
  }
  const fetchedPostsNum = offset + entities.length;
  const totalPostsNum = parseInt(totalPosts, 10);
  if (fetchedPostsNum === totalPostsNum) {
    return entities;
  }

  const {
    entities: nextEntities,
    error: nextError,
  } = await fetchNews(offset + 20);
  return Object.assign({}, {
    entities: entities.concat(nextEntities),
  }, {
    error: nextError,
  });
};

export const load = () =>
  async dispatch => {
    dispatch(startFetching());
    const { entities, error } = await fetchNews();
    if (typeof error !== 'undefined') {
      dispatch(failToFetch(error.message));
    } else {
      dispatch(succeedInFetching(entities));
    }
  };
