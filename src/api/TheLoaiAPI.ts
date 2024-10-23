import TheLoaiModel from "../models/TheLoaiModel";
import { request } from "./Request";

interface ketQuaInterface {
    danhSachTheLoai: TheLoaiModel[];
    theLoai: TheLoaiModel;
}

async function layTheLoai(endpoint: string): Promise<ketQuaInterface> {
    // Goi phuong thuc request
    const response = await request(endpoint);

    // Lay ra danh sach the loai
    const danhSachTheLoai: TheLoaiModel[] = response._embedded.theLoais.map((theLoaiData: any) => ({
        ...theLoaiData,
    }));

    // Tra ve ket qua
    return {
        danhSachTheLoai: danhSachTheLoai,
        theLoai: response.theLoai
    };
}

export async function layToanBoTheLoai(): Promise<ketQuaInterface> {
    const endpoint = "http://localhost:8080/the-loai?sort=maTheLoai";  // Giả định URL API lấy toàn bộ thể loại
    return layTheLoai(endpoint);
}

export async function lay1TheLoai(maTheLoai: number): Promise<ketQuaInterface> {
    const endpoint = `http://localhost:8080/the-loai/${maTheLoai}`;
    const response = await request(endpoint);

    return {
        theLoai: response,
        danhSachTheLoai: response
    };
}

export async function layTheLoaiBangMaSach(maSach: number): Promise<ketQuaInterface> {
    const endpoint = `http://localhost:8080/sach/${maSach}/danhSachTheLoai`;

    return layTheLoai(endpoint);
}