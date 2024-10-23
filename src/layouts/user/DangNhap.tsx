import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DangNhap = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/tai-khoan/dang-nhap',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            }
        ).then(
            (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Đăng nhập thất bại!')
                }
            }
        ).then(
            (data) => {
                // Xử lý đăng nhập thành công
                const { jwt } = data;
                // Lưu token vào localStorage hoặc cookie
                localStorage.setItem('token', jwt);
                // Điều hướng đến trang chính hoặc thực hiện các tác vụ sau đăng nhập thành công
                navigate('/');
                setError('Đăng nhập thành công!');
            }
        ).catch((error) => {
                // Xử lý lỗi đăng nhập
                console.error('Đăng nhập thất bại: ', error);
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
            }
        )
    }
    return (
        <div className='container'>
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
                <label className="sr-only">Tên đăng nhập</label>
                <input type="username" id="username" className="form-control mb-2" placeholder="Email address"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />
                <label className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button"
                        onClick={handleLogin}
                >Đăng nhập</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
}

export default DangNhap;