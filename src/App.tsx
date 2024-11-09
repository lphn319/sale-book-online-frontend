import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/product/ChiTietSanPham";
import DangKyTaiKhoan from "./layouts/user/DangKyTaiKhoan";
import KichHoatTaiKhoan from "./layouts/user/KichHoatTaiKhoan";
import DangNhap from "./layouts/user/DangNhap";
import Test from "./layouts/user/Test";
import Error403 from "./layouts/errors/Error403";
import GioHangPage from "./layouts/cart/GioHangPage";
import { ChiTietGioHangProvider } from "./utils/ChiTietGioHangContext";
import { XacThucProvider } from "./utils/XacThucContext";
import { QuenMatKhau } from "./layouts/user/QuenMatKhau";
import QuanLyNguoiDungPage from "./layouts/admin/QuanLyNguoiDung";
import Dashboard from "./layouts/admin/Dashboard";
import QuanLySachPage from "./layouts/admin/QuanLySach";
import QuanLyDonHangPage from "./layouts/admin/QuanLyDonHang";
import QuanLyTheLoaiPage from "./layouts/admin/QuanLyTheLoai";
import { DatHangThanhCong } from "./layouts/dathang/DatHangThanhCong";
import QuanLiDonHang from "./layouts/user/QuanLiDonHang";
import { ConfirmProvider } from "material-ui-confirm"; // Thêm ConfirmProvider

function App() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

    return (
        <div className="App">
            <XacThucProvider>
                <ConfirmProvider> {/* Thêm ConfirmProvider bao quanh ứng dụng */}
                    <BrowserRouter>
                        <ChiTietGioHangProvider>
                            <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
                            <Routes>
                                <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                                <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
                                <Route path='/dang-ky' element={<DangKyTaiKhoan />} />
                                <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
                                <Route path='/dang-nhap' element={<DangNhap />} />
                                <Route path='/test' element={<Test />} />
                                <Route path='/error-403' element={<Error403 />} />
                                <Route path='/gio-hang' element={<GioHangPage />} />
                                <Route path='/quen-mat-khau' element={<QuenMatKhau />} />
                                <Route path='/quan-li-nguoi-dung' element={<QuanLyNguoiDungPage />} />
                                <Route path='/quan-li-don-hang' element={<QuanLyDonHangPage />} />
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/quan-li-sach' element={<QuanLySachPage />} />
                                <Route path='/quan-li-the-loai' element={<QuanLyTheLoaiPage />} />
                                <Route path='/dat-hang-thanh-cong' element={<DatHangThanhCong />} />
                                {/* Uncomment and update userId once available */}
                                {/*<Route path='/nguoi-dung/quan-li-don-hang' element={<QuanLiDonHang maNguoiDung={userId} />} />*/}
                            </Routes>
                            <Footer />
                        </ChiTietGioHangProvider>
                    </BrowserRouter>
                </ConfirmProvider>
            </XacThucProvider>
        </div>
    );
}

export default App;
