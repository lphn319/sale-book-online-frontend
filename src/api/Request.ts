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