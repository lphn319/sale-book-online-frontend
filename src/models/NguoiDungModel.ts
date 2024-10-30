class NguoiDungModel{
    ma?: any;
    maNguoiDung: number;
    hoDem: string;
    ten: string;
    ngaySinh: Date;
    tenDangNhap: string;
    matKhau?: string;
    gioiTinh: string;
    email: string;
    soDienThoai: string;
    diaChiMuaHang: string;
    diaChiGiaoHang: string;
    avatar?: string;
    quyen?: number;

    constructor(maNguoiDung: number, hoDem: string, ten: string, tenDangNhap: string,
                matKhau: string, gioiTinh: string, email: string, soDienThoai: string,
                ngaySinh: Date,
                diaChiMuaHang: string, diaChiGiaoHang: string, avatar: string) {
        this.maNguoiDung = maNguoiDung;
        this.hoDem = hoDem;
        this.ten = ten;
        this.ngaySinh = ngaySinh;
        this.tenDangNhap = tenDangNhap;
        this.matKhau = matKhau;
        this.gioiTinh = gioiTinh;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.diaChiGiaoHang = diaChiGiaoHang;
        this.diaChiMuaHang = diaChiMuaHang;
        this.avatar = avatar;
    }
}
export default NguoiDungModel;