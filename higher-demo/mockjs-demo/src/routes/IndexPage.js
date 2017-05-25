import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import request from '../utils/request';

function click() {
  request('/data');
}

function IndexPage() {
  return (
    <div className={styles.normal}>
      <button onClick={click}>点击</button>

    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
