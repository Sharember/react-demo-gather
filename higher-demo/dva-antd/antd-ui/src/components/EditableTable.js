/**
 * Created by chengfan on 2017/5/29.
 */

import { Table, Button, Icon, Input, Select, Form, Tooltip } from 'antd';
import cx from 'classnames';
import styles from 'EditableTable.less';

const { Option } = Select;

function updateList(list, index, partial) {
  return list.map((item, i) => i === index ? { ...item, ...partial } : item);
}

function AddButton({ handleNew }) {
  return (
    <Button type="dashed" size="small" className={styles.addBtn} onClick={handleNew}>
      <Icon type="plus" />添加
    </Button>
  )
}

function EditableCell({ children, text, editing }) {
  if (editing) {
    return children;
  }
  return <span>{text || '-'}</span>;
}

function EditableTable({
  form,
  data,
  handleNew,
  handleSave,
  handleEdit,
  handleChange,
  handleDelete,
}) {
  const renderCell = key => (text, record, index, content) => {
    if ((data.length - 1) === index) {
      return { props: { colSpan: 0 } };
    }
    return (
      <EditableCell
        value={text}
        editing={record.editing}
        onChange={(e) => handleChange(index, key, e.target.value)}
      />
    );
  }

  const { getFieldDecorator, getFieldError } = form;

  const columns = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      render: (text, record, index) => {
        if (data.length - 1 === index) {
          return {
            children: <AddButton handleNew={() => handleNew(form)} />,
            props: { colSpan: 5 },
          }
        }
        const field = `${index}_name`;
        const error = getFieldError(field) || [];

        return (
          <EditableCell text={text} editing={record.editing}>
            <Tooltip
              visible={error.length > 0}
              title={error.join()}
              placement="bottomLeft"
              overlayClassName={styles.errorTip}
            >
              <div className={cx({ 'has-error': error.length > 0 })}>
                {getFieldDecorator(field, {
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                    {
                      pattern: /^[a-z0-9]+$/,
                      message: '英文字母或数字',
                    },
                  ],
                })(
                  <Input
                    size="small"
                    placeholder="英文字母或数字"
                    value={text}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                  />
                )}
              </div>
            </Tooltip>
          </EditableCell>
        );
      }
    },
    {
      title: '位置',
      key: 'position',
      dataIndex: 'position',
      width: 100,
      render: (text, record, index) => {
        if ((data.length - 1) === index) {
          return { props: { colSpan: 0 } };
        }

        const field = `${index}_position`;
        const error = getFieldError(field) || [];

        return (
          <EditableCell text={text} editing={record.editing}>
            <Tooltip
              visible={error.length > 0}
              title={error.join()}
              placement="bottomLeft"
              overlayClassName={styles.errorTip}
            >
              <div className={cx({ 'has-error': error.length > 0 })}>
                {getFieldDecorator(field, {
                  rules: [
                    {
                      required: true,
                      message: '请选择位置',
                    }
                  ]
                })(
                  <Select
                    size="small"
                    style={{ width: '100%' }}
                    placeholder="请选择"
                    value={text}
                    onChange={(value) => handleChange(index, 'position', value)}
                  >
                    <Option value="位置1">位置1</Option>
                    <Option value="位置2">位置2</Option>
                    <Option value="位置3">位置3</Option>
                  </Select>
                )}
              </div>
            </Tooltip>
          </EditableCell>
        );
      }
    },
    {
      title: <span>类型<span className={styles.titleNote}>（选填）</span></span>,
      key: 'type',
      dataIndex: 'type',
      width: 100,
      render: (text, record, index) => {
        if ((data.length - 1) === index) {
          return { props: { colSpan: 0 } };
        }
        return (
          <EditableCell text={text} editing={record.editing}>
            <Select
              size="small"
              style={{ width: '100%' }}
              placeholder="请选择"
              value={text}
              onChange={(value) => handleChange(index, 'type', value)}
            >
              <Option value="string">string</Option>
              <Option value="number">number</Option>
            </Select>
          </EditableCell>
        );
      }
    },
    {
      title: <span>描述<span className={styles.titleNote}>（选填）</span></span>,
      key: 'description',
      dataIndex: 'description',
      render: (text, record, index) => {
        if ((data.length - 1) === index) {
          return { props: { colSpan: 0 } };
        }
        return (
          <EditableCell text={text} editing={record.editing}>
            <Input
              size="small"
              placeholder="最多 50 个字符"
              value={text}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </EditableCell>
        );
      }
    },
    {
      title: '操作',
      key: 'operationCol',
      width: 160,
      render: (text, record, index) => {
        if ((data.length - 1) === index) {
          return { props: { colSpan: 0 } };
        }
        return (
          <span className={cx(styles.operation, { [styles.editing]: record.editing })}>
            {record.editing && <Button size="small" onClick={() => handleSave(form, index)}>保存</Button>}
            {!record.editing && <a href="#" onClick={() => handleEdit(form, index)}>编辑</a> }
            <a href="#" onClick={() => handleDelete(index)}>删除</a>
          </span>
        );
      }
    }
  ];

  return (
    <Table
      className={styles.editableTable}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowClassName={record => record.editing ? styles.rowEditing : styles.rowSaved}
    />
  )
}

EditableTable = Form.create()(EditableTable);

module.exports = EditableTable
