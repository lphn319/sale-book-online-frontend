import {isTokenExpired} from "../utils/JwtService";

export async function request(endpoint: string) {
    // Truy cấn đến đường dẫn
    const response = await fetch(endpoint);

    // Nếu bị trả về lỗi
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${endpoint}`);
    }

    // Nếu trả về OK
    return response.json();
}
export async function requestAdmin(endpoint: string) {
    const token = localStorage.getItem("token");

    // Kiểm tra token tồn tại và còn hiệu lực
    if (!token) {
        console.warn("Không tìm thấy token trong localStorage.");
        return null;
    }

    if (isTokenExpired(token)) {
        console.warn("Token đã hết hạn.");
        return null;
    }

    try {
        // Thực hiện yêu cầu API
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Kiểm tra phản hồi có thành công hay không
        if (!response.ok) {
            console.error(`Không thể truy cập ${endpoint} - Mã lỗi: ${response.status}`);
            return null;
        }

        // Trả về dữ liệu JSON nếu yêu cầu thành công
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
    }
}
