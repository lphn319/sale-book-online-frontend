import React from "react";
import SachModel from "../models/SachModel";
import {request} from "./Request";

export async function layToanBoSach(): Promise<SachModel[]> {
    const ketQua: SachModel[] = [];

    // Xác định endpoint
    const endpoint: string = 'http://localhost:8080/sach';

    // Gọi phương thức request
    const response = await request(endpoint);

    // Lấy ra json sach
    const responseData = response._embedded.saches;
    console.log(responseData);

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

    return ketQua;
}