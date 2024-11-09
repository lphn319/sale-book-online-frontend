import DonHangModel from "../models/DonHangModel";
import { request } from "./Request";
import ChiTietGioHangModel from "../models/ChiTietGioHangModel";

export async function layToanBoDonHang(): Promise<DonHangModel[]> {
    try {
        const endpoint: string = `http://localhost:8080/don-hang?sort=maDonHang,desc&size=1000`;
        const response = await request(endpoint);

        const datas = await Promise.all(response._embedded.donHangs.map(async (data: any) => {
            let hinhThucThanhToan = "COD"; // Mặc định là COD
            try {
                const responseThanhToan = await request(`http://localhost:8080/don-hang/${data.maDonHang}/hinhThucThanhToan`);
                hinhThucThanhToan = responseThanhToan.tenHinhThucThanhToan;
            } catch (error) {
                console.warn(`Không lấy được hình thức thanh toán cho đơn hàng ${data.maDonHang}. Mặc định là COD.`);
            }

            return {
                maDonHang: data.maDonHang,
                diaChiNhanHang: data.diaChiNhanHang,
                tongTien: data.tongTien,
                tongTienSanPham: data.tongTienSanPham,
                chiPhiGiaoHang: data.chiPhiGiaoHang,
                chiPhiThanhToan: data.chiPhiThanhToan,
                ngayTao: data.ngayTao,
                trangThai: data.trangThai,
                nguoiDung: data._embedded.nguoiDung,
                hoTen: data.hoTen,
                soDienThoai: data.soDienThoai,
                hinhThucThanhToan: hinhThucThanhToan // Thêm thuộc tính `hinhThucThanhToan`
            };
        }));

        return datas;
    } catch (error) {
        console.error("Error while fetching orders:", error);
        throw error;
    }
}

export async function layToanBoDonHangTheoMaNguoiDung(maNguoiDung: number): Promise<DonHangModel[]> {
    try {
        const endpoint = `http://localhost:8080/nguoi-dung/${maNguoiDung}/danhSachDonHang?sort=maDonHang,desc`;
        const response = await request(endpoint);

        const datas = await Promise.all(response._embedded.donHangs.map(async (data: any) => {
            let hinhThucThanhToan = "COD"; // Mặc định là COD
            try {
                const responseThanhToan = await request(`http://localhost:8080/don-hang/${data.maDonHang}/hinhThucThanhToan`);
                hinhThucThanhToan = responseThanhToan.tenHinhThucThanhToan;
            } catch (error) {
                console.warn(`Không lấy được hình thức thanh toán cho đơn hàng ${data.maDonHang}. Mặc định là COD.`);
            }

            return {
                maDonHang: data.maDonHang,
                diaChiNhanHang: data.diaChiNhanHang,
                tongTien: data.tongTien,
                tongTienSanPham: data.tongTienSanPham,
                chiPhiGiaoHang: data.chiPhiGiaoHang,
                chiPhiThanhToan: data.chiPhiThanhToan,
                ngayTao: data.ngayTao,
                trangThai: data.trangThai,
                nguoiDung: data._embedded.nguoiDung,
                hoTen: data.hoTen,
                soDienThoai: data.soDienThoai,
                hinhThucThanhToan: hinhThucThanhToan // Thêm thuộc tính `hinhThucThanhToan`
            };
        }));

        return datas;
    } catch (error) {
        console.error("Error while fetching orders for user:", error);
        throw error;
    }
}

export async function lay1DonHang(maDonHang: number): Promise<DonHangModel> {
    try {
        const endpoint = `http://localhost:8080/don-hang/${maDonHang}`;
        const response = await request(endpoint);

        const responseChiTietDonHang = await request(`http://localhost:8080/don-hang/${response.maDonHang}/danhSachChiTietDonHang`);

        let hinhThucThanhToan = "COD"; // Mặc định là COD
        try {
            const responseThanhToan = await request(`http://localhost:8080/don-hang/${response.maDonHang}/hinhThucThanhToan`);
            hinhThucThanhToan = responseThanhToan.tenHinhThucThanhToan;
        } catch (error) {
            console.warn(`Không lấy được hình thức thanh toán cho đơn hàng ${response.maDonHang}. Mặc định là COD.`);
        }

        const chiTietGioHang: ChiTietGioHangModel[] = await Promise.all(responseChiTietDonHang._embedded.chiTietDonHangs.map(async (chiTietDonHang: any) => {
            const responseSach = await request(`http://localhost:8080/chi-tiet-don-hang/${chiTietDonHang.maChiTietDonHang}/sach`);
            return { sach: responseSach, soLuong: chiTietDonHang.soLuong };
        }));

        const donHang: DonHangModel = {
            maDonHang: response.maDonHang,
            diaChiNhanHang: response.diaChiNhanHang,
            tongTien: response.tongTien,
            tongTienSanPham: response.tongTienSanPham,
            chiPhiGiaoHang: response.chiPhiGiaoHang,
            chiPhiThanhToan: response.chiPhiThanhToan,
            ngayTao: response.ngayTao,
            trangThai: response.trangThai,
            nguoiDung: response._embedded.nguoiDung,
            hoTen: response.hoTen,
            soDienThoai: response.soDienThoai,
            hinhThucThanhToan: hinhThucThanhToan,
            chiTietGioHang: chiTietGioHang // Thêm chi tiết giỏ hàng vào đối tượng đơn hàng
        };

        return donHang;
    } catch (error) {
        console.error(`Error while fetching order ${maDonHang}:`, error);
        throw error;
    }
}
