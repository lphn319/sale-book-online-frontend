import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode, {jwtDecode} from 'jwt-decode'; // Sử dụng jwt-decode để giải mã token
import { useXacThuc } from "../../utils/XacThucContext";

const DangNhap = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setLoggedIn } = useXacThuc(); // Sử dụng hook để cập nhật trạng thái đăng nhập

    const handleDangNhap = () => {
        const dangNhapRequest = {
            username: username,
            password: password,
        };

        fetch('http://localhost:8080/tai-khoan/dang-nhap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dangNhapRequest),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Đăng nhập thất bại!');
                }
            })
            .then((data) => {
                const { jwt } = data; // Lấy JWT từ phản hồi
                localStorage.setItem('token', jwt);

                // Giải mã token để kiểm tra vai trò người dùng
                const decodedToken: any = jwtDecode(jwt);
                console.log('Decoded token:', decodedToken); // Debug token đã giải mã

                setLoggedIn(true);

                // Điều hướng dựa trên vai trò
                if (decodedToken.isAdmin) {
                    navigate('/dashboard'); // Điều hướng tới trang dashboard cho admin
                } else {
                    navigate('/'); // Điều hướng tới trang chủ cho khách hàng
                }

                setError('');
            })
            .catch((error) => {
                console.error('Đăng nhập thất bại: ', error);
                setLoggedIn(false);
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
            });
    };

    return (
        <div className='container'>
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
                <label className="sr-only">Tên đăng nhập</label>
                <input
                    type="text"
                    id="username"
                    className="form-control mb-2"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="sr-only">Mật khẩu</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control mb-2"
                    placeholder="Mật khẩu"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="button"
                    onClick={handleDangNhap}
                >
                    Đăng nhập
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
};

export default DangNhap;
