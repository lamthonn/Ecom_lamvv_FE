import React, { useState } from 'react';
import { Table, Button, Modal, Typography, Timeline, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import './index.scss';
import TableCustom from '../../components/table/table-custom';
import { GetAllDonHangByUser } from '../../services/DonHangServices';
import dayjs from "dayjs";

const { Title, Text } = Typography;

// Ánh xạ trạng thái đơn hàng (dựa trên trang_thai)
const statusMap: any = {
  1: 'Đã đặt hàng',
  2: 'Đang xử lý',
  3: 'Đang giao',
  4: 'Đã giao',
};

// Dữ liệu mẫu (có thể thay thế bằng dữ liệu từ API)
const ordersData = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    ma_don_hang: 'DH001',
    ngay_mua: '2025-04-01T10:00:00Z',
    tong_tien: 1500000,
    thanh_tien: 1500000,
    trang_thai: 4, // Đã giao
    so_dien_thoai: '0123456789',
    dia_chi: '123 Đường Láng, Đống Đa, Hà Nội',
    chi_tiet_don_hang: [
      {
        id: '223e4567-e89b-12d3-a456-426614174001',
        san_pham: { ten_san_pham: 'Máy xay sinh tố' },
        so_luong: 1,
        don_gia: 1200000,
        thanh_tien: 1200000,
      },
      {
        id: '323e4567-e89b-12d3-a456-426614174002',
        san_pham: { ten_san_pham: 'Bộ nồi inox' },
        so_luong: 1,
        don_gia: 300000,
        thanh_tien: 300000,
      },
    ],
    timeline: [
      { status: 'Đã đặt hàng', date: '2025-04-01 10:00' },
      { status: 'Đang xử lý', date: '2025-04-01 12:00' },
      { status: 'Đang giao', date: '2025-04-02 09:00' },
      { status: 'Đã giao', date: '2025-04-03 15:00' },
    ],
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174003',
    ma_don_hang: 'DH002',
    ngay_mua: '2025-04-02T14:00:00Z',
    tong_tien: 800000,
    thanh_tien: 800000,
    trang_thai: 2, // Đang xử lý
    so_dien_thoai: '0987654321',
    dia_chi: '456 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    chi_tiet_don_hang: [
      {
        id: '423e4567-e89b-12d3-a456-426614174004',
        san_pham: { ten_san_pham: 'Đèn bàn LED' },
        so_luong: 1,
        don_gia: 800000,
        thanh_tien: 800000,
      },
    ],
    timeline: [
      { status: 'Đã đặt hàng', date: '2025-04-02 14:00' },
      { status: 'Đang xử lý', date: '2025-04-02 16:00' },
    ],
  },
];
const handleCancelOrder = (id: string) => {
  // Implement the logic to cancel the order
  // message.success('Đơn hàng đã được hủy');
  // setIsModalVisible(false);
  // setSelectedOrder(null);
};

const OrderTrackingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'ma_don_hang',
      key: 'ma_don_hang',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'ngay_mua',
      key: 'ngay_mua',
      render: (ngay_mua: any) => new Date(ngay_mua).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'tong_tien',
      key: 'tong_tien',
      render: (tong_tien: any) => `${tong_tien.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (trang_thai: any) => (
        <Tag color={trang_thai === 4 ? 'green' : 'orange'}>
          {statusMap[trang_thai] || 'Không xác định'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: "chiTietDonHangs",
      render: (_: any, record: any) => {
        console.log(record)
        return (
          <>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            >
              Xem chi tiết
            </Button>
            {record.trang_thai == 1 && <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleCancelOrder(record.id)}
            >
              Hủy đơn hàng
            </Button>}
          </>
      )}
    },
  ];

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  // const getData = async () => {
  //   //setLoading(true);
  //   await GetAllDonHangByUser()
  //     .then((response) => {
  //       setAccountData(response.data);
  //     })
  //     .catch((error) => {
  //       message.error('Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.');
  //       console.error(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const generateTimeline = (currentStatus: number) => {
    const timelineItems = [];
    
    for (let statusCode = 1; statusCode <= currentStatus; statusCode++) {
      timelineItems.push(
        <Timeline.Item key={statusCode}>
          <Text strong>{statusMap[statusCode]}</Text>
          <br />
          {/* Assuming you want the current date/time for each step */}
          <Text>{statusCode == currentStatus ? dayjs().format('DD/MM/YYYY HH:mm') : ""}</Text>
        </Timeline.Item>
      );
    }
  
    return timelineItems;
  };

  return (
    <section className="order-tracking-page">
      <Title level={2}>Theo dõi đơn hàng</Title>
      <TableCustom
        columns={columns}
        rowKey="id"
        get_list_url='/api/don-hang/get-don-hang-by-user'   
        isEditOne={false}
        isDeleteOne={false}
        isViewDetail={false}
      />

      {/* Modal chi tiết đơn hàng */}
      <Modal
        title={`Chi tiết đơn hàng ${selectedOrder?.ma_don_hang}`}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            {/* Thông tin đơn hàng */}
            <Text strong>Mã đơn hàng: </Text>
            <Text>{selectedOrder.ma_don_hang}</Text>
            <br />
            <Text strong>Ngày đặt: </Text>
            <Text>{dayjs(selectedOrder.ngay_mua).format('DD/MM/YYYY HH:mm')}</Text>
            <br />
            <Text strong>Tổng tiền: </Text>
            <Text>{selectedOrder.tong_tien} VNĐ</Text>
            <br />
            <Text strong>Thành tiền: </Text>
            <Text>{selectedOrder.thanh_tien} VNĐ</Text>
            <br />
            <Text strong>Số điện thoại: </Text>
            <Text>{selectedOrder.so_dien_thoai}</Text>
            <br />
            <Text strong>Địa chỉ: </Text>
            <Text>{selectedOrder.dia_chi}</Text>
            <br />
            <Text strong>Trạng thái: </Text>
            <Tag color={selectedOrder.trang_thai === 4 ? 'green' : 'orange'}>
              {statusMap[selectedOrder.trang_thai] || 'Không xác định'}
            </Tag>

            {/* Danh sách sản phẩm */}
            <Title level={4} style={{ marginTop: 20 }}>
              Sản phẩm
            </Title>
            <Table
              columns={[
                {
                  title: 'Tên sản phẩm',
                  dataIndex: 'ten_san_pham',
                  key: 'ten_san_pham',
                },
                { title: 'Số lượng', dataIndex: 'so_luong', key: 'so_luong' },
                {
                  title: 'Đơn giá',
                  dataIndex: 'don_gia',
                  key: 'don_gia',
                  render: (don_gia) => `${don_gia} VNĐ`,
                },
                {
                  title: 'Thành tiền',
                  dataIndex: 'thanh_tien',
                  key: 'thanh_tien',
                  render: (thanh_tien) => `${thanh_tien} VNĐ`,
                },
              ]}
              dataSource={selectedOrder.chiTietDonHangs}
              pagination={false}
              style={{ marginBottom: 20 }}
              rowKey="id"
            />

            {/* Timeline trạng thái giao hàng */}
            <Title level={4}>Trạng thái giao hàng</Title>
            <Timeline>
              {generateTimeline(selectedOrder.trang_thai)}
            </Timeline>

            {selectedOrder.trang_thai === 1 && (
              <Button
                type="dashed"
                onClick={() => handleCancelOrder(selectedOrder.id)}
                style={{ marginTop: 20 }}
              >
                Hủy đơn hàng
              </Button>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default OrderTrackingPage;