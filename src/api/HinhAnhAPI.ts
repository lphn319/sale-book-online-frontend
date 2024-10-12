import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import {request} from "./Request";

async function layAnhCuaMotSach(endpoint: string): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[] = [];

    // Gọi phương thức request
    const response = await request(endpoint);

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


export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {
    // Xác định endpoint
    const endpoint: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

    return layAnhCuaMotSach(endpoint);
}


export async function lay1AnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {
    // Xác định endpoint
    const endpoint: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;

    return layAnhCuaMotSach(endpoint);
}