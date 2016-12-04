import APIKEY from '../config/apikey';

export default (baseHostname, params) => {
  const url = `http://api.tumblr.com/v2/blog/${baseHostname}/posts?api_key=${APIKEY}`;
  if (params) {
    const query = Object.keys(params).reduce((prevQuery, key) =>
      `${prevQuery}&${key}=${params[key]}`
    , '');
    return url + query;
  }
  return url;
};
