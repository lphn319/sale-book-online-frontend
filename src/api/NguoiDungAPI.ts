import NguoiDungModel from "../models/NguoiDungModel";
import {request, requestAdmin} from "./Request";
import {layQuyenBangMaNguoiDung} from "./QuyenAPI";

async function layNguoiDung(endpoint: string): Promise<NguoiDungModel>{
    //Goi phuong thuc request
    const response = await request(endpoint);

    if (!response) {
        console.warn("Không tìm thấy dữ liệu người dùng từ endpoint:", endpoint);
    }

    return response;
}

export async function layTatCaNguoiDungCoQuyen(): Promise<NguoiDungModel[]>{
    const endpoint: string = "http://localhost:8080/quyen";
    const response = await requestAdmin(endpoint);

    console.log("Phản hồi từ API:", response);

    if (!response || !response._embedded || !response._embedded.quyens) {
        console.warn("Không tìm thấy dữ liệu quyền hoặc _embedded trong phản hồi.");
        return [];
    }

    try {
        const data = response._embedded.quyens.map((quyenData: any) => {
            //Duyet qua mang tung nguoi dung trong moi vai tro
            const danhSachNguoiDung = quyenData._embedded.danhSachNguoiDung.map((nguoiDungData: any) => {
                //Xu li cac truong du lieu cho nguoiDungData
                const nguoiDung: NguoiDungModel = {
                    maNguoiDung: nguoiDungData.maNguoiDung,
                    ten: nguoiDungData.ten,
                    hoDem: nguoiDungData.hoDem,
                    ngaySinh: nguoiDungData.ngaySinh,
                    tenDangNhap: nguoiDungData.tenDangNhap,
                    email: nguoiDungData.email,
                    quyen: quyenData.maQuyen,
                    avatar: nguoiDungData.avatar,
                    soDienThoai: nguoiDungData.soDienThoai,
                    diaChiGiaoHang: nguoiDungData.diaChiGiaoHang,
                    diaChiMuaHang: nguoiDungData.diaChiMuaHang,
                    gioiTinh: nguoiDungData.gioiTinh,
                };
                return nguoiDung;
            });
            return danhSachNguoiDung;
        });
        return data;
    } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu người dùng:", error);
        return [];
    }

}

export async function lay1NguoiDung(maNguoiDung: any): Promise<NguoiDungModel>{
    const endpoint = `http://localhost:8080/nguoi-dung/${maNguoiDung}`;
    const responseNguoiDung = await request(endpoint);
    const responseQuyen = await layQuyenBangMaNguoiDung(maNguoiDung);

    const nguoiDung: NguoiDungModel = {
        maNguoiDung: responseNguoiDung.maNguoiDung,
        ten: responseNguoiDung.ten,
        hoDem: responseNguoiDung.hoDem,
        ngaySinh: responseNguoiDung.ngaySinh,
        tenDangNhap: responseNguoiDung.tenDangNhap,
        email: responseNguoiDung.email,
        quyen: responseQuyen.maQuyen,
        avatar: responseNguoiDung.avatar,
        soDienThoai: responseNguoiDung.soDienThoai,
        diaChiGiaoHang: responseNguoiDung.diaChiGiaoHang,
        diaChiMuaHang: responseNguoiDung.diaChiMuaHang,
        gioiTinh: responseNguoiDung.gioiTinh,
    };
    return nguoiDung;
}

export async function layNguoiDungBangMaDanhGia(maDanhGia: number): Promise<NguoiDungModel>{
    const endpoint: string = `http://localhost:8080/su-danh-gia/${maDanhGia}/nguoiDung`;
    return layNguoiDung(endpoint);
}