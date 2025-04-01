import React, { useEffect, useState } from "react";
import { Layout, Menu, Carousel, Card, Row, Col, Button, Spin, Typography } from "antd";
import { BASE_URL } from "../../config/configApi";
import { GetAllDanhMucSanPham, GetAllSanPham } from "../../services/SanPham";
import "./index.scss"
const { Content } = Layout;
const { Meta } = Card;
const { Title, Paragraph } = Typography;

const TrangChu: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [totalProducts, setTotalProducts] = useState(0);
    
    const getSanPham = async (pageNumber: number, danhMucId: string) => {
        setLoading(true);
        try {
            const res = await GetAllSanPham(pageNumber, 10, danhMucId);
            setTotalProducts(res.data.total);
            if (pageNumber === 1) {
                setProducts(res.data.items);
            } else {
                setProducts(prev => [...prev, ...res.data.items]);
            }
        } catch (err) {
            console.error("Lỗi khi lấy sản phẩm", err);
        }
        setLoading(false);
    };

    const getDanhMucSanPham = async () => {
        try {
            const res = await GetAllDanhMucSanPham(1, 10);
            setCategories(res.data.items);
        } catch (err) {
            console.error("Lỗi khi lấy danh mục sản phẩm", err);
        }
    };

    useEffect(() => {
        getDanhMucSanPham();
        getSanPham(1, "");
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        getSanPham(nextPage, selectedCategory);
    };

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setPage(1);
        getSanPham(1, categoryId);
    };

    return (
        <Content style={{ padding: "20px", background: "#f0f2f5" }}>
            {/* Banner */}
            <Carousel autoplay>
                <div><img src="/images/logo2.png" alt="Banner 1" style={{ width: "100%", height: "500px" }} /></div>
                <div><img src="/images/logo2.png" alt="Banner 2" style={{ width: "100%", height: "500px" }} /></div>
            </Carousel>

            {/* Giới thiệu website */}
            <div style={{ textAlign: "center", margin: "40px 0" }}>
                <Title level={2}>Chào mừng đến với cửa hàng của chúng tôi</Title>
                <Paragraph style={{ fontSize: "16px", color: "#555" }}>
                    Chúng tôi mang đến cho bạn những sản phẩm chất lượng, giá cả hợp lý và dịch vụ tận tâm nhất. Hãy trải nghiệm mua sắm tuyệt vời ngay hôm nay!
                </Paragraph>
            </div>
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                    <h1>TUYỂN CHÍNH GỐC ĐỘ, THAO TÁC LINH HOẠT</h1>
                    <p>
                        Thay vì những chiến dịch để kiếm tìm hoạt, giới đảm bảo bạn tính tuyển chính về chuyên cao, gốc nghề, xoay, lát màn hình, vụ tà tò không gian, vụ tà hỗ trợ nguồn dùng nghề/dùng làm việc/gia trị dùng tư thế.
                    </p>
                    </div>
                    <div className="hero-image">
                    {/* Thay thế bằng hình ảnh thực tế */}
                    <div className="placeholder-image">Hình ảnh minh họa</div>
                    </div>
                </div>
                <div className="info-block">
                    <h2>GIẢI ĐỒ MÀN HÌNH ĐƠN</h2>
                    <p>
                    Thiết bị mạnh để và dịch vụ chính vị trí của 1 màn hình, giúp tạo sự thoải mái, chuyên nghiệp và thẩm mỹ cho không gian. Arm màn hình đơn HyperWork có giá cực KHỬ từ 8,000,000 – 2,000,000.
                    </p>
                    <button className="details-button">Xem chi tiết</button>
                </div>
                </section>
            {/* Danh mục sản phẩm */}
            <h2>Danh mục sản phẩm</h2>
            <Row gutter={[16, 16]}>
                {categories.map(category => (
                    <Col span={6} key={category.id}>
                        <Button 
                            block 
                            onClick={() => handleCategoryClick(category.id)} 
                            type={selectedCategory === category.id ? "primary" : "default"}
                            style={{ transition: "0.3s", fontWeight: "bold" }}
                        >
                            {category.ten_danh_muc}
                        </Button>
                    </Col>
                ))}
            </Row>

            {/* Sản phẩm nổi bật */}
            <h2 style={{ marginTop: "20px" }}>Sản phẩm nổi bật</h2>
            {loading && page === 1 ? <Spin size="large" style={{ display: "block", margin: "20px auto" }} /> : (
                <>
                    <Row gutter={[16, 16]}>
                        {products.map(product => (
                            <Col span={6} key={product.id}>
                                <Card 
                                    cover={<img alt={product.ten_san_pham} src={`${BASE_URL}/${product.duongDanAnh}`} style={{ transition: "0.3s", cursor: "pointer" }} />}
                                    hoverable
                                    actions={[<Button type="primary">Mua ngay</Button>]}
                                >
                                    <Meta title={product.ten_san_pham} description={`Giá: ${product.gia}đ`} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {/* Ẩn nút nếu số sản phẩm hiện tại không chia hết cho 10 */}
                    {products.length % 10 === 0 && products.length < totalProducts && (
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <Button type="primary" onClick={handleLoadMore} loading={loading}>Xem thêm</Button>
                        </div>
                    )}
                </>
            )}

            
        </Content>
    );
}
export default TrangChu;