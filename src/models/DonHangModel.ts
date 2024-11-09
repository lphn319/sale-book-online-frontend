import NguoiDungModel from "./NguoiDungModel";
import ChiTietGioHangModel from "./ChiTietGioHangModel";

class DonHangModel {
    id?: number; // Thuộc tính không bắt buộc
    maDonHang: number;
    ngayTao: Date;
    diaChiMuaHang?: string;
    diaChiNhanHang: string;
    tongTienSanPham: number;
    chiPhiGiaoHang: number;
    chiPhiThanhToan: number;
    tongTien: number;
    trangThai: string; // Trạng thái của đơn hàng
    nguoiDung?: NguoiDungModel;
    hoTen?: string;
    soDienThoai?: string;
    ghiChu?: string;
    thanhToan?: string;
    danhSachChiTietGioHang?: ChiTietGioHangModel[];
    hinhThucThanhToan?: string; // Thêm thuộc tính hinhThucThanhToan
    chiTietGioHang?: ChiTietGioHangModel[]; // Thêm thuộc tính chiTietGioHang

    constructor(
        maDonHang: number,
        ngayTao: Date,
        diaChiNhanHang: string,
        tongTienSanPham: number,
        chiPhiGiaoHang: number,
        chiPhiThanhToan: number,
        tongTien: number,
        trangThai: string,
        nguoiDung: NguoiDungModel,
        hinhThucThanhToan: string = "COD", // Đặt giá trị mặc định cho hinhThucThanhToan
        chiTietGioHang: ChiTietGioHangModel[] = [], // Đặt giá trị mặc định cho chiTietGioHang
        hoTen: string,
    ) {
        this.maDonHang = maDonHang;
        this.ngayTao = ngayTao;
        this.diaChiNhanHang = diaChiNhanHang;
        this.tongTien = tongTien;
        this.tongTienSanPham = tongTienSanPham;
        this.chiPhiGiaoHang = chiPhiGiaoHang;
        this.chiPhiThanhToan = chiPhiThanhToan;
        this.trangThai = trangThai;
        this.nguoiDung = nguoiDung;
        this.hinhThucThanhToan = hinhThucThanhToan;
        this.chiTietGioHang = chiTietGioHang;
        this.hoTen = hoTen;
    }
}

export default DonHangModel;
