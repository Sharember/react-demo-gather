import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import { getMenuData } from '../common/menu';

import logo from '../assets/logo.jpg';

const { Content } = Layout;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BaseLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }
  state = {
    isMobile,
  };
  getChildContext() {
    const { location } = this.props;
    return {
      location,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'blog';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - blog`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return '/home';
    }
    return redirect;
  }
  render() {
    const {
      routerData, match, location,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
        <Layout>
          <GlobalHeader
            logo={logo}
            location={location}
            isMobile={this.state.isMobile}
          />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <Switch>
              {
                redirectData.map(item =>
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                )
              }
              {
                getRoutes(match.path, routerData).map(item =>
                  (
                    <Route
                      key={item}
                      path={item.path}
                      render={props => <item.component {...props} />}
                    />
                  )
                )
              }
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <GlobalFooter
            links={[{
              key: '简书 主页',
              title: '简书 主页',
              href: 'https://www.jianshu.com/u/8dc5811b228f',
              blankTarget: true,
            }, {
              key: 'github',
              title: <Icon type="github" />,
              href: 'https://github.com/cfshuming',
              blankTarget: true,
            }, {
              key: ' csdn 博客',
              title: 'csdn 博客',
              href: 'http://blog.csdn.net/qq_31655965',
              blankTarget: true,
            }]}
            copyright={
              <div>
                Copyright <Icon type="copyright" /> 2018 create by shuming
              </div>
            }
          />
        </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ global, loading }) => ({
  //fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BaseLayout);