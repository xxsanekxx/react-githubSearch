import React from 'react';
import sinon, { spy } from 'sinon';
import { shallow, render, mount } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import nock from 'nock';

import RepoPage from '../../pages/repo';
import IndexPage from '../../pages/index';
import ServerErrorPage from '../../pages/500';
import NotFoundPage from '../../pages/404';

import RepoInfo from '../../components/RepoInfo';
import OwnerInfo from '../../components/OwnerInfo';
import SearchForm from '../../components/SearchForm';
import Pagination from '../../components/Pagination';
import ItemsPerPage from '../../components/ItemsPerPage';
import RepositoriesListItem from '../../components/RepositoriesListItem';

const URL_API = 'https://api.github.com';
const repoMock = require('../../mocks/repositorie.json');
const reposMock = require('../../mocks/repositories.json');

describe('TEST React Pages', () => {
  describe('test repo page"', () => {
    const params = {owner: 'github', name: 'Hello-World'};
    nock(URL_API)
      .get('/repos/github/Hello-World')
      .reply(200, repoMock);

    it('should include components and updated state', () => {
      const wrapper = shallow(<RepoPage params={params} />);
      expect(wrapper.find('div.repo-container')).to.have.length(1);
      expect(wrapper.find(RepoInfo)).to.have.length(1);
      expect(wrapper.find(OwnerInfo)).to.have.length(1);
      wrapper.setState({repo: repoMock});
      expect(wrapper.update().state('repo')).to.eql(repoMock);
    });

    it('should render page and do request, then rerender with new data', done => {
      spy(RepoPage.prototype, 'componentDidMount');
      const wrapper = mount(<RepoPage params={params} />);
      expect(wrapper.find('div.repo-container')).to.have.length(1);
      expect(wrapper.find('div.repo-info')).to.have.length(1);
      expect(wrapper.find('div.owner-info')).to.have.length(1);
      // let's wait before request will done
      setTimeout(() => {
        expect(RepoPage.prototype.componentDidMount.calledOnce).to.be.true;
        expect(wrapper.update().state('repo')).to.eql(repoMock);
        RepoPage.prototype.componentDidMount.restore();
        done();
      }, 200);
    });
  });

  describe('test index page', () => {
    beforeEach(() => {
      nock(URL_API)
        .get('/search/repositories')
        .query(true)
        .reply(200, reposMock);
      nock(URL_API)
        .get('/repositories')
        .reply(200, reposMock);
    });

    it('should include components and update state', () => {
      const wrapper = shallow(<IndexPage />);
      expect(wrapper.find(SearchForm)).to.have.length(1);
      expect(wrapper.find(Pagination)).to.have.length(1);
      expect(wrapper.find(ItemsPerPage)).to.have.length(1);
      expect(Array.isArray(wrapper.state().repositories)).to.be.true;
      expect(wrapper.state().repositories.length).to.equal(0);
      wrapper.setState({repositories: reposMock});
      expect(wrapper.update().state('repositories')).to.eql(reposMock);
    });

    it('should render page and do request to last 100 repositories, then rerender with new data', done => {
      spy(IndexPage.prototype, 'componentDidMount');
      const wrapper = mount(<IndexPage />);
      expect(wrapper.find('.filter-block')).to.have.length(1);
      expect(wrapper.find('table')).to.have.length(1);
      expect(wrapper.find('ul.pagination')).to.have.length(1);
      // let's wait before request will done
      setTimeout(() => {
        expect(IndexPage.prototype.componentDidMount.calledOnce).to.be.true;
        expect(wrapper.update().state('repositories')).to.eql(reposMock);
        expect(wrapper.find('table tbody tr')).to.have.length(reposMock.length);
        IndexPage.prototype.componentDidMount.restore();
        done();
      }, 200);
    });

    it('should render page and use button to hide SearchForm, then show SearchForm', () => {
      const wrapper = mount(<IndexPage />);
      expect(wrapper.find('.hidden.filter-block')).to.have.length(1);
      wrapper.find('button.searchForm').simulate('click');
      expect(wrapper.find('.filter-block').hasClass('hidden')).to.be.false;
      expect(wrapper.state('showFilters')).to.be.true;
    });

    it('should submit SearchForm and get error not filled inputs', () => {
      const handleSearch = spy();
      spy(SearchForm.prototype, 'handleSubmitForm');

      const wrapper = mount(<SearchForm show handleSearch={handleSearch} sortBy="created" orderBy="ASC" />);
      wrapper.ref('searchForm').simulate('submit');
      expect(SearchForm.prototype.handleSubmitForm.calledOnce).to.be.true;
      expect(handleSearch.calledOnce).to.be.false;
      expect(wrapper.state('error')).to.not.equal(false);
      SearchForm.prototype.handleSubmitForm.restore();
    });

    it('should render page and do search repositories without filters, then rerender with null data', done => {
      spy(IndexPage.prototype, 'componentDidMount');
      const wrapper = mount(<IndexPage />);
      expect(wrapper.find('.filter-block')).to.have.length(1);
      expect(wrapper.find('table')).to.have.length(1);
      expect(wrapper.find('ul.pagination')).to.have.length(1);
      // let's wait before first request will done
      setTimeout(() => {
        expect(IndexPage.prototype.componentDidMount.calledOnce).to.be.true;
        expect(wrapper.update().state('repositories')).to.eql(reposMock);
        expect(wrapper.find('table tbody tr')).to.have.length(reposMock.length);
        IndexPage.prototype.componentDidMount.restore();
        wrapper.setState({repositories: []});
        expect(wrapper.update().state('repositories')).to.have.length(0);
        wrapper.find('form.form-inline').first().simulate('submit');
        expect(wrapper.update().state('repositories')).to.have.length(0);
        expect(wrapper.find('table tbody tr')).to.have.length(0);
        done();
      }, 300);
    });
  });

  describe('test 404 page', () => {
    it('should render 404 page', () => {
      const wrapper = shallow(<NotFoundPage />);
      expect(wrapper.find('h1')).to.have.length(1);
      expect(wrapper.find('h1').first().text()).to.eql('Not Found');
    });
  });

  describe('test 500 page', () => {
    it('should render 500 page and update error prop', () => {
      const error = new Error('Server error!');
      const wrapper = shallow(<ServerErrorPage error={error} />);
      expect(wrapper.find('h1')).to.have.length(1);
      expect(wrapper.find('h1').first().text()).to.eql('Error');
      expect(wrapper.find('pre')).to.have.length(1);
      expect(wrapper.find('pre').first().text()).to.eql(error.message + '\n\n' + error.stack);
      wrapper.setProps({error: null});
      expect(wrapper.find('pre').first().text()).to.eql('A critical error occurred.');
    });
  });
});
