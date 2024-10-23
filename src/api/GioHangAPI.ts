import ChiTietGioHangModel from "../models/ChiTietGioHangModel";
import {getIdUserByToken} from "../utils/JwtService";
import {request} from "./Request";
import {laySachBangMaGioHang} from "./SachAPI";

export async function getCartAllByIdUser(): Promise<ChiTietGioHangModel[]> {
    const maNguoiDung = getIdUserByToken();
    const endpoint = `http://localhost:8080/nguoi-dung${maNguoiDung}/danhSachChiTietGioHang`;
    try {
        const cartResponse = await request(endpoint);

        if (cartResponse) {
            const cartsResponseList: ChiTietGioHangModel[] = await Promise.all(cartResponse._embedded.cartItems.map(async (item: any) => {
                const bookResponse = await laySachBangMaGioHang(item.maGioHang);
                return { ...item, book: bookResponse };
            }));
            return cartsResponseList;
        }
    } catch (error) {
        console.error('Error: ', error);
    }
    return [];
}