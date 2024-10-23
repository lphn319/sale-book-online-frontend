import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error403: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Điều hướng về trang chủ sau 5 giây
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        // Dọn dẹp timer khi component bị unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="error-403-container">
            <h1 className="error-code">403</h1>
            <h2 className="error-message">Truy cập bị từ chối</h2>
            <p>Bạn không có quyền truy cập vào trang này.</p>
            <p>Hệ thống sẽ tự động đưa bạn về trang chủ sau vài giây.</p>
        </div>
    );
}

export default Error403;
