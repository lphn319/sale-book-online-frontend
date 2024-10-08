import React from "react";
import SachModel from "../models/SachModel";
import {request} from "./Request";
import sachModel from "../models/SachModel";

interface KetQuaInterface{
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

async function laySach(endpoint: string): Promise<KetQuaInterface>{
    const ketQua: sachModel[] = [];

    // Gọi phương thức request
    const response = await request(endpoint);

    // Lấy ra json sach
    const responseData = response._embedded.saches;
    console.log(responseData);

    //Lay thong tin trang
    const tongSoTrang:number = response.page.totalPages;
    const tongSoSach:number = response.page.totalElements;

    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa:responseData[key].moTa,
            soLuong:responseData[key].soLuong,
            tenTacGia:responseData[key].tenTacGia,
            trungBinhXepHang:responseData[key].trungBinhXepHang
        });
    }
    return {ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang};
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];

    // Xác định endpoint
    const endpoint: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;

    return laySach(endpoint);
}

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {

    // Xác định endpoint
    const endpoint: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';

    return laySach(endpoint);

}
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {
    let endpoint: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;
    if (tuKhoaTimKiem !== '' && maTheLoai==0) {
        endpoint = `http://localhost:8080/sach/search/findByTenSachContaining?tenSach=${tuKhoaTimKiem}`;
    } else if (tuKhoaTimKiem ==='' && maTheLoai > 0) {
        endpoint = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}`
    } else if (tuKhoaTimKiem !== '' && maTheLoai > 0) {
        endpoint = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`
    }

    return laySach(endpoint);
}