import { Avatar, Dropdown, Menu, MenuProps, Space, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC } from "react";
import { menuItem } from "../config";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../routes/routes";
import { DownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';


const HeaderLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleChangeMenu: MenuProps["onClick"] = (item: any) => {
    if (item.key === "trang-chu") {
      navigate(routesConfig.trangChu);
    }
    if (item.key === "cua-hang") {
      navigate(routesConfig.cuaHang);
    }
    if (item.key === "test-component") {
      navigate(routesConfig.testComponent);
    }
  };

  const items: MenuProps['items'] = [
    {
        label: (
            <>Thông tin tài khoản</>
        ),
        key: '0',
    },
    {
        label: (
            <>Đơn hàng</>
        ),
        key: '0',
    },
  ];

  return (
    <div className="header-layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--color-primary-5) !important",
        }}
      >
        <img
          src="/images/logo_removeBg.png"
          alt="Delias Logo"
          style={{ width: "10%", margin:"20px 0", color: "#FFF" }}
        />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItem}
          onClick={handleChangeMenu}
          style={{ flex: 1, minWidth: 0 }}
        />
        
        <div className="header-user">
            <Tooltip title="Giỏ hàng">
                <Avatar icon={<ShoppingCartOutlined />} style={{ marginRight:"10px", cursor:"pointer"}} onClick={() => {navigate(routesConfig.gioHang)}}/> 
            </Tooltip>
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                <Space style={{color:"white"}}>
                    <Avatar icon={<UserOutlined />} /> 
                    User Name
                </Space>
                </a>
            </Dropdown>
        </div>
      </Header>
    </div>
  );
};

export default HeaderLayout;
