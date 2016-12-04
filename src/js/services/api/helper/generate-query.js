export default params => Object.keys(params)
  .reduce((prevQuery, key) => `${prevQuery}&${key}=${params[key]}`, '?');
