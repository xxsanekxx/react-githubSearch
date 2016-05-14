import * as gitHubApi from '../../services/api';
import { describe, it } from 'mocha';
import chai from 'chai';
import nock from 'nock';

const repositories = require('../../mocks/repositories.json');
const expect = chai.expect;
const should = chai.should();
const repositorie = require('../../mocks/repositorie.json');

//todo add tests for all methods
describe('github api test', () => {
  describe('#getLastRepositories()', () => {
    beforeEach(() => {
      nock('https://api.github.com')
        .get('/repositories')
        .reply(200, JSON.stringify(repositories));
    });

    it('should fetch last 100 repositories', done => {
      gitHubApi.getLastRepositories().then(val => {
        expect(val).to.be.an('array');
        expect(val).to.have.lengthOf(100);
        expect(val).to.eql(repositories);
        done();
      });
    });
  });
});
