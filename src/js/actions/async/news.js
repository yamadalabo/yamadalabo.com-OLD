import moment from 'moment';
import {
  startFetching,
  succeedInFetching,
  failedToFetch,
} from '../sync/news';
import {
  callApi,
  createUrl,
} from '../../services';

const baseHostname = 'yamadalab-ocu.tumblr.com';

const convert = result => {
  const { posts, total_posts: totalPosts } = result;

  const entities = posts.map(post => {
    const { id, title, body, tags: [tagDate] } = post;
    let { timestamp } = post;
    if (tagDate) {
      const [year, month = 1] = tagDate
        .replace(/^date-/, '')
        .split(/-/);
      timestamp = moment({ year, month: month - 1 }).unix();
    }
    return { id, title, body, timestamp };
  });

  return {
    entities,
    totalPosts,
  };
};

const fetchNews = async (offset = 0) => {
  const params = {
    offset,
  };
  const url = createUrl(baseHostname, params);
  const { meta, response } = await callApi(url);
  if (meta.status !== 200) {
    throw new Error(meta.msg || 'Something bad happened');
  }
  const { entities, totalPosts } = convert(response);

  if (offset + 1 === parseInt(totalPosts, 10)) {
    return entities;
  }
  return entities.concat(
    entities,
    fetchNews(offset + 20)
  );
};

export const load = () =>
  async dispatch => {
    dispatch(startFetching());

    try {
      const entities = await fetchNews();
      dispatch(succeedInFetching(entities));
    } catch (error) {
      dispatch(failedToFetch(error || 'Something bad happened'));
    }
  };
