import fetchJsonp from 'fetch-jsonp';

export default url =>
  fetchJsonp(url).then(res => res.json());
