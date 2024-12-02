import { jwtDecode } from "jwt-decode";
import {JwtPayload} from "../layouts/admin/RequireAdmin";

export function isTokenExpired(token: string) {
    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) {
        // Token không có thời gian hết hạn (exp)
        return false;
    }

    const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

    return currentTime > decodedToken.exp;
}

export function isToken() {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}


export function getAvatarByToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token) as JwtPayload;
        return decodedToken.avatar;
    }
}

export function getLastNameByToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token) as JwtPayload;
        return decodedToken.lastName;
    }
}

export function getUsernameByToken() {
    const token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token).sub;
    }
}

export function getIdUserByToken() {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {  // Thêm kiểm tra hết hạn
        try {
            const decodedToken = jwtDecode(token) as JwtPayload;
            console.log("Decoded token: ", decodedToken); // In ra toàn bộ payload của token
            return decodedToken.id || null;
        } catch (error) {
            console.error("Lỗi khi giải mã token:", error);
            return null;
        }
    }
    return null;
}


export function getRoleByToken(): "user" | "admin" | null {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decodedToken = jwtDecode(token) as JwtPayload & {
                isUser?: boolean;
                isAdmin?: boolean;
            };

            if (decodedToken.isAdmin) return "admin";
            if (decodedToken.isUser) return "user";
        } catch (error) {
            console.error("Lỗi giải mã token:", error);
        }
    }
    return null; // Trả về null nếu không tìm thấy role
}

export function logout(navigate: any) {
    navigate("/dang-nhap");
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
}