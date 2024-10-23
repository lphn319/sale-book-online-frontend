import SachModel from "./SachModel";

class ChiTietGioHangModel{
    maChiTietGioHang?: any;
    soLuong: number;
    sach: SachModel;
    maNguoiDung?: number;

    constructor(soLuong: number, sach: SachModel) {
        this.soLuong = soLuong;
        this.sach = sach;
    }
}
export default ChiTietGioHangModel;