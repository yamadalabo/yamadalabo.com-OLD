import fetchJsonp from 'fetch-jsonp';

export const callApi = url =>
  fetchJsonp(url).then(res => res.json());
