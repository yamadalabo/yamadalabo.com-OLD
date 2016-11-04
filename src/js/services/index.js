import fetchJsonp from 'fetch-jsonp';

export function callApi(url) {
  return fetchJsonp(url)
    .then(res => res.json())
    .then(json => ({ result: json.response }))
    .catch(error => ({ error: error.message || 'Something had happened' }));
}
