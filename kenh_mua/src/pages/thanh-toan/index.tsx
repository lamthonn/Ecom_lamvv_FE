import { useLocation } from "react-router-dom";
import GroupLabel from "../../components/group-label";
import "./style.scss";
import { useEffect, useState } from "react";
import ShowToast from "../../components/show-toast/ShowToast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { axiosConfig } from "../../config/configApi";
import { Skeleton, Spin, Typography } from "antd";

type ThanhToanProps = {};
interface CustomJwtPayload extends JwtPayload {
  id?: string; // hoặc number nếu `dvvc_id` là số
}
const ThanhToan: React.FC<ThanhToanProps> = ({}) => {
  const location = useLocation();
  const dataThanhToan = location.state;
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<any>();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      var user = jwtDecode<CustomJwtPayload>(JSON.parse(token).token);
      if (user) {
        setLoading(true);
        axiosConfig
          .get(`/api/account/${user.id}`)
          .then((res: any) => {
            setDataUser(res.data);
          })
          .catch((err: any) => {
            ShowToast("error", "Thông báo", "Có lỗi xảy ra", 3);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (!dataThanhToan) {
      ShowToast("warning", "Thông báo", "Không có dữ liệu tanh toán", 3);
    }
  }, [dataThanhToan]);
  if (dataUser) {
    return (
      <Spin spinning={loading}>
        <div className="thanh-toan">
          <div className="thong-tin-thanh-toan">
            <div className="thanh-toan-left">
              <GroupLabel label="Thông tin sản phẩm" />
            </div>
            <div className="thanh-toan-right">
              <GroupLabel label="Thông tin nhận hàng" />
              <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
                <div className="ten">
                  <Typography.Text>Tên: {dataUser.ten}</Typography.Text>
                </div>
                <div className="sdt">
                  <Typography.Text>
                    Số điện thoại: {dataUser.so_dien_thoai}
                  </Typography.Text>
                </div>
                <div className="dia_chi">
                  <Typography.Text>
                    Địa chỉ: {dataUser.dia_chi}
                  </Typography.Text>
                </div>
                <div className="thay-doi-thong-tin">
                  <Typography.Text>
                    Địa chỉ: {dataUser.dia_chi}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    );
  } else {
    return <Skeleton active />;
  }
};

export default ThanhToan;
