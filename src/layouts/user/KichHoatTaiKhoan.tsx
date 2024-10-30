/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import {useXacThuc} from "../../utils/XacThucContext";
 // Tích hợp AuthContext nếu có

const KichHoatTaiKhoan: React.FC = () => {
    const { email, maKichHoat } = useParams(); // Lấy thông tin email và mã kích hoạt từ URL
    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState("");
    const [isLoading, setLoading] = useState(true); // Trạng thái đang tải
    const { isLoggedIn } = useXacThuc(); // Kiểm tra trạng thái đăng nhập
    const navigate = useNavigate();

    // Điều hướng người dùng đã đăng nhập về trang chủ
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    // Gọi hàm kích hoạt tài khoản khi có email và mã kích hoạt
    useEffect(() => {
        if (email && maKichHoat) {
            thucHienKichHoat();
        }
    }, [email, maKichHoat]);

    const thucHienKichHoat = async () => {
        try {
            const url = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`;
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                setDaKichHoat(true); // Kích hoạt thành công
            } else {
                const errorText = await response.text(); // Lấy nội dung lỗi
                setThongBao(errorText);
            }
        } catch (error) {
            setThongBao("Đã xảy ra lỗi, vui lòng thử lại sau.");
        } finally {
            setLoading(false); // Dừng trạng thái đang tải sau khi xử lý xong
        }
    };

    // Hiển thị khi đang tải
    if (isLoading) {
        return (
            <div>
                <div className="container bg-light my-3 rounded-3 p-4">
                    <h1 className="text-center text-black">KÍCH HOẠT TÀI KHOẢN</h1>
                    <div className="d-flex align-items-center justify-content-center flex-column p-5">
                        <p>Đang xử lý yêu cầu...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Hiển thị khi kích hoạt xong
    return (
        <div>
            <div className="container bg-light my-3 rounded-3 p-4">
                <h1 className="text-center text-black">KÍCH HOẠT TÀI KHOẢN</h1>
                <div className="d-flex align-items-center justify-content-center flex-column p-5">
                    {daKichHoat ? (
                        <>
                            <img
                                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/order_status/ico_successV2.svg?q=10311"
                                alt="success"
                            />
                            <h2 className="my-3 text-success">
                                Tài khoản của bạn đã được kích hoạt thành công!
                            </h2>
                            <Link to="/dang-nhap">
                                <Button variant="contained" className="my-3">
                                    Đăng nhập để tiếp tục
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <img
                                src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png"
                                alt="fail"
                                width={150}
                            />
                            <h2 className="my-3 text-danger">
                                Kích hoạt tài khoản thất bại: {thongBao}
                            </h2>
                            <Link to="/">
                                <Button variant="contained" className="my-3">
                                    Quay lại trang chủ
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KichHoatTaiKhoan;
