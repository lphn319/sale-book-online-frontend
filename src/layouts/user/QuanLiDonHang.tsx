import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button, Chip, Typography, Box, CircularProgress } from "@mui/material";
import DonHangModel from "../../models/DonHangModel";
import { layToanBoDonHangTheoMaNguoiDung } from "../../api/DonHangApi";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate

interface QuanLyDonHangPageProps {
    maNguoiDung: number ;
}

const QuanLyDonHangPage: React.FC<QuanLyDonHangPageProps> = ({ maNguoiDung }) => {
    const [orders, setOrders] = useState<DonHangModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Thêm state cho lỗi
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        if (!maNguoiDung) {
            setError("Không tìm thấy mã người dùng.");
            setLoading(false);
            return;
        }
        async function fetchOrders() {
            setLoading(true);
            try {
                const fetchedOrders = await layToanBoDonHangTheoMaNguoiDung(maNguoiDung);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Lỗi khi tải danh sách đơn hàng:", error);
                setError("Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [maNguoiDung]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Danh sách đơn hàng của bạn
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="body1">Bạn chưa có đơn hàng nào.</Typography>
            ) : (
                <Box>
                    {orders.map((order) => (
                        <Box key={order.maDonHang} sx={{ borderBottom: "1px solid #ccc", padding: 2 }}>
                            <Typography variant="h6">Mã đơn hàng: {order.maDonHang}</Typography>
                            <Typography>
                                Ngày tạo: {format(new Date(order.ngayTao), "dd/MM/yyyy")}
                            </Typography>
                            <Typography>
                                Tổng tiền: {order.tongTien.toLocaleString("vi-VN")} đ
                            </Typography>
                            <Typography>Phương thức thanh toán: {order.hinhThucThanhToan}</Typography>
                            <Chip
                                label={order.trangThai}
                                color={
                                    order.trangThai === "Thành công"
                                        ? "success"
                                        : order.trangThai === "Đang xử lý"
                                            ? "info"
                                            : order.trangThai === "Đang giao hàng"
                                                ? "warning"
                                                : "error"
                                }
                                sx={{ marginTop: 1 }}
                            />
                            <Box sx={{ marginTop: 2 }}>
                                <Button variant="outlined" onClick={() => navigate(`/orders/${order.maDonHang}`)}>
                                    Xem chi tiết
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default QuanLyDonHangPage;
