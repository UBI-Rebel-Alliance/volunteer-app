import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const LoginForm = ({ disabled, handleEmailSubmit }) => {
  const handleSubmit = async (values) => {
    handleEmailSubmit(values.email);
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{
          required: true,
          message: "Please input your Username!",
        }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={disabled}
        >
          Log In / Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  disabled: PropTypes.boolean,
  handleEmailSubmit: PropTypes.function,
};
