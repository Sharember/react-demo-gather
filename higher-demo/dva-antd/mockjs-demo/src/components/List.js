/**
 * Created by chengfan on 2017/5/23.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const List = ({ index }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'color',
      dataIndex: 'color',
    },
  ];



  
  return (
    <Table
      dataSource={index}
      columns={columns}
      pagination={{ pageSize: 6 }}
    />
  );
};

List.propTypes = {
  index: PropTypes.array.isRequired,
};

export default List;
