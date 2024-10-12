import React, {useEffect, useState} from "react";
import SachModel from "../../models/SachModel";
import {useParams} from "react-router-dom";
import {laySachTheoMaSach} from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../../utils/XepHangSao";
import dinhDangSo from "../../utils/DinhDangSo";



const ChiTietSanPham: React.FC = () => {
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
    const handleMuaNgay = () => {}
    const handleThemVaoGioHang = () => {}
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
                                        onClick={handleThemVaoGioHang}
                                        style={{width: '100%'}}>Thêm vào giỏ hàng</button>
                                <button type="button" className="btn btn-outline-secondary mt-2"
                                        onClick={handleThemVaoDanhSachYeuThich}
                                        style={{width: '100%'}}>Thêm vào danh sách yêu thích</button>
                            </div>

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