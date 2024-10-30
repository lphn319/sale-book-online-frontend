import NguoiDungModel from "./NguoiDungModel";

class QuyenModel {
    maQuyen: number;
    tenQuyen: string;
    danhSachNguoiDung: NguoiDungModel[]; // Danh sách người dùng thuộc quyền này

    constructor(maQuyen: number, tenQuyen: string, danhSachNguoiDung: NguoiDungModel[] = []) {
        this.maQuyen = maQuyen;
        this.tenQuyen = tenQuyen;
        this.danhSachNguoiDung = danhSachNguoiDung;
    }
}

export default QuyenModel;
