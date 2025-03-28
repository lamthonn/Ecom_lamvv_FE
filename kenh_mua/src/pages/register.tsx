import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";


const { Title, Text } = Typography;

const RegisterPage: React.FC<{isOpen?: boolean, onClose?:boolean }> = ({ isOpen = true, onClose }) => {
  const onFinish = (values:any) => {
    console.log("Login Data:", values);
  };

  return (
    <Modal open={isOpen} centered footer={null} className="login-modal">
      <div className="login-header">
        <img src="/images/logo2.png" alt="Delias Logo" style={{width: "50%", marginLeft:"25%"}} />
        <Title level={3} >Register to member</Title>
      </div>

      <Form name="login" onFinish={onFinish} layout="vertical" className="login-form">
        <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}>
          <Input prefix={<UserOutlined />} placeholder="Tài khoản" allowClear  size="large" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Tạo mật khẩu" allowClear  size="large" />
        </Form.Item>

        <Form.Item name="password-repeat" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Tạo mật khẩu" allowClear  size="large" />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" className="login-button" style={{ width: "100%" }}>
            Tiếp tục
          </Button>
        </Form.Item>

        <div className="social-login">
          <Button type="default" icon={<UserOutlined />} block>
            Đăng nhập với Facebook
          </Button>
        </div>

        <div className="bottom-text">
          <Text>Chưa có tài khoản? <a href="#">Đăng ký</a></Text>
        </div>
      </Form>
    </Modal>
  );
};

export default RegisterPage;
