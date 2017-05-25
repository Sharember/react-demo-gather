import React from 'react';
import { connect } from 'dva';
import List from '../components/List';
import Add from '../components/Add';

const Lists = ({ dispatch, lists, inputs }) => {
  function handleDelete(id) {
    dispatch({
      type: 'lists/delete',
      payload: id,
    });
  }
  function handleAdd() {
    dispatch({
      type: 'lists/add',
      payload: inputs.input,
    });
  }

  function handelChange(e) {
    dispatch({
      type: 'inputs/change',
      payload: e.target.value,
    });
  }
  return (
    <div>
      <Add onAdd={handleAdd} onChange={handelChange} input={inputs.input} />
      <br />
      <hr />
      <h2>List of Products</h2>
      <br />
      <List onDelete={handleDelete} lists={lists} />
    </div>
  );
};

// export default Lists;
export default connect(({ inputs, lists }) => ({
  inputs, lists,
}))(Lists);
