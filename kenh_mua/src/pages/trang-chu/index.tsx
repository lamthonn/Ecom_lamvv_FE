import React, { useEffect, useState } from "react";
import { Layout, Menu, Carousel, Card, Row, Col, Button, Spin } from "antd";
import { BASE_URL } from "../../config/configApi";
import { GetAllDanhMucSanPham, GetAllSanPham } from "../../services/SanPham";

const { Content } = Layout;
const { Meta } = Card;

const TrangChu: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    
    const getSanPham = async (pageNumber: number, danhMucId: string) => {
        setLoading(true);
        try {
            const res = await GetAllSanPham(pageNumber, 10, danhMucId);
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
        <>
            <Content style={{ padding: "20px", background: "#f5f5f5" }}>
                <Carousel autoplay>
                    <div><img src="/images/logo2.png" alt="Banner 1" style={{ width: "100%", height: "300px" }} /></div>
                    <div><img src="/images/logo2.png" alt="Banner 2" style={{ width: "100%", height: "300px" }} /></div>
                </Carousel>

                <h2 style={{ marginTop: "20px" }}>Danh mục sản phẩm</h2>
                <Row gutter={[16, 16]}>
                    {categories.map(category => (
                        <Col span={6} key={category.id}>
                            <Button block onClick={() => handleCategoryClick(category.id)} type={selectedCategory === category.id ? "primary" : "default"}>
                                {category.ten_danh_muc}
                            </Button>
                        </Col>
                    ))}
                </Row>

                <h2 style={{ marginTop: "20px" }}>Sản phẩm nổi bật</h2>
                {loading && page === 1 ? <Spin size="large" style={{ display: "block", margin: "20px auto" }} /> : (
                    <>
                        <Row gutter={[16, 16]}>
                            {products.map(product => (
                                <Col span={6} key={product.id}>
                                    <Card 
                                        cover={<img alt={product.ten_san_pham} src={`${BASE_URL}/san_pham/${product.image}`} />}
                                        actions={[<Button type="primary">Mua ngay</Button>]}
                                    >
                                        <Meta title={product.ten_san_pham} description={`Giá: ${product.gia}đ`} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <Button type="primary" onClick={handleLoadMore} loading={loading}>Xem thêm</Button>
                        </div>
                    </>
                )}
            </Content>
        </>
    );
}
export default TrangChu;
