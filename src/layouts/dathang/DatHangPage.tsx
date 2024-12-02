import {
    Button,
    FormControl,
    TextField,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import ChiTietGioHangModel from "../../models/ChiTietGioHangModel";
import { useChiTietGioHang } from "../../utils/ChiTietGioHangContext";
import NguoiDungModel from "../../models/NguoiDungModel";
import { lay1NguoiDung } from "../../api/NguoiDungAPI";
import { getIdUserByToken } from "../../utils/JwtService";
import { toast } from "react-toastify";
import { checkMatKhau, kiemTraSoDienThoai } from "../../utils/Validation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../dathang/form.css"

interface ThanhToanPageProps {
    setIsCheckout: any;
    cartList: ChiTietGioHangModel[];
    totalPriceProduct: number;
}

export const DatHangPage: React.FC<ThanhToanPageProps> = (props) => {
    const { setDanhSachGioHang, setTatCaGioHang } = useChiTietGioHang();
    const navigate = useNavigate();

    const [hoTen, setHoTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [diaChiNhanHang, setDiaChiNhanHang] = useState("");
    const [note, setNote] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

    // Lấy dữ liệu của người dùng lên
    const [user, setUser] = useState<NguoiDungModel>();
    useEffect(() => {
        const idUser = getIdUserByToken();
        lay1NguoiDung(idUser)
            .then((response) => {
                setUser(response);
                setHoTen(response.ten + " " + response.hoDem);
                setSoDienThoai(response.soDienThoai);
                setDiaChiNhanHang(response.diaChiGiaoHang);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = localStorage.getItem("token");

        const booksRequest: any[] = props.cartList.map((cartItem) => ({
            sach: cartItem.sach,
            soLuong: cartItem.soLuong,
        }));

        const request = {
            maNguoiDung: getIdUserByToken(),
            maHinhThucThanhToan: 1, // Mặc định là COD
            hoTen: hoTen,
            soDienThoai: soDienThoai,
            email: user?.email,
            diaChiNhanHang: diaChiNhanHang,
            tongTien: props.totalPriceProduct,
            sach: booksRequest,
            note,
        };

        handleSaveOrder(request);
    }

    const handleSaveOrder = (request: any) => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/don-hang/them-don-hang", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(request),
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem("gioHang");
                    setDanhSachGioHang([]);
                    setTatCaGioHang(0);
                    toast.success("Đặt hàng thành công");
                    navigate("/dat-hang-thanh-cong");
                } else {
                    toast.error("Đặt hàng thất bại. Vui lòng thử lại.");
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Thanh toán thất bại");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container bg-light my-3 rounded-3 p-3'>
                <strong className='fs-6'>ĐỊA CHỈ GIAO HÀNG</strong>
                <hr />
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <TextField
                            required
                            fullWidth
                            type='text'
                            label='Họ và tên người nhận'
                            value={hoTen}
                            onChange={(e) => setHoTen(e.target.value)}
                            className='input-field'
                        />
                        <TextField
                            error={!!errorPhoneNumber}
                            helperText={errorPhoneNumber}
                            required
                            fullWidth
                            type='text'
                            label='Số điện thoại'
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                            onBlur={(e) => kiemTraSoDienThoai(setErrorPhoneNumber, e.target.value)}
                            className='input-field'
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <TextField
                            required
                            fullWidth
                            type='text'
                            label='Email'
                            value={user?.email}
                            disabled
                            className='input-field'
                        />
                        <TextField
                            required
                            fullWidth
                            type='text'
                            label='Địa chỉ nhận hàng'
                            value={diaChiNhanHang}
                            onChange={(e) => setDiaChiNhanHang(e.target.value)}
                            className='input-field'
                        />
                    </div>
                </div>
            </div>
            <div className='container bg-light my-3 rounded-3 p-3'>
                <strong className='fs-6'>GHI CHÚ</strong>
                <hr />
                <TextField
                    className='w-100'
                    id='standard-basic'
                    label='Ghi chú'
                    variant='outlined'
                    multiline
                    minRows={3}
                    maxRows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
            <div className='container bg-light my-3 rounded-3 p-3'>
                <strong className='fs-6'>KIỂM TRA LẠI ĐƠN HÀNG</strong>
                <hr />
                {props.cartList.map((cartItem) => (
                    <div key={cartItem.sach?.maSach}>
                        <span>{cartItem.sach?.tenSach}</span> - {cartItem.soLuong} x {cartItem.sach?.giaBan}đ
                    </div>
                ))}
            </div>
            <footer className='fixed-bottom bottom-0 shadow-4-strong bg-light' style={{ height: "175px" }}>
                <div className='container my-3'>
                    <div className='row'>
                        <div className='me-3 col text-end'>Tổng số tiền:</div>
                        <div className='ms-3 col-2 text-end'>{props.totalPriceProduct.toLocaleString("vi-vn")} đ</div>
                    </div>
                    <hr className='mt-3' />
                    <div className='row'>
                        <div className='col d-flex align-items-center'>
                            <span style={{ cursor: "pointer" }} onClick={() => props.setIsCheckout(false)}>
                                <ArrowBackIcon />
                                <strong className='ms-2'>Quay về giỏ hàng</strong>
                            </span>
                        </div>
                        <div className='col-4'>
                            <Button type='submit' variant='contained' sx={{ width: "100%" }}>
                                Xác nhận đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </form>
    );
};

export default DatHangPage;
