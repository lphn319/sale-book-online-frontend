class NguoiDungModel{
    ma?: any;
    maNguoiDung: number;
    hoDem: string;
    ten: string;
    tenDangNhap: string;
    matKhau?: string;
    gioiTinh: string;
    email: string;
    soDienThoai: string;
    diaChiMuaHang: string;
    diaChiGiaoHang: string;
    quyen?: number;

    constructor(maNguoiDung: number, hoDem: string, ten: string, tenDangNhap: string, matKhau: string, gioiTinh: string,
                email: string, soDienThoai: string, diaChiMuaHang: string, diaChiGiaoHang: string) {
        this.maNguoiDung = maNguoiDung;
        this.hoDem = hoDem;
        this.ten = ten;
        this.tenDangNhap = tenDangNhap;
        this.matKhau = matKhau;
        this.gioiTinh = gioiTinh;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.diaChiGiaoHang = diaChiGiaoHang;
        this.diaChiMuaHang = diaChiMuaHang;
    }
}
export default NguoiDungModel;