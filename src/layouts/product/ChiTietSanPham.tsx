import React, {useEffect, useState} from "react";
import SachModel from "../../models/SachModel";
import {useParams} from "react-router-dom";
import { toast } from "react-toastify";
import {laySachTheoMaSach} from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../../utils/XepHangSao";
import dinhDangSo from "../../utils/DinhDangSo";
import TheLoaiModel from "../../models/TheLoaiModel";
import {layTheLoaiBangMaSach} from "../../api/TheLoaiAPI";
import {useChiTietGioHang} from "../../utils/ChiTietGioHangContext";
import {getIdUserByToken, isToken} from "../../utils/JwtService";


const ChiTietSanPham: React.FC = () => {
    const {setTatCaGioHang, danhSachGioHang} = useChiTietGioHang();

    // Lấy mã sách từ URL
    const { maSach } = useParams();

    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        if (Number.isNaN(maSachNumber))
            maSachNumber = 0;
    } catch (error) {
        maSachNumber = 0;
        console.error("Error", error);
    }

    // Khai báo
    const [sach, setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);

    const tangSoLuong = () => {
        const  soLuongTonKho = (sach&&sach.soLuong?sach.soLuong:0);
        if (soLuong < soLuongTonKho){
            setSoLuong(soLuong+1);
        }
    }
    const giamSoLuong = () => {
        if (soLuong > 1){
            setSoLuong(soLuong-1);
        }
    }
    const handleSoLuongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const soLuongMoi = parseInt(e.target.value);
        const soLuongTonKho = (sach&&sach.soLuong?sach.soLuong:0);
        if (!isNaN(soLuongMoi) && soLuongMoi > 0 && soLuongMoi <= soLuongTonKho){
            setSoLuong(soLuongMoi);
        }
    }

    //Xu ly mua ngay
    const handleMuaNgay = () => {}

    // Xử lý thêm sản phẩm vào giỏ hàng
    const handleThemVaoGioHang = async (sachMoi: SachModel) => {
        console.log("Sản phẩm đang thêm vào giỏ hàng: ", sachMoi);

        let isExistBook = danhSachGioHang.find(
            (cartItem) => Number(cartItem.sach.maSach) === Number(sachMoi.maSach)
        );

        console.log("Sản phẩm đã có trong giỏ hàng: ", isExistBook);

        if (isExistBook) {
            isExistBook.soLuong += soLuong;

            if (isToken()) {
                const request = {
                    maGioHang: isExistBook.maChiTietGioHang,
                    soLuong: isExistBook.soLuong,
                };
                const token = localStorage.getItem("token");

                // Log token lấy từ localStorage
                console.log("Token lấy từ localStorage: ", token);

                try {
                    const response = await fetch("http://localhost:8080/chi-tiet-gio-hang/cap-nhat-san-pham", {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(request),
                    });

                    if (!response.ok) {
                        console.error("Cập nhật số lượng thất bại", await response.text());
                        toast.error("Cập nhật sản phẩm trong giỏ hàng thất bại.");
                    }
                } catch (err) {
                    console.error("Cập nhật số lượng thất bại", err);
                    toast.error("Lỗi hệ thống khi cập nhật giỏ hàng.");
                }
            }
        } else {
            const newCartItem = {
                soLuong: soLuong,
                sach: sachMoi,
                maGioHang: 0,
            };

            const maNguoiDung = getIdUserByToken();
            console.log("Mã người dùng lấy từ token: ", maNguoiDung);

            if (isToken()) {
                try {
                    const request = [{
                        soLuong: soLuong,
                        sach: sachMoi,
                        maNguoiDung: maNguoiDung, // Sử dụng biến đã lưu
                    }];

                    // Log để kiểm tra payload trước khi gửi
                    console.log("Payload request gửi lên API: ", request);

                    const token = localStorage.getItem("token");

                    // Log token kiểm tra trước khi gửi request
                    console.log("Token trước khi gửi request: ", token);

                    const response = await fetch("http://localhost:8080/chi-tiet-gio-hang/them-san-pham", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(request),
                    });

                    if (response.ok) {
                        const maGioHang = await response.json();
                        if (maGioHang) {
                            newCartItem.maGioHang = maGioHang;
                            danhSachGioHang.push(newCartItem);
                        } else {
                            console.error("Không nhận được mã giỏ hàng từ server.");
                            toast.error("Thêm sản phẩm vào giỏ hàng thất bại.");
                        }
                    } else {
                        console.error("Thêm sản phẩm vào DB thất bại", await response.text());
                        toast.error("Thêm sản phẩm vào giỏ hàng thất bại.");
                    }
                } catch (error) {
                    console.log("Thêm sản phẩm vào DB thất bại", error);
                    toast.error("Lỗi hệ thống khi thêm vào giỏ hàng.");
                }
            } else {
                danhSachGioHang.push(newCartItem);
            }
        }

        localStorage.setItem("gioHang", JSON.stringify(danhSachGioHang));
        console.log("Giỏ hàng sau khi lưu vào localStorage: ", danhSachGioHang);

        toast.success("Thêm vào giỏ hàng thành công");
        setTatCaGioHang(danhSachGioHang.length);
    };



    const handleThemVaoDanhSachYeuThich = () => {}

    useEffect(() => {
            laySachTheoMaSach(maSachNumber)
                .then((sach) => {
                        setSach(sach);
                        setDangTaiDuLieu(false);
                    }
                )
                .catch((error) => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                })
        }, [maSach]
    )

    //Lay ra the loai cua sach
    const [theLoai, setTheLoai] = useState<TheLoaiModel[] | null>(null);
    useEffect(() => {
        layTheLoaiBangMaSach(maSachNumber)
            .then((response) => {
                setTheLoai(response.danhSachTheLoai);
            });
    }, [maSachNumber]);

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-md-4"> {/* Đảm bảo chia đúng kích thước cột */}
                    <HinhAnhSanPham maSach={maSachNumber}/>
                </div>

                <div className="col-md-8" style={{ textAlign: 'left' }}>
                    <div className="row">
                        <div className="col-md-8"> {/* Điều chỉnh các giá trị cột nếu cần */}
                            <h1>{sach.tenSach}</h1>
                            <h4>{renderRating(sach.trungBinhXepHang?sach.trungBinhXepHang:0)}</h4>
                            <h4>{dinhDangSo(sach.giaBan)} VND</h4>

                            {/* Hiển thị danh sách thể loại */}
                            <div className="mt-3">
                                <strong>Thể loại:</strong>
                                {theLoai?.length ? (
                                    <ul>
                                        {theLoai.map((item, index) => (
                                            <li key={item.maTheLoai || index}>
                                                {item.tenTheLoai}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Không có thể loại nào cho cuốn sách này.</p>
                                )}
                            </div>

                            <hr/>
                            <div dangerouslySetInnerHTML={{__html: (sach.moTa+'')}}/>
                            <hr/>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-2">Số lượng</div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary me-2" onClick={giamSoLuong}>-</button>
                                <input
                                    className="form-control text-center"
                                    type="number"
                                    min={1}
                                    value={soLuong}
                                    onChange={handleSoLuongChange}
                                />
                                <button className="btn btn-outline-secondary ms-2" onClick={tangSoLuong}>+</button>
                            </div>

                            <div>
                                {
                                    sach.giaBan && (
                                        <div className="mt-2 text-center">
                                            Tạm tính: <br/>
                                            <h4>{dinhDangSo(soLuong * sach.giaBan)} VND</h4>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-danger mt-3"
                                        onClick={handleMuaNgay}
                                        style={{width: '100%'}}>Mua ngay</button>
                                <button type="button" className="btn btn-outline-secondary mt-2"
                                        onClick={() => handleThemVaoGioHang(sach)}
                                        style={{width: '100%'}}>Thêm vào giỏ hàng</button>
                                <button type="button" className="btn btn-outline-secondary mt-2"
                                        onClick={handleThemVaoDanhSachYeuThich}
                                        style={{width: '100%'}}>Thêm vào danh sách yêu thích</button>
                            </div>

                            {/*<div>*/}
                            {/*    <Carousel/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <DanhGiaSanPham maSach={maSachNumber}/>
            </div>
        </div>
    );

}
export default ChiTietSanPham;