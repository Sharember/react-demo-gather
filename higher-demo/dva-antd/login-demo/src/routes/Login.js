import React from 'react';
import { connect } from 'dva';
import styles from './Login.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const Login = ({
  dispatch,
  login,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  const { loginLoading } = login;

  function handelSubmit() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({
        type: 'login/login',
        payload: values,
      });
    });
  }

  return (
    <div className={styles.warp}>
      <Form className={styles.form}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={styles.forgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" onClick={handelSubmit} className={styles.button} loading={loginLoading}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    </div>
  );
};

// export default Lists;
export default connect(({ login }) => ({
  login,
}))(Form.create()(Login));
