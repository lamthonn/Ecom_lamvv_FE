import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from 'react';


export const config = {
    
}

export const menuItem :MenuProps["items"] = [
    {
      key: "trang-chu",
      icon: React.createElement(UserOutlined), 
      label: "Trang chủ",
    },
    {
      key: "cua-hang",
      icon: React.createElement(TeamOutlined), 
      label: "Cửa hàng",
    },
    {
      key: "test-component",
      icon: React.createElement(TeamOutlined), 
      label: "Common Component",
    },
  ];