/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Layout from './components/Layout';
import IndexPage from './pages/index';
import RepoInfoPage from './pages/repo';
import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import { Router, Route, Link, browserHistory } from 'react-router';

const routes = {
  path: '/',
  component: Layout,
  indexRoute: { component: IndexPage },
  childRoutes: [
    { path: 'repo/:owner/:name', component: RepoInfoPage },
    { path: '500', component: ServerErrorPage },
    { path: '*', component: NotFoundPage },
  ]
};

function run() {
  const container = document.getElementById('app');
  ReactDOM.render((
    <Router history={browserHistory} routes={routes} />
  ), container, () => {
    // Track the page view event via Google Analytics
    window.ga('send', 'pageview');
  });
}

if (canUseDOM) {
  // Run the application when both DOM is ready and page content is loaded
  if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run, false);
  }
}

export default { routes };
