class DanhGiaModel {
    maDanhGia: number;
    diemXepHang: number;
    nhanXet: string;
    maSach: number;
    maNguoiDung: number;

    constructor(
        maDanhGia: number,
        diemXepHang: number,
        nhanXet: string,
        maSach: number,
        maNguoiDung: number
    ) {
        this.maDanhGia = maDanhGia;
        this.diemXepHang = diemXepHang;
        this.nhanXet = nhanXet;
        this.maSach = maSach;
        this.maNguoiDung = maNguoiDung
    }
}
export default DanhGiaModel;