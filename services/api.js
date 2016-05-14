import fetch from 'isomorphic-fetch';
const URL_API = 'https://api.github.com';
const FORKS_TYPES_INCLUDE = ['only', 'true'];

//todo create parse function, object to query string github api syntax
/**
 *
 * @param name
 * @param from
 * @param to
 * @returns {string}
 */
function rangeToQueryStrByName(name, from, to) {
  let query = name + ':';

  if (from == to) {
    query = query + from;
  } else if (!from) {
    query = query + '<=' + to;
  } else if (!to) {
    query = query + '>=' + from;
  } else {
    if (from > to) {
      let tmp = from;
      from = to;
      to = tmp;
    }
    query = query + from + '..' + to;
  }

  return query;
}
/**
 *
 * @param query
 * @param str
 * @returns {string}
 */
function addStrToQuery(query, str) {
  return query ? query + '+' + str : str;
}

/**
 * Get last 100 repositories
 * @param params
 * @returns {*}
 */
export function getLastRepositories(params = {}) {
  return fetch(URL_API + '/repositories' + (params.since > 0 ? '?since=' + params.since : ''))
    .then(response => {
      return response.json();
    });
}

/**
 * Search repositories
 * @param params
 * @returns {*}
 */
export function searchRepositories(params = {}) {
  let query = '';

  if (params.query) {
    query = addStrToQuery(query, params.query);
  }

  if (params.query && params.in) {
    query = addStrToQuery(query, 'in:' + params.in);
  }
  if (params.language) {
    query = addStrToQuery(query, 'language:' + params.language);
  }
  if (params.user) {
    query = addStrToQuery(query, 'user:' + params.user);
  }
  if (params.fork && FORKS_TYPES_INCLUDE.indexOf(params.fork) !== -1) {
    query = addStrToQuery(query, 'fork:' + params.fork);
  }
  if (params.size && (params.size.from || params.size.to)) {
    query = addStrToQuery(query, rangeToQueryStrByName('size', params.size.from, params.size.to));
  }
  if (params.stars && (params.stars.from || params.stars.to)) {
    query = addStrToQuery(query, rangeToQueryStrByName('stars', params.stars.from, params.stars.to));
  }
  if (params.forks && (params.forks.from || params.forks.to)) {
    query = addStrToQuery(query, rangeToQueryStrByName('forks', params.forks.from, params.forks.to));
  }
  if (params.created && (params.created.from || params.created.to)) {
    query = addStrToQuery(query, rangeToQueryStrByName('created', new Date(params.created.from).getTime(), new Date(params.created.to).getTime()));
  }
  if (params.pushed && (params.pushed.from || params.pushed.to)) {
    query = addStrToQuery(query, rangeToQueryStrByName('pushed', new Date(params.pushed.from).getTime(), new Date(params.pushed.to).getTime()));
  }
  return fetch(URL_API + '/search/repositories' + (query ? '?q=' + query : ''))
    .then(response => response.json());
}

/**
 * Get Repo Info
 * @param params
 * @returns {Promise}
 */
export function getRepo(params = {}) {
  return new Promise((resolve, reject) => {

    if (!params.owner) {
      return reject('Error parameter owner is required');
    }
    if (!params.name) {
      return reject('Error parameter name is required');
    }

    return resolve(fetch(URL_API + '/repos/' + params.owner + '/' + params.name)
      .then(response => response.json()));
  });
}
