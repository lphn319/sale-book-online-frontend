import React from "react";
import "./Banner.css"; // Đảm bảo bạn tạo file Banner.css trong cùng thư mục
import bannerImage from '../../../assets/images/banner.png'; // Import hình ảnh

function Banner() {
    return (
        <div className="banner-container" style={{ backgroundImage: `url(${bannerImage})` }}>
            <div className="banner-content">
                <div className="text-content">
                    <h5 className="display-5 fw-bold">
                        Giá của sách không quan trọng bằng <br /> việc bạn phải trả giá nếu không đọc sách
                    </h5>
                    <button className="btn btn-primary btn-lg">Let's enjoy with us</button>
                </div>
            </div>
        </div>
    );
}

export default Banner;
