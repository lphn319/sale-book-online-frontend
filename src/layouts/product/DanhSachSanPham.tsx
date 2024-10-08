import {useEffect, useState} from "react";
import SachModel from "../../models/SachModel";
import {lay3SachMoiNhat, layToanBoSach, timKiemSach} from "../../api/SachAPI";
import SachProps from "./components/SachProps";
import {PhanTrang} from "../../utils/PhanTrang";

interface DanhSachSanPhamProps{
    tuKhoaTimKiem: string;
    maTheLoai: number;
}

function DanhSachSanPham({tuKhoaTimKiem, maTheLoai}: DanhSachSanPhamProps){

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);

    useEffect(() => {
        if (tuKhoaTimKiem==='' && maTheLoai == 0){
            layToanBoSach(trangHienTai-1).then(
                kq =>{
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang)
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        } else {
            timKiemSach(tuKhoaTimKiem, maTheLoai).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
        }, [trangHienTai, tuKhoaTimKiem, maTheLoai] // Chi goi mot lan
    )
    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

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
    if(danhSachQuyenSach.length===0){
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach) => (
                            <SachProps key={sach.maSach} sach={sach} />
                        )
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );
}

export default DanhSachSanPham;