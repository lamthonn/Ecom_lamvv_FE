import { useLocation, useNavigate } from "react-router-dom";
import GroupLabel from "../../components/group-label";
import "./style.scss";
import { useEffect, useState } from "react";
import ShowToast from "../../components/show-toast/ShowToast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Skeleton, Spin, Table, Typography } from "antd";
import ButtonCustom from "../../components/button/button";
import { routesConfig } from "../../routes/routes";
import { getDetailAcc } from "../../services/AuthenServices";
import { ConvertNumberToVND } from "../../config";

type ThanhToanProps = {};
interface CustomJwtPayload extends JwtPayload {
  id?: string; // hoặc number nếu `dvvc_id` là số
}
const ThanhToan: React.FC<ThanhToanProps> = ({}) => {
  const location = useLocation();
  const dataThanhToan = location.state;
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      var user = jwtDecode<CustomJwtPayload>(JSON.parse(token).token);
      if (user) {
        setLoading(true);
        getDetailAcc()
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
    console.log("dataThanhToan:: ", dataThanhToan);
    
    if (!dataThanhToan) {
      ShowToast("warning", "Thông báo", "Không có dữ liệu tanh toán", 3);
    }
  }, [dataThanhToan]);
  //table
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "href",
      render: (href: string) => <img src={href} alt="product" width={"80%"} />,
      width: "15%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
     
      width: "20%",
    },
    {
      title: "Giá",
      dataIndex: "gia",
      render: (text: any, record:any) => (
        <div style={{ fontSize: "16px" }}>{record.khuyen_mai ? ConvertNumberToVND(record.khuyen_mai) : ConvertNumberToVND(record.gia)}</div>
      ),
      width: "15%",
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      width: "10%",
    },
    {
      title: "Biến thể",
      dataIndex: "san_pham",
      render: (san_pham:any) => (
        <div
          style={{
            fontSize: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {san_pham?.mau_sac ? `Màu: ${san_pham?.mau_sac}` : ""}
          {san_pham?.size ? `Màu: ${san_pham?.size}` : ""}
        </div>
      ),
      width: "10%",
    },
  ];

  if (dataUser) {
    return (
      <Spin spinning={loading}>
        <div className="thanh-toan">
          <div className="thong-tin-thanh-toan">
            <div className="thanh-toan-left">
              <GroupLabel label="Thông tin sản phẩm" />
              <div>
                <Table 
                  columns={columns}
                  dataSource={dataThanhToan}
                />
              </div>
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
                  <ButtonCustom text="Thay đổi thông tin" onClick={()=> {navigate(routesConfig.thongTinTaiKhoan)}}/>
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
