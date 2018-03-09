import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import styles from './index.less';


export default class HeaderLogo extends PureComponent {

  render() {
    const { logo } = this.props;
    return (
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Blog</h1>
          </Link>
        </div>
    );
  }
}
