import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isToken } from "../../../utils/JwtService";
import { useChiTietGioHang } from "../../../utils/ChiTietGioHangContext";
import ThanhToanPage from "../../checkout/ThanhToanPage";

interface DanhSachGioHangProps {}

const GioHang: React.FC<DanhSachGioHangProps> = () => {
    const { setTatCaGioHang, danhSachGioHang, setDanhSachGioHang } = useChiTietGioHang();
    const [tongTienSanPham, setTongTienSanPham] = useState(0);
    const [isCheckout, setIsCheckout] = useState(false);

    const navigation = useNavigate();

    // Tính tổng tiền của tất cả các sản phẩm
    useEffect(() => {
        const tong = danhSachGioHang.reduce((tongTien, chiTietGioHang) => {
            return tongTien + chiTietGioHang.soLuong * (chiTietGioHang.sach?.giaBan || 0);
        }, 0);
        setTongTienSanPham(tong);
        setTatCaGioHang(danhSachGioHang.length); // Update the total cart count
    }, [danhSachGioHang, setTatCaGioHang]);

    // Xử lý xoá sản phẩm
    const handleXoaSanPham = (maSach: number) => {
        const danhSachMoi = danhSachGioHang.filter((chiTietGioHang) => chiTietGioHang.sach.maSach !== maSach);
        localStorage.setItem("gioHang", JSON.stringify(danhSachMoi));
        setDanhSachGioHang(danhSachMoi);
        setTatCaGioHang(danhSachMoi.length);
        toast.success("Xoá sản phẩm thành công");
    };

    // Kiểm tra nếu giỏ hàng trống
    if (danhSachGioHang.length === 0) {
        return (
            <div className="d-flex align-items-center justify-content-center flex-column position-relative">
                <img
                    src="https://newnet.vn/themes/newnet/assets/img/empty-cart.png"
                    alt="Giỏ hàng trống"
                    width="63%"
                />
                <Link to="/search" className="position-absolute" style={{ bottom: "100px" }}>
                    <Button variant="contained">Mua sắm ngay</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {!isCheckout ? (
                <div style={{ overflow: "hidden" }}>
                    <div className="row my-4 pb-5 px-5">
                        {/* Bên trái - Danh sách sản phẩm */}
                        <h2 className="mt-2 px-3 py-3 mb-0">
                            GIỎ HÀNG <span>({danhSachGioHang.length} sản phẩm)</span>
                        </h2>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="container-book bg-light">
                                <div className="row px-4 py-3">
                                    <div className="col">Sản phẩm</div>
                                    <div className="col-3 text-center">Số lượng</div>
                                    <div className="col-2 text-center">Số tiền</div>
                                    <div className="col-2 text-center">Thao tác</div>
                                </div>
                            </div>
                            <div className="container-book bg-light mt-3 px-3">
                                <div className="row px-4 py-3">
                                    {danhSachGioHang.map((chiTietGioHang) => (
                                        <div className="row" key={chiTietGioHang.sach?.maSach}>
                                            <div className="col">{chiTietGioHang.sach?.tenSach || 'Ten khong xac dinh'}</div>
                                            <div className="col-3 text-center">{chiTietGioHang.soLuong}</div>
                                            <div className="col-2 text-center">
                                                {(chiTietGioHang.soLuong * (chiTietGioHang.sach?.giaBan || 0)).toLocaleString()} đ
                                            </div>
                                            <div className="col-2 text-center">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleXoaSanPham(chiTietGioHang.sach.maSach)}
                                                >
                                                    Xoá
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bên phải - Tổng tiền và thanh toán */}
                        <div className="container-book bg-light col-lg col-md-12 col-sm-12 px-5 pb-4 mt-lg-0 mt-md-3 mt-sm-3" style={{ height: "fit-content" }}>
                            <div className="d-flex align-items-center justify-content-between mt-3">
                                <span>Thành tiền:</span>
                                <span>
                                    <strong>{tongTienSanPham.toLocaleString()} đ</strong>
                                </span>
                            </div>
                            <hr className="my-2" />
                            <div className="d-flex align-items-center justify-content-between">
                                <span>
                                    <strong>Tổng số tiền (gồm VAT):</strong>
                                </span>
                                <span className="text-danger fs-5">
                                    <strong>{tongTienSanPham.toLocaleString()} đ</strong>
                                </span>
                            </div>

                            <Button
                                variant="contained"
                                sx={{ width: "100%", marginTop: "30px" }}
                                onClick={() => {
                                    if (isToken()) {
                                        setIsCheckout(true);
                                    } else {
                                        toast.warning("Bạn cần đăng nhập để thực hiện chức năng này");
                                        navigation("/dang-nhap");
                                    }
                                }}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <ThanhToanPage />
            )}
        </>
    );
};

export default GioHang;