export const kiemTraEmailTonTai = async (setErrorEmail: any, email: string)=> {
    const endpoint = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;
    // Call api
    try {
        const response = await fetch(endpoint);
        const data = await response.text();
        if (data === "true") {
            setErrorEmail("Email đã tồn tại!");
            return true;
        }
        return false;
    } catch (error) {
        console.log("Lỗi api khi gọi hàm kiểm tra email");
    }
};

// Hàm check username xem tồn tại chưa
export const kiemTraTenDangNhapTonTai = async (setErrorTenDangNhap: any, tenDangNhap: string) => {
    if (tenDangNhap.trim() === "") {
        return false;
    }
    if (tenDangNhap.trim().length < 8) {
        setErrorTenDangNhap("Tên đăng nhập phải chứa ít nhất 8 ký tự");
        return true;
    }
    const endpoint = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;
    // Call api
    try {
        const response = await fetch(endpoint);
        const data = await response.text();

        if (data === "true") {
            setErrorTenDangNhap("Ten dang nhap đã tồn tại!");
            return true;
        }
        return false;
    } catch (error) {
        console.log("Lỗi api khi gọi hàm kiểm tra ten dang nhap");
    }
};

// Hàm check mật khẩu có đúng định dạng không
export const checkMatKhau = (setErrorMatKhau: any, matKhau: string) => {
    const matKhauRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (matKhau === "") {
        return false;
    } else if (!matKhauRegex.test(matKhau)) {
        setErrorMatKhau(
            "Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ và số."
        );
        return true;
    } else {
        setErrorMatKhau("");
        return false;
    }
};

// Hàm check mật khẩu nhập lại
export const kiemTraMatKhauNhapLai = (setErrorMatKhauNhapLai: any, matKhauNhapLai: string, matKhau: string) => {
    if (matKhauNhapLai !== matKhau) {
        setErrorMatKhauNhapLai("Mật khẩu không khớp.");
        return true;
    } else {
        setErrorMatKhauNhapLai("");
        return false;
    }
};

// Hàm check số điện thoại có đúng định dạng không
export const kiemTraSoDienThoai = (setErrorSoDienThoai: any, soDienThoai: string) => {
    const soDienThoaiRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
    if (soDienThoai.trim() === "") {
        return false;
    } else if (!soDienThoaiRegex.test(soDienThoai.trim())) {
        setErrorSoDienThoai("Số điện thoại không đúng.");
        return true;
    } else {
        setErrorSoDienThoai("");
        return false;
    }
};