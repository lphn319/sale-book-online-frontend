import {useEffect, useState} from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import {layToanBoAnhCuaMotSach} from "../../../api/HinhAnhAPI";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface HinhAnhSanPham {
    maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [hinhAnhDangChon, setHinhAnhDangChon] = useState<HinhAnhModel | null>(null);

    const chonAnh = (hinhAnh: HinhAnhModel) => {
        setHinhAnhDangChon(hinhAnh);
    }

    useEffect(() => {
            layToanBoAnhCuaMotSach(maSach).then(
                danhSach => {
                    setDanhSachAnh(danhSach);
                    if (danhSach.length > 0) {
                        setHinhAnhDangChon(danhSach[0]);
                    }
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }, [] // Chi goi mot lan
    )



    // console.log(danhSachAnh.length);

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

    return (
        <div className="row">
            <div className='col-12'>
                <Carousel showArrows={true} showIndicators={true}>
                    {
                        danhSachAnh.map((hinhAnh, index) => (
                            <div key={index}>
                                <img src={hinhAnh.duLieuAnh} alt={hinhAnh.tenHinhAnh} style={{maxWidth:"250px"}}/>
                            </div>
                        ))
                    }
                </Carousel>

            </div>
        </div>
    );
}
export default HinhAnhSanPham;