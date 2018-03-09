import React, { PureComponent } from 'react';
import { Layout, Divider } from 'antd';

import { Link } from 'dva/router';

import HeaderSearch from '../HeaderSearch';
import HeaderMenu from '../HeaderMenu';
import HeaderLogo from '../HeaderLogo';
import styles from './index.less';
import { getMenuData } from '../../common/menu';

const { Header } = Layout;


export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  render() {
    const {
      isMobile, logo, location
    } = this.props;

    return (
      <Header className={styles.header}>
        {isMobile && (
          [
            (
              <Link to="/" className={styles.logo} key="logo">
                <img src={logo} alt="logo" width="32" />
              </Link>
            ),
            <Divider type="vertical" key="line" />,
          ]
        )}
        <HeaderLogo
          className={styles.logo}
          logo={logo}
        />
        <HeaderMenu 
          className={styles.menu}
          menuData={getMenuData()}
          location={location}
          isMobile={isMobile}
        />
        <div className={styles.right}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder="站内搜索"
          dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
          onSearch={(value) => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={(value) => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        
        </div>
      </Header>
    );
  }
}
