import React, {useState} from "react";

function DangKyTaiKhoan(){
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDem] = useState("");
    const [ten, setTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('');
    const [avatar, setAvatar] = useState<File|null>(null);

    // Các biến báo lỗi
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
    const [errorHoDem, setErrorHoDem] = useState("");
    const [errorTen, setErrorTen] = useState("");
    const [errorSoDienThoai, setErrorSoDienThoai] = useState("");
    const [thongBao, setThongBao] = useState("");

    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    //Dang ki tai khoan
    const handleSubmit = async (e: React.FormEvent) => {
        // Clear any previous error messages
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');

        // Tránh click liên tục
        e.preventDefault();

        // Kiểm tra các điều kiện và gán kết quả vào biến
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailDaTonTai(email);
        const isMatKhauValid = !kiemTraMatKhau(matKhau);
        const isMatKhauLapLaiValid = !kiemTraMatKhauLapLai(matKhauLapLai);
        const isHoDemValid = hoDem.trim() !== '';
        const isTenValid = ten.trim() !== '';

        // Kiểm tra tất cả các điều kiện
        if (isTenDangNhapValid && isEmailValid && isMatKhauValid
                    && isMatKhauLapLaiValid && isTenValid && isHoDemValid) {

            const base64Avatar = avatar ? await getBase64(avatar) : null;
            console.log("avatar: " + base64Avatar);

            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';

                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json',
                        },
                        body: JSON.stringify({
                            tenDangNhap: tenDangNhap,
                            email: email,
                            matKhau: matKhau,
                            hoDem: hoDem,
                            ten: ten,
                            soDienThoai: soDienThoai,
                            gioiTinh: gioiTinh,
                            daKichHoat: 0,
                            maKichHoat: "",
                            avatar: base64Avatar
                        })
                    }
                );

                if (response.ok) {
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                } else {
                    const errorData = await response.json(); // Nhận phản hồi chi tiết từ máy chủ
                    console.log("Lỗi từ máy chủ:", errorData);
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                console.error("Lỗi khi gửi yêu cầu:", error);
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        } else {
            setThongBao("Vui lòng nhập thông tin hợp lệ để hoàn tất việc đăng kí tài khoản!!!")
        }
    }
    //Kiem tra ten dang nhap
    const handleTenDangNhapChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(e.target.value);
        //Kiem tra
        setErrorTenDangNhap("");
        return kiemTraTenDangNhapDaTonTai(e.target.value);
    }
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string)=> {
        //end-point
        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;
        console.log(url);
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data==="true"){
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi không kiểm tra được tên đăng nhập")
            return false;
        }
    }

    //Kiem tra email
    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail('');
        return kiemTraEmailDaTonTai(e.target.value);
    }
    const kiemTraEmailDaTonTai = async (email: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data==="true"){
                setErrorEmail("Email đã được đăng ký!")
                return true;
            }
            return false;
        } catch (error){
            console.error("Lỗi không kiểm tra được email!");
            return false;
        }
    }

    //Kiem tra mat khau
    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setMatKhau(e.target.value);
        // Kiểm tra
        setErrorMatKhau('');
        // Kiểm tra sự tồn tại
        return kiemTraMatKhau(e.target.value);
    }
    const kiemTraMatKhau = (matKhau: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorMatKhau(""); // Mật khẩu hợp lệ
            return false;
        }
    }

    //Kiem tra mat khau lap lai
    const handleMatKhauLapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setMatKhauLapLai(e.target.value);
        // Kiểm tra
        setErrorMatKhauLapLai('');
        // Kiểm tra sự tồn tại
        return kiemTraMatKhauLapLai(e.target.value);
    }
    const kiemTraMatKhauLapLai = (matKhauLapLai: string) => {
        if (matKhauLapLai !== matKhau) {
            setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
            return true;
        } else {
            setErrorMatKhauLapLai(""); // Mật khẩu trùng khớp
            return false;
        }
    }

    //Kiem tra ho dem, ten
    const handleHoDemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHoDem(e.target.value);
        setErrorHoDem(e.target.value.trim() === '' ? 'Họ đệm không được để trống' : '');
    };

    const handleTenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTen(e.target.value);
        setErrorTen(e.target.value.trim() === '' ? 'Tên không được để trống' : '');
    }

        //Kiem tra so dien thoai
    const handleSoDienThoaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSoDienThoai(value);
        return kiemTraSoDienThoai(value);
    }
    const kiemTraSoDienThoai = (soDienThoai: string)=> {
        if (!/^0\d{9,}$/.test(soDienThoai)) {
            setErrorSoDienThoai('Số điện thoại không hợp lệ!');
        } else {
            setErrorSoDienThoai('');
            return false;
        }
    }

    //Chuan hoa gia tri gioi tinh
    let selectedGenderValue;
    const handleGioiTinhChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectedGenderValue = e.target.value;
        let genderValue;
        switch (selectedGenderValue) {
            case 'Nam':
                genderValue = 'M';
                break;
            case 'Nữ':
                genderValue = 'F';
                break;
            default:
                genderValue = 'O';
        }
        setGioiTinh(genderValue);
        console.log("Giới tính đã chọn:", genderValue);
    }
    //Xu li thay doi file
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        if (e.target.files) {
            const file = e.target.files[0];
            setAvatar(file);
        }
    };

    return(
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto" style={{ textAlign: 'left' }}>
                <form onSubmit={handleSubmit} className={"form"}>
                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label me-2">Tên đăng nhập</label>
                        <input type="text" id="tenDangNhap"
                               className="form-control" value={tenDangNhap}
                               onChange={handleTenDangNhapChange}
                        />
                        <div style={{color: "red"}}>{errorTenDangNhap}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label me-2">Email</label>
                        <input type="email" id="email"
                               className="form-control" value={email}
                               onChange={handleEmailChange}
                        />
                        <div style={{color: "red"}}>{errorEmail}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="matKhau"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange}
                        />
                        <div style={{color: "red"}}>{errorMatKhau}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="matKhauLapLai" className="form-label">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="matKhauLapLai"
                            className="form-control"
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLaiChange}
                        />
                        <div style={{color: "red"}}>{errorMatKhauLapLai}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="hoDem" className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            id="hoDem"
                            className="form-control"
                            value={hoDem}
                            onChange={handleHoDemChange}
                        />
                        <div style={{color: "red"}}>{errorHoDem}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ten" className="form-label">Tên</label>
                        <input
                            type="text"
                            id="ten"
                            className="form-control"
                            value={ten}
                            onChange={handleTenChange}
                        />
                        <div style={{color: "red"}}>{errorTen}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            id="soDienThoai"
                            className="form-control"
                            value={soDienThoai}
                            onChange={handleSoDienThoaiChange}
                        />
                        <div style={{color: "red"}}>{errorSoDienThoai}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <select
                            id="gioiTinh"
                            className="form-control"
                            value={selectedGenderValue}
                            onChange={handleGioiTinhChange}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                        <input
                            type="file"
                            id="avatar"
                            className="form-control"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                        <div style={{color: "red"}}>{errorSoDienThoai}</div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{color: "green"}}>{thongBao}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DangKyTaiKhoan;