import {  RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { router } from "../routes/router";
import "../global.scss";
import React from "react";
import { Breadcrumb, Flex, Layout, Menu, MenuProps } from "antd";
import HeaderLayout from "./Header";
import "./HeaderLayout.scss"

const { Content, Footer, Sider } = Layout;

const MainLayout: React.FC<{children?: React.ReactNode, breadcrumb: string[] }> = ({
  children,
  breadcrumb
}) => {
  const location = useLocation(); // Lấy thông tin route hiện tại
  
  
  // Kiểm tra nếu route là "/login"
  if (location.pathname === "/login") {
    return <RouterProvider router={router} />;
  }

  return (
    <Layout className="header-component">
      <HeaderLayout />
      <Content style={{ padding: '0 48px', }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        {
          breadcrumb.map((item)=> {
            return (<Breadcrumb.Item>{item}</Breadcrumb.Item>)
          })
        }
          
        </Breadcrumb>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            minHeight: "75vh",
            padding: 24,
            borderRadius: 5,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Delias ©{new Date().getFullYear()} Created by Lâm Vũ
      </Footer>
    </Layout>
  );
};

export default MainLayout;
