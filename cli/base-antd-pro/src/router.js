import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { Spin } from 'antd';

import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';

import styles from './index.less';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          path="/"
          render={props => <BasicLayout {...props} />}
        />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
