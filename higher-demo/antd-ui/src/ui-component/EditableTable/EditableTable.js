/**
 * Created by chengfan on 2017/5/27.
 */

import React, { Component } from 'react';
import { Table, Button, Icon, Input, Select, Form, Tooltip } from "antd";
import cx from "classnames";
import "EditableTable.css";

const { Option } = Select;

function updateList(list, index, partial) {
    return list.map((item, i) => (i === index ? { ...item, ...partial } : item));
}

function AddButton({ handleNew }) {
    return (
        <Button
            type="dashed"
            size="small"
            className="addBtn"
            onClick={handleNew}
        >
            <Icon type="plus" />添加
        </Button>
    );
}

function EditableCell({ children, text, editing }) {
    if (editing) {
        return children;
    }
    return <span>{text || "-"}</span>;
}

function EditableTable({
    form,
    data,
    handleNew,
    handleSave,
    handleEdit,
    handleChange,
    handleDelete
}) {
    const renderCell = key => (text, record, index, content) => {
        if (data.length - 1 === index) {
            return { props: { colSpan: 0 } };
        }
        return (
            <EditableCell
                value={text}
                editing={record.editing}
                onChange={e => handleChange(index, key, e.target.value)}
            />
        );
    };

    const { getFieldDecorator, getFieldError } = form;

    const columns = [
        {
            title: "名称",
            key: "name",
            dataIndex: "name",
            render: (text, record, index) => {
                if (data.length - 1 === index) {
                    return {
                        children: <AddButton handleNew={() => handleNew(form)} />,
                        props: { colSpan: 5 }
                    };
                }
                const field = `${index}_name`;
                const error = getFieldError(field) || [];

                return (
                    <EditableCell text={text} editing={record.editing}>
                        <Tooltip
                            visible={error.length > 0}
                            title={error.join()}
                            placement="bottomLeft"
                            overlayClassName="errorTip"
                        >
                            <div className={cx({ "has-error": error.length > 0 })}>
                                {getFieldDecorator(field, {
                                    rules: [
                                        {
                                            required: true,
                                            message: "不能为空"
                                        },
                                        {
                                            pattern: /^[a-z0-9]+$/,
                                            message: "英文字母或数字"
                                        }
                                    ]
                                })(
                                    <Input
                                        size="small"
                                        placeholder="英文字母或数字"
                                        value={text}
                                        onChange={e => handleChange(index, "name", e.target.value)}
                                    />
                                )}
                            </div>
                        </Tooltip>
                    </EditableCell>
                );
            }
        },
        {
            title: "位置",
            key: "position",
            dataIndex: "position",
            width: 100,
            render: (text, record, index) => {
                if (data.length - 1 === index) {
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
                            overlayClassName="errorTip"
                        >
                            <div className={cx({ "has-error": error.length > 0 })}>
                                {getFieldDecorator(field, {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择位置"
                                        }
                                    ]
                                })(
                                    <Select
                                        size="small"
                                        style={{ width: "100%" }}
                                        placeholder="请选择"
                                        value={text}
                                        onChange={value => handleChange(index, "position", value)}
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
            title: <span>类型<span className="titleNote">（选填）</span></span>,
            key: "type",
            dataIndex: "type",
            width: 100,
            render: (text, record, index) => {
                if (data.length - 1 === index) {
                    return { props: { colSpan: 0 } };
                }
                return (
                    <EditableCell text={text} editing={record.editing}>
                        <Select
                            size="small"
                            style={{ width: "100%" }}
                            placeholder="请选择"
                            value={text}
                            onChange={value => handleChange(index, "type", value)}
                        >
                            <Option value="string">string</Option>
                            <Option value="number">number</Option>
                        </Select>
                    </EditableCell>
                );
            }
        },
        {
            title: <span>描述<span className="titleNote">（选填）</span></span>,
            key: "description",
            dataIndex: "description",
            render: (text, record, index) => {
                if (data.length - 1 === index) {
                    return { props: { colSpan: 0 } };
                }
                return (
                    <EditableCell text={text} editing={record.editing}>
                        <Input
                            size="small"
                            placeholder="最多 50 个字符"
                            value={text}
                            onChange={e => handleChange(index, "description", e.target.value)}
                        />
                    </EditableCell>
                );
            }
        },
        {
            title: "操作",
            key: "operationCol",
            width: 160,
            render: (text, record, index) => {
                if (data.length - 1 === index) {
                    return { props: { colSpan: 0 } };
                }
                return (
                    <span

                    >
            {record.editing &&
            <Button size="small" onClick={() => handleSave(form, index)}>
                保存
            </Button>}
                        {!record.editing &&
                        <a href="#" onClick={() => handleEdit(form, index)}>编辑</a>}
                        <a href="#" onClick={() => handleDelete(index)}>删除</a>
          </span>
                );
            }
        }
    ];

    return (
        <Table
            className="editableTable"
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName={record =>
                record.editing ? "rowEditing" : "rowSaved"}
        />
    );
}

EditableTable = Form.create()(EditableTable);

class EditableTableC extends React.Component {
    state = {
        data: []
    };

    newRecord = {
        name: undefined,
        position: undefined,
        type: undefined,
        description: undefined,
        editing: true
    };

    saveEditing(form, callback) {
        const { data } = this.state;
        let editingIndex;
        for (let i = 0; i < data.length; i++) {
            if (data[i].editing) {
                editingIndex = i;
                break;
            }
        }
        if (editingIndex !== undefined) {
            this.handleSave(form, editingIndex, callback);
        } else {
            callback();
        }
    }

    handleNew = form => {
        const { data } = this.state;
        this.saveEditing(form, () => {
            const nextData = data.map(
                item => (item.editing ? { ...item, editing: false } : item)
            );
            this.setState({
                data: [...nextData, this.newRecord]
            });
        });
    };

    handleEdit = (form, index) => {
        // const { data } = this.state;
        // this.saveEditing(form, () => {
        //     this.setState({
        //         data: updateList(prevState.data, index, { editing: true })
        //     });
        // });
    };

    handleChange = (index, key, value) => {
        this.setState(prevState => ({
            data: updateList(prevState.data, index, { [key]: value })
        }));
    };

    handleSave = (form, index, callback) => {
        form.validateFields(errors => {
            if (
                !errors ||
                !Object.keys(errors).some(field => field.indexOf(`${index}_`) === 0)
            ) {
                this.setState(prevState => {
                    const data = updateList(prevState.data, index, { editing: false });
                    if (data.length - 1 === index) {
                        data.push(this.newRecord);
                    }
                    return { data };
                });
                callback && callback();
            }
        });
    };

    handleDelete = index => {
        this.setState(prevState => ({
            data: prevState.data.reduce((acc, record, i) => {
                if (i !== index) {
                    acc.push(record);
                }
                return acc;
            }, [])
        }));
    };

    render() {
        const { data } = this.state;

        return (
            <EditableTable
                data={[...data, {}]}
                handleNew={this.handleNew}
                handleSave={this.handleSave}
                handleEdit={this.handleEdit}
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
            />
        );
    }
}

export default EditableTableC;