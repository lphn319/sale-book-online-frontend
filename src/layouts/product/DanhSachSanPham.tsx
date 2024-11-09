import { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import SachProps from "./components/SachProps";
import { PhanTrang } from "../../utils/PhanTrang";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai: number;
}

function DanhSachSanPham({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    useEffect(() => {
        const layDanhSachSach = async () => {
            setDangTaiDuLieu(true);
            try {
                if (tuKhoaTimKiem === '' && maTheLoai === 0) {
                    const kq = await layToanBoSach(20, trangHienTai - 1);
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                } else {
                    const kq = await timKiemSach(tuKhoaTimKiem, maTheLoai);
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                }
                setDangTaiDuLieu(false);
            } catch (error: any) {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        };

        layDanhSachSach();
    }, [trangHienTai, tuKhoaTimKiem, maTheLoai]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu...</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
                <button onClick={() => window.location.reload()}>Thử lại</button>
            </div>
        );
    }

    if (danhSachQuyenSach.length === 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    console.log(danhSachQuyenSach);
    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {danhSachQuyenSach.map((sach, index) => (
                    <SachProps key={sach.maSach ? sach.maSach : index} sach={sach} />
                ))}
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    );
}

export default DanhSachSanPham;
