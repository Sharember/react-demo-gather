/**
 * Created by chengfan on 2017/5/23.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

const List = ({ onDelete, lists }) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={lists}
      columns={columns}
      pagination={{ pageSize: 6 }}
    />
  );
};

List.propTypes = {
  onDelete: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
};

export default List;
