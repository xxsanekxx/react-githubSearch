import * as gitHubApi from '../../services/api';
// import { describe, it } from 'mocha';
import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;
const should = chai.should();
const repositories = require('../../mocks/repositories.json');
const repositorie = require('../../mocks/repositorie.json');
const URL_API = 'https://api.github.com';

describe('github api test', () => {
  let stubFetch;
  before(() => {
    stubFetch = sinon.stub(global, 'fetch');
  });
  after(() => {
    global.fetch.restore();
  });
  describe('#getLastRepositories()', () => {
    it('should fetch last 100 repositories', done => {
      global.fetch.withArgs(URL_API + '/repositories').returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.getLastRepositories().then(val => {
        expect(val).to.be.an('array');
        expect(val).to.have.lengthOf(repositories.length);
        expect(val).to.eql(repositories);
        done();
      }).catch(done);
    });
  });

  describe('#searchRepositories()', () => {
    const searchUrl = URL_API + '/search/repositories';
    it('should search query from repositories', done => {
      const query = 'Hello-world',
        url = searchUrl + '?q=' + query;
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({query: query}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "in name"', done => {
      const query = 'Hello-world',
        param = ['name', 'description'],
        url = searchUrl + '?q=Hello-world+in:' + param.join(',');
      stubFetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({query: query, 'in': param}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "user"', done => {
      const username = 'github',
        url = searchUrl + '?q=user:' + username;
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({user: username}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "fork"', done => {
      const fork = 'only',
        url = searchUrl + '?q=fork:' + fork;
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({fork: fork}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "size"', done => {
      const size = {
          from: 20,
          to: 10,
        },
        url = searchUrl + '?q=size:"' + size.to + '..' + size.from + '"';
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({size: size}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "stars"', done => {
      const stars = {
          from: 20,
          to: 10,
        },
        url = searchUrl + '?q=stars:"' + stars.to + '..' + stars.from + '"';
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({stars: stars}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "forks"', done => {
      const forks = {
          from: 20,
          to: 10,
        },
        url = searchUrl + '?q=forks:"' + forks.to + '..' + forks.from + '"';
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({forks: forks}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "created"', done => {
      const created = {
          from: '2014-01-01',
          to: '2015-01-01',
        },
        url = searchUrl + '?q=created:"' + new Date(created.from).toISOString() + '..' + new Date(created.to).toISOString() + '"';
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({created: created}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });

    it('search query should have param "pushed"', done => {
      const pushed = {
          from: '2015-01-01',
          to: '2016-01-01',
        },
        url = searchUrl + '?q=pushed:"' + new Date(pushed.from).toISOString() + '..' + new Date(pushed.to).toISOString() + '"';
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositories;
        },
      }));
      gitHubApi.searchRepositories({pushed: pushed}).then(val => {
        expect(global.fetch.withArgs(url).calledOnce).to.be.true;
        done();
      }).catch(done);
    });
  });

  describe('#getRepo()', () => {
    const repoUrl = URL_API + '/repos';
    it('get repositorie url should have owner=github, name=Hello-World', done => {
      const owner = 'github',
        repoName = 'Hello-World',
        url = repoUrl + '/' + owner + '/' + repoName;
      global.fetch.withArgs(url).returns(Promise.resolve({
        json: () => {
          return repositorie;
        },
      }));
      gitHubApi.getRepo({owner: owner, name: repoName})
        .then(val => {
          expect(global.fetch.withArgs(url).calledOnce).to.be.true;
          done();
        }).catch(done);
    });
  });
});
