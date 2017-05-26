import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="/index" component={IndexPage} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default RouterConfig;
