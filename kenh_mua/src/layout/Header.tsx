import { Avatar, Button, Dropdown, Menu, MenuProps, Space, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { menuItem } from "../config";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../routes/routes";
import {
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ShowToast from "../components/show-toast/ShowToast";
import LoginPage from "../pages/login";
import ButtonCustom from "../components/button/button";
import RegisterPage from "../pages/register";
type HeaderLayoutProps = {
  setLoading?:(va:boolean) => void
}
const HeaderLayout: React.FC<HeaderLayoutProps> = ({setLoading}) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>();

  useEffect(()=> {
    const checkAuth = localStorage.getItem("auth")
    if(checkAuth){
      setAuth(checkAuth);
    }
  },[])
  //xác thực
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoginModalVisibleReg, setIsLoginModalVisibleReg] = useState(false);

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const handleChangeMenu: MenuProps["onClick"] = (item: any) => {
    if (item.key === "trang-chu") {
      navigate(routesConfig.trangChu);
    }
    if (item.key === "cua-hang") {
      navigate(routesConfig.cuaHang);
    }
    if (item.key === "gio-hang") {
      const auth = localStorage.getItem("auth");
      if (!auth) {
        showLoginModal();
      } else {
        navigate(routesConfig.gioHang);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    ShowToast("success", "Đăng xuất thành công", "Hẹn gặp lại bạn sau!");
    navigate("/");

  };

  const items: MenuProps["items"] = [
    {
      label: <>Thông tin tài khoản</>,
      key: "0",
      onClick: () => {
        navigate("/thong-tin-tai-khoan")
      }
    },
    {
      label: <>Đơn hàng</>,
      key: "1",
      onClick: () => {
        navigate(routesConfig.theoDoiDonHang)
      }
    },
    {
      key: "dang-xuat",
      label: "Đăng xuất",
      onClick: handleLogout,
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
          style={{ width: "10%", margin: "20px 0", color: "#FFF" }}
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
            <Avatar
              icon={<ShoppingCartOutlined />}
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => {
                const auth = localStorage.getItem("auth");
                if (!auth) {
                  showLoginModal();
                } else {
                  navigate(routesConfig.gioHang);
                }
              }}
            />
          </Tooltip>
          {
            auth ? (<Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: "white" }}>
                  <Avatar icon={<UserOutlined />} />
                  User Name
                </Space>
              </a>
            </Dropdown>) : (<div style={{display:"flex", gap:"8px"}}>
              <ButtonCustom text="Đăng nhập" style={{backgroundColor:"var(--color-primary-9)"}} onClick={()=> setIsLoginModalVisible(true)}/> 
              <Button onClick={()=> setIsLoginModalVisibleReg(true)}>Đăng ký</Button> 
            </div>)
          }
          
        </div>
      </Header>

      <LoginPage isOpen={isLoginModalVisible} onClose={() => setIsLoginModalVisible(false)} handleCloseModal={setIsLoginModalVisible} setLoading={setLoading}/>
      <RegisterPage isOpen={isLoginModalVisibleReg} onClose={() => setIsLoginModalVisibleReg(false)} setLoading={setLoading}/>
    </div>
  );
};

export default HeaderLayout;
