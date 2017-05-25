import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import request from '../utils/request';
import List from '../components/List';


const IndexPage = ({ dispatch, index }) => {
  function click() {
    request('/users').then((result) => {
      dispatch({
        type: 'index/save',
        payload: result,
      });
    });
  }

  return (
    <div>
      <Button type="primary" onClick={click}>点击获取users</Button>
      <List index={index} />
    </div>
  );
};

IndexPage.propTypes = {
};

export default connect(({ index }) => ({
  index,
}))(IndexPage);
