import QuyenModel from "../models/QuyenModel";
import {request, requestAdmin} from "./Request";

export async function layTatCaQuyen(): Promise<QuyenModel[]> {
    const endpoint = "http://localhost:8080/quyen";
    const response = await requestAdmin(endpoint);

    const danhSachQuyen: QuyenModel[] = response._embedded.quyens.map((quyen: any) => ({
        ...quyen,
    }));

    return danhSachQuyen;
}
export async function layQuyenBangMaNguoiDung(maNguoiDung: any): Promise<QuyenModel>{
    const endpoint = `http://localhost:8080/nguoi-dung/${maNguoiDung}/danhSachQuyen`;

    const response = await request(endpoint);

    const danhSachQuyen: QuyenModel[] = response._embedded.quyens.map((quyen: any)=> ({
        ...quyen,
    }));
    return danhSachQuyen[0];
}
