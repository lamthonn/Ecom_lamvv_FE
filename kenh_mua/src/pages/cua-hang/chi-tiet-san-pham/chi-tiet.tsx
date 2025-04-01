import {
  Button,
  Carousel,
  Collapse,
  Image,
  InputNumber,
  Radio,
  Rate,
  Splitter,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { axiosConfig, BASE_URL } from "../../../config/configApi";
import { useParams } from "react-router-dom";
import "./chi-tiet.scss";
import ShowToast from "../../../components/show-toast/ShowToast";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { InputNumberProps } from "antd/lib";
import ButtonCustom from "../../../components/button/button";
import FormInputNumber from "../../../components/form-input-number/FormInputNumber";
const ChiTietSanPham: React.FC = () => {
  const { ma } = useParams<{ ma: string }>();
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [images, setImages] = useState<string[]>([]);
  const [rate, setRate] = useState<number>(0);

  //thông tin mua
  const [soLuong, setSoLuong] = useState<number>(1)
  useEffect(() => {
    GetById();
  }, []);

  const GetById = async () => {
    await axiosConfig
      .get(`api/DanhSachSanPham/get-by-ma/${ma}`)
      .then((res: any) => {
        console.log(res.data);
        setDataDetail(res.data);
        setRate(res.data.rate);
        setImages([
          res.data[0].duong_dan_anh_bia,
          ...res.data[0].ds_anh_san_pham,
        ]);
      })
      .catch((err: any) => {
        ShowToast("error", "Thông báo", "Lấy dữ liệu thất bại", 3);
      });
  };

  const onChange: InputNumberProps["onChange"] = (value: any) => {
    setSoLuong(value)
  };
  return (
    <div className="chi-tiet-san-pham">
      <Splitter
        className="Splitter-ct"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          minHeight: "75vh",
        }}
      >
        <Splitter.Panel
          size={40}
          resizable={false}
          className="Splitter-ct-left"
        >
          <Carousel
            autoplay
            autoplaySpeed={5000}
            dots={false}
            arrows
            infinite={false}
            style={{ height: "580px", overflow: "hidden" }}
          >
            {images.map((item: any) => (
              <div
                key={item}
                style={{
                  overflow: "hidden",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    border: "1px solid rgb(214, 214, 214)",
                  }}
                  src={`${BASE_URL}/${item || "default-image.jpg"}`}
                />
              </div>
            ))}
          </Carousel>
        </Splitter.Panel>
        <Splitter.Panel size={60} className="Splitter-ct-right">
          <div className="thong-tin-san-pham">
            {/* Tên sản phẩm */}
            <Typography.Text className="ten-san-pham">
              {dataDetail.length > 0
                ? dataDetail[0].ten_san_pham
                : "Chưa có dữ liệu"}
            </Typography.Text>

            {/* tên danh mục */}
            <Typography.Text className="ten-danh-muc">
              {dataDetail.length > 0
                ? dataDetail[0].ten_danh_muc
                : "Chưa có dữ liệu"}
            </Typography.Text>

            {/* Đánh giá */}
            <div style={{ display: "flex", gap: 8 }}>
              <Rate
                disabled
                defaultValue={rate}
                allowHalf
                tooltips={["Tệ", "Tạm ổn", "Ôn", "Tốt", "Xuất sắc"]}
              />
              <Typography.Text>
                {dataDetail.length > 0
                  ? dataDetail[0].luot_ban
                    ? dataDetail[0].luot_ban
                    : 0
                  : 0}{" "}
                lượt bán{" "}
              </Typography.Text>
            </div>

            {/* Giá sản phẩm */}
            <div>
              {dataDetail.length > 0 ? (
                dataDetail[0].khuyen_mai ? (
                  <Typography.Text
                    delete
                    className="gia-san-pham gia-khuyen-mai"
                  >
                    {dataDetail[0].gia.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography.Text>
                ) : (
                  <Typography.Text className="gia-san-pham">
                    {dataDetail[0].gia.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography.Text>
                )
              ) : (
                "Không có dữ liệu"
              )}{" "}
              <span></span>
              <Typography.Text className="gia-san-pham">
                {dataDetail.length > 0
                  ? dataDetail[0].khuyen_mai
                    ? dataDetail[0].khuyen_mai.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : ""
                  : ""}
              </Typography.Text>
            </div>

            {/* Biến thể */}
            <div style={{ width: "50%" }}>
              {dataDetail.length > 0
                ? dataDetail[0].ls_phan_loai.length > 0
                  ? dataDetail[0].ls_phan_loai.map((item: any) => {
                      return (
                        <div>
                          <Typography.Text>
                            {item.ten_phan_loai === "mau-sac"
                              ? "Màu sắc"
                              : "Kích Thước"}
                          </Typography.Text>
                          <Radio.Group
                            block
                            options={item.phan_loai.map((x: any) => {
                              return {
                                value: x,
                                label: x,
                              };
                            })}
                            defaultValue="Apple"
                            optionType="button"
                            buttonStyle="solid"
                          />
                        </div>
                      );
                    })
                  : ""
                : ""}
            </div>

            <Typography.Text>Số lượng:</Typography.Text>
            <div style={{ display: "flex", gap: 8, width: "50%" }}>
              {/* Số lượng */}
              <FormInputNumber min={1} max={50} onChange={onChange} value={soLuong}/>
              <Button
                key={"1"}
                style={{
                  height: "34px",
                  backgroundColor: "var(--color-primary-5)",
                }}
                variant="solid"
                type="primary"
              >
                MUA NGAY
              </Button>
            </div>
            {/* button */}
            <Button key={"2"} style={{ height: "34px", width: "50%" }}>
              THÊM VÀO GIỎ HÀNG
            </Button>

            {/* Các phương thức thanh toán */}
            <div style={{ display: "flex", gap: 8, alignItems:"center" }}>
              <Image width={"20%"} src="/images/stripe.png" />
              <Image width={"20%"} src="/images/ZaloPay_Logo.png" />
              <Image width={"20%"} src="/images/COD.jpg" />
            </div>
          </div>
        </Splitter.Panel>
      </Splitter>

      {/* mô tả */}
      <Collapse
        items={[
          {
            key: "1",
            showArrow: false,
            label: "Mô tả sản phẩm",
            children: (
              <div>
                {dataDetail.length > 0
                  ? dataDetail[0].mo_ta
                  : "Chưa có dữ liệu"}
              </div>
            ),
          },
        ]}
        defaultActiveKey={["1"]}
      />

      {/* đánh giá */}
      <Collapse
        items={[
          {
            key: "1",
            showArrow: false,
            label: "Đánh giá",
            children: (
              <div>
                {dataDetail.length > 0
                  ? dataDetail[0].mo_ta
                  : "Chưa có dữ liệu"}
              </div>
            ),
          },
        ]}
        defaultActiveKey={["1"]}
        style={{ marginTop: "16px" }}
      />
    </div>
  );
};

export default ChiTietSanPham;
