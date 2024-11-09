import TheLoaiModel from "./TheLoaiModel";

class SachModel {
    id?:any;
    maSach: number;
    tenSach?: string; // có thể bị NULL
    giaBan?: number;
    giaNiemYet?: number;
    moTa?:string;
    soLuong?: number;
    tenTacGia?:string;
    isbn?: string;
    trungBinhXepHang?:number;
    danhSachMaTheLoai?: number[];
    danhSachTheLoai?: TheLoaiModel[];
    relatedImg?: string[];
    thumbnail?: string

    constructor(
        maSach: number,
        tenSach?: string, // có thể bị NULL
        giaBan?: number,
        giaNiemYet?: number,
        moTa?:string,
        soLuong?: number,
        tenTacGia?:string,
        isbn?: string,
        trungBinhXepHang?:number,
        thumbnail?: string

    ){
        this.maSach= maSach;
        this.tenSach= tenSach;
        this.giaBan= giaBan;
        this.giaNiemYet= giaNiemYet;
        this.moTa= moTa;
        this.soLuong= soLuong;
        this.tenTacGia= tenTacGia;
        this.isbn = isbn;
        this.trungBinhXepHang= trungBinhXepHang;
        this.thumbnail = thumbnail;
    }
}
export default SachModel;