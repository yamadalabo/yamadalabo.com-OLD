import fetchJsonp from 'fetch-jsonp';
import moment from 'moment';
import generateQuery from './helper/generate-query';

const baseUrl = 'http://api.tumblr.com/v2/blog/yamadalab-seminar.tumblr.com';

const convert = (json) => {
  const { meta, response } = json;
  if (meta.status !== 200 || typeof response === 'undefined' || response === null) {
    throw new Error(meta.msg || 'Something bad happened');
  }

  const { posts, total_posts: totalPosts } = response;
  const entities = posts.map((post) => {
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

export default (params = null) => {
  const url = params === null
    ? `${baseUrl}/posts`
    : `${baseUrl}/posts${generateQuery(params)}`;
  return fetchJsonp(url)
    .then(res => res.json())
    .then(json => convert(json))
    .catch(error => ({ error }));
};
