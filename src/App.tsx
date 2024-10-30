import React, { useState } from 'react';
import './App.css';
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/product/ChiTietSanPham";
import DangKyTaiKhoan from "./layouts/user/DangKyTaiKhoan";
import KichHoatTaiKhoan from "./layouts/user/KichHoatTaiKhoan";
import DangNhap from "./layouts/user/DangNhap";
import Test from "./layouts/user/Test";
import Error403 from "./layouts/errors/Error403";
import SachForm_Admin from "./layouts/admin/book/SachForm";
import { ChiTietGioHangProvider } from "./utils/ChiTietGioHangContext";
import GioHangPage from "./layouts/cart/GioHangPage";
import { XacThucProvider } from './utils/XacThucContext';
import { QuenMatKhau } from "./layouts/user/QuenMatKhau";
import { NguoiDungForm } from "./layouts/admin/user/NguoiDungForm";
import QuanLyNguoiDung from "./layouts/admin/QuanLyNguoiDung";
import { ConfirmProvider } from "material-ui-confirm";
import QuanLyNguoiDungPage from "./layouts/admin/QuanLyNguoiDung";  // Import ConfirmProvider

function App() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

    return (
        <div className="App">
            <XacThucProvider>
                <ConfirmProvider> {/* Bọc ConfirmProvider quanh các thành phần */}
                    <BrowserRouter>
                        <ChiTietGioHangProvider> {/* Bọc các route với provider */}
                            <div>
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
                                    <Route path='/admin/them-sach' element={<SachForm_Admin />} />
                                    <Route path='/error-403' element={<Error403 />} />
                                    <Route path='/gio-hang' element={<GioHangPage />} />
                                    <Route path='/quen-mat-khau' element={<QuenMatKhau />} />
                                    <Route path='/quan-li-nguoi-dung' element={<QuanLyNguoiDungPage />} />
                                </Routes>
                                <Footer />
                            </div>
                        </ChiTietGioHangProvider>
                    </BrowserRouter>
                </ConfirmProvider>
            </XacThucProvider>
        </div>
    );
}

export default App;
