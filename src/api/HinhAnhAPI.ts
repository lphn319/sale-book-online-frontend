import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import {request} from "./Request";

export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[] = [];

    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

    // Gọi phương thức request
    const response = await request(duongDan);

    // Lấy ra json sach
    const responseData = response._embedded.hinhAnhs;
    // console.log(responseData);

    for (const key in responseData) {
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            laIcon: responseData[key].laIcon,
            duongDan: responseData[key].duongDan,
            duLieuAnh: responseData[key].duLieuAnh,
        });
    }

    return ketQua;
}