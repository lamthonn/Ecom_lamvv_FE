import { Avatar, List, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { axiosConfig, BASE_URL } from "../../config/configApi";
import ShowToast from "../../components/show-toast/ShowToast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import FormInputNumber from "../../components/form-input-number/FormInputNumber";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../../routes/routes";
import FormItemInput from "../../components/form-input/FormInput";
import "./index.scss"
import ButtonCustom from "../../components/button/button";
interface CustomJwtPayload extends JwtPayload {
  id?: string; // hoặc number nếu `dvvc_id` là số
}

type ChiTietGioHangProps = {
  id?: string;
  gio_hang_id?: string;
  san_pham_id?: string;
  so_luong?: number | null;
  san_pham?: SanPhamProps;
};
type SanPhamProps = {
  id?: string;
  danh_muc_id?: string;
  ma_san_pham?: string;
  ten_san_pham?: string;
  mo_ta?: string;
  xuat_xu?: string;
  luot_ban?: number;
  so_luong?: number;
  sku: string;
  mau_sac?: string;
  size?: string;
  duong_dan_anh_bia?: string;
  gia?: number;
  khuyen_mai?: number;
  is_active?: boolean;
};

const GioHang: React.FC = () => {
  const navigate = useNavigate();
  const [dataGioHang, setDataGioHang] = useState<ChiTietGioHangProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      var user = jwtDecode<CustomJwtPayload>(JSON.parse(token).token);
      if (user) {
        handleGetAllData(user.id);
      }
    }
  }, []);

  const handleGetAllData = (userId: any) => {
    setLoading(true);
    axiosConfig
      .get(`api/gio-hang/get-all?account_id=${userId}`)
      .then((res: any) => {
        setDataGioHang(res.data.ds_chi_tiet_gio_hang);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const data = dataGioHang.map((item: any, i: number) => ({
    ma_san_pham: item.san_pham.ma_san_pham,
    // mau_sac: item.san_pham.mau_sac,
    // kich_thuoc: item.san_pham.size,
    href: `${BASE_URL}/${item.san_pham.duong_dan_anh_bia}`,
    title: <div style={{ fontSize: "25px" }}>{item.san_pham.ten_san_pham}</div>,
    description: (
      <div style={{ fontSize: "20px" }}>
        {item.san_pham.khuyen_mai ? (
          <div>
            <Typography.Text
              delete
              style={{ fontSize: "20px", color: "rgb(140 140 140)" }}
            >
              {(item.so_luong * item.san_pham.gia).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography.Text>{" "}
            <Typography.Text
              style={{ fontSize: "20px", color: "rgb(140 140 140)" }}
            >
              {(item.so_luong * item.san_pham.khuyen_mai).toLocaleString(
                "vi-VN",
                {
                  style: "currency",
                  currency: "VND",
                }
              )}
            </Typography.Text>
          </div>
        ) : (
          (item.so_luong * item.san_pham.gia).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        )}
      </div>
    ),
    content: (
      <div style={{display:"flex",  gap:"16px", flexDirection:"column"}}>
        <div style={{display:"flex", width:"50%", gap:"16px", alignItems:"flex-end"}}>
          <FormInputNumber
            label={"Số lượng"}
            value={item.so_luong}
            onChange={(value) => {
              const updatedData = [...dataGioHang];
              updatedData[i].so_luong = value;
              setDataGioHang(updatedData);
            }}
          />

          {item.san_pham.mau_sac ? <FormItemInput value={item.san_pham.mau_sac} disabled={true} label="Màu sắc"/> : ""}
          {item.san_pham.size ? <FormItemInput value={item.san_pham.size}  disabled={true} label="Kích thước"/> : ""}

          <div className="btn-delete">
            <DeleteOutlined />
          </div>
        </div>

        <div className="btn_thanh_toan">
          <ButtonCustom text="MUA HÀNG"/>
        </div>
      </div>
    ),
  }));

  return (
    <div className="gio-hang-chi-tiet">
      <Spin spinning={loading}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item
              key={item.title}
              extra={<img width={272} alt="logo" src={`${item.href}`} />}
            >
              <List.Item.Meta
                title={
                  <a
                    onClick={() =>
                      navigate(`/chi-tiet-san-pham/${item.ma_san_pham}`)
                    }
                  >
                    {item.title}
                  </a>
                }
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default GioHang;
