import { createBrowserRouter, Navigate } from "react-router-dom";
import React from 'react';
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import NotFoundPage from "../notFoundPage";
import TestComponent from "../pages/TestComponent";
import { routesConfig } from "./routes";
import MainLayout from "../layout/MainLayout";
import TrangChu from "../pages/trang-chu";
import CuaHang from "../pages/cua-hang";
import GioHang from "../pages/gio-hang";

export const router = createBrowserRouter([
  //người mua
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "register",
    element: <RegisterPage />
  },

  //cửa hàng
  {
    path: routesConfig.cuaHang,
    element: (
      <MainLayout breadcrumb = {["Trang chủ", "Cửa hàng"]}>
        <CuaHang />
      </MainLayout>
    )
  },
  //trang chủ
  {
    path: routesConfig.trangChu,
    element: (
      <MainLayout breadcrumb = {["Trang chủ"]}>
        <TrangChu />
      </MainLayout>
    )
  },
  //giỏ hàng
  {
    path: routesConfig.gioHang,
    element: (
      <MainLayout breadcrumb = {["Trang chủ", "Giỏ hàng"]}>
        <GioHang />
      </MainLayout>
    )
  },
  {
    path: routesConfig.testComponent,
    element: (
      <MainLayout breadcrumb={["Trang chủ", "Test component"]}>
        <TestComponent />
      </MainLayout>
    )
  },

  //các trường hợp khác
  //path mặc định
  {
    path: "",
    element: <Navigate to="/trang-chu" replace />
  },
  //404 not found
  {
    path: "not-found",
    element: <NotFoundPage /> // Hiển thị trang 404
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace /> // Chuyển hướng đến /not-found nếu đường dẫn không hợp lệ
  }
]);
