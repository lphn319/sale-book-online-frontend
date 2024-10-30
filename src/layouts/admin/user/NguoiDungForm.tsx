import NguoiDungModel from "../../../models/NguoiDungModel";
import React, {FormEvent, useEffect, useState} from "react";
import {layTatCaQuyen} from "../../../api/QuyenAPI";
import QuyenModel from "../../../models/QuyenModel";
import {lay1NguoiDung} from "../../../api/NguoiDungAPI";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {CloudUpload} from "react-bootstrap-icons";
import { LoadingButton } from "@mui/lab";

import {
    checkMatKhau,
    kiemTraEmailTonTai,
    kiemTraSoDienThoai,
    kiemTraTenDangNhapTonTai
} from "../../../utils/Validation";
import {getUsernameByToken} from "../../../utils/JwtService";
import {toast} from "react-toastify";

interface NguoiDungFormProps{
    option: string;
    setKeyCountReload?: any;
    id: number;
    handleCloseModal: any;
}


export const NguoiDungForm: React.FC<NguoiDungFormProps> = (props) => {

    const [nguoiDung, setNguoiDung] = useState<NguoiDungModel>({
        maNguoiDung: 0,
        ngaySinh: new Date("2000-01-01"),
        diaChiGiaoHang: "",
        diaChiMuaHang: "",
        email: "",
        hoDem: "",
        ten: "",
        gioiTinh: "M",
        soDienThoai: "",
        tenDangNhap: "",
        matKhau: "",
        avatar: "",
        quyen: 3,
    });

    const [avatar, setAvatar] = useState<File | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string>("");
    const [danhSachQuyen, setDanhSachQuyen] = useState<QuyenModel[]>([]);

    // Khi submit thì btn loading ...
    const [trangThaiBtn, setTrangThaiBtn] = useState(false);

    // Khai báo các biến lỗi
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorSoDienThoai, setErrorSoDienThoai] = useState("");

    useEffect(() => {
        layTatCaQuyen().then((response) => {
            setDanhSachQuyen(response);
        });
    }, []);

    useEffect(() => {
        if (props.option === "cap-nhat") {
            lay1NguoiDung(props.id).then((response) => {
                setNguoiDung({
                    ...response,
                    ngaySinh: new Date(response.ngaySinh),
                });
                // setPreviewAvatar(response.avatar);
            });
        }
    }, [props.id, props.option]);

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (getUsernameByToken() === nguoiDung.tenDangNhap){
            toast.warning("Bạn không thể cập nhật tài khoản bạn đang sử dụng");
            return;
        }

        setTrangThaiBtn(true);

        const endpoint =
            props.option === "them"
                ? "http://localhost:8080/tai-khoan/them-nguoi-dung"
                : "http://localhost:8080/tai-khoan/cap-nhat-nguoi-dung";
        const method = props.option === "them" ? "POST" : "PUT";

        toast.promise(
            fetch(endpoint, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(nguoiDung),
            })
                .then((response) => {
                    if (response.ok) {
                        // Reset user sau khi thêm/sửa thành công
                        setNguoiDung({
                            maNguoiDung: 0,
                            ngaySinh: new Date("2000-01-01"),
                            diaChiGiaoHang: "",
                            diaChiMuaHang: "",
                            email: "",
                            hoDem: "",
                            ten: "",
                            gioiTinh: "M",
                            soDienThoai: "",
                            tenDangNhap: "",
                            matKhau: "",
                            avatar: "",
                            quyen: 3,
                        });
                        setAvatar(null);
                        setPreviewAvatar("");
                        setTrangThaiBtn(false);
                        props.setKeyCountReload(Math.random());
                        props.handleCloseModal();
                        toast.success(props.option === "them" ? "Thêm người dùng thành công" : "Cập nhật người dùng thành công");
                    } else {
                        setTrangThaiBtn(false);
                        toast.error("Gặp lỗi trong quá trình xử lý người dùng");
                    }
                })
                .catch((error) => {
                    setTrangThaiBtn(false);
                    toast.error("Gặp lỗi trong quá trình xử lý người dùng");
                }),
            { pending: "Đang trong quá trình xử lý ..." }
        );
    }


    function handleImageUpload() {

    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateString = e.target.value;
        // Chuyển đổi chuỗi thành đối tượng Date
        const dateObject = new Date(dateString);
        if (!isNaN(dateObject.getTime())) {
            // Nếu là một ngày hợp lệ, cập nhật state
            setNguoiDung({
                ...nguoiDung,
                ngaySinh: dateObject,
            });
        }
    };

    return (
        <div>
            <Typography className='text-center' variant='h4' component='h2'>
                {props.option === "them"
                    ? "TẠO NGƯỜI DÙNG"
                    : props.option === "cap-nhat"
                        ? "SỬA NGƯỜI DÙNG"
                        : "XEM CHI TIẾT"}
            </Typography>
            <hr />
            <div className='container px-5'>
                <form onSubmit={handleSubmit} className='form'>
                    <input type='hidden' value={nguoiDung.maNguoiDung} hidden />
                    <div className='row'>
                        <div className='col-6'>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    required
                                    id='filled-required'
                                    label='Tên tài khoản'
                                    style={{ width: "100%" }}
                                    error={errorTenDangNhap.length > 0 ? true : false}
                                    helperText={errorTenDangNhap}
                                    value={nguoiDung.tenDangNhap}
                                    InputProps={{
                                        disabled:
                                            props.option === "cap-nhat" ? true : false,
                                    }}
                                    onChange={(e: any) => {
                                        setNguoiDung({ ...nguoiDung, tenDangNhap: e.target.value });
                                        setErrorTenDangNhap("");
                                    }}
                                    onBlur={(e: any) => {
                                        kiemTraTenDangNhapTonTai(
                                            setErrorTenDangNhap,
                                            e.target.value
                                        );
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required={props.option === "cap-nhat" ? false : true}
                                    id='filled-required'
                                    type='password'
                                    label='Mật khẩu'
                                    style={{ width: "100%" }}
                                    error={errorMatKhau.length > 0 ? true : false}
                                    helperText={errorMatKhau}
                                    value={nguoiDung.matKhau}
                                    onChange={(e: any) => {
                                        setNguoiDung({ ...nguoiDung, matKhau: e.target.value });
                                        setErrorMatKhau("");
                                    }}
                                    onBlur={(e: any) => {
                                        checkMatKhau(setErrorMatKhau, e.target.value);
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Email'
                                    type='email'
                                    style={{ width: "100%" }}
                                    error={errorEmail.length > 0 ? true : false}
                                    helperText={errorEmail}
                                    value={nguoiDung.email}
                                    InputProps={{
                                        disabled:
                                            props.option === "update" ? true : false,
                                    }}
                                    onChange={(e: any) => {
                                        setNguoiDung({ ...nguoiDung, email: e.target.value });
                                        setErrorEmail("");
                                    }}
                                    onBlur={(e: any) => {
                                        kiemTraEmailTonTai(setErrorEmail, e.target.value);
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Số điện thoại'
                                    style={{ width: "100%" }}
                                    error={errorSoDienThoai.length > 0 ? true : false}
                                    helperText={errorSoDienThoai}
                                    value={nguoiDung.soDienThoai}
                                    onChange={(e: any) => {
                                        setNguoiDung({
                                            ...nguoiDung,
                                            soDienThoai: e.target.value,
                                        });
                                        setErrorSoDienThoai("");
                                    }}
                                    onBlur={(e: any) => {
                                        kiemTraSoDienThoai(
                                            setErrorSoDienThoai,
                                            e.target.value
                                        );
                                    }}
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Ngày sinh'
                                    style={{ width: "100%" }}
                                    type='date'
                                    value={nguoiDung.ngaySinh.toISOString().split("T")[0]}
                                    onChange={handleDateChange}
                                    size='small'
                                />
                            </Box>
                        </div>
                        <div className='col-6'>
                            <Box
                                sx={{
                                    "& .MuiTextField-root": { mb: 3 },
                                }}
                            >
                                <TextField
                                    id='filled-required'
                                    label='Họ đệm'
                                    style={{ width: "100%" }}
                                    value={nguoiDung.hoDem}
                                    onChange={(e: any) =>
                                        setNguoiDung({ ...nguoiDung, hoDem: e.target.value })
                                    }
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Tên'
                                    style={{ width: "100%" }}
                                    value={nguoiDung.ten}
                                    onChange={(e: any) =>
                                        setNguoiDung({ ...nguoiDung, ten: e.target.value })
                                    }
                                    size='small'
                                />

                                <TextField
                                    id='filled-required'
                                    label='Địa chỉ'
                                    style={{ width: "100%" }}
                                    value={nguoiDung.diaChiGiaoHang}
                                    onChange={(e: any) =>
                                        setNguoiDung({
                                            ...nguoiDung,
                                            diaChiGiaoHang: e.target.value,
                                        })
                                    }
                                    size='small'
                                />

                                <FormControl fullWidth size='small' sx={{ mb: 3 }}>
                                    <InputLabel id='demo-simple-select-label'>
                                        Giới tính
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={nguoiDung.gioiTinh}
                                        label='Giới tính'
                                        onChange={(e: any) =>
                                            setNguoiDung({ ...nguoiDung, gioiTinh: e.target.value })
                                        }
                                    >
                                        <MenuItem value={"M"}>Nam</MenuItem>
                                        <MenuItem value={"F"}>Nữ</MenuItem>
                                        <MenuItem value={"O"}>Khác</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth size='small'>
                                    <InputLabel id='demo-simple-select-label'>
                                        Vai trò
                                    </InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={nguoiDung.quyen}
                                        label='Quyền'
                                        onChange={(e: any) =>
                                            setNguoiDung({
                                                ...nguoiDung,
                                                quyen: e.target.value as number,
                                            })
                                        }
                                    >
                                        {danhSachQuyen.map((quyen) => (
                                            <MenuItem
                                                value={quyen.maQuyen}
                                                key={quyen.maQuyen}
                                            >
                                                {quyen.tenQuyen}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload />}
                            >
                                Tải ảnh avatar
                                <input
                                    style={{ opacity: "0", width: "10px" }}
                                    // required
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    alt=''
                                />
                            </Button>
                            <span className='ms-3'>{avatar?.name}</span>
                            <img src={previewAvatar} alt='' width={100} />
                        </div>
                    </div>
                    <LoadingButton
                        className='w-100 my-3'
                        type='submit'
                        loading={trangThaiBtn}
                        variant='outlined'
                        sx={{ width: "25%", padding: "10px" }}
                    >
                        {props.option === "them" ? "Tạo người dùng" : "Lưu người dùng"}
                    </LoadingButton>
                </form>
            </div>
        </div>
    );
}

