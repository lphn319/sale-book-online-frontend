class QuyenModel {
    maNguoiDung?: number;
    maQuyen: number;
    tenQuyen: string;

    constructor(maQuyen: number, tenQuyen: string) {
        this.maQuyen = maQuyen;
        this.tenQuyen = tenQuyen;
    }
}
export default QuyenModel;