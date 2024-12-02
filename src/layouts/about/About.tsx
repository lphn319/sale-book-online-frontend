import React from "react";
import "./About.css"; // Đảm bảo bạn tạo file About.css trong cùng thư mục
import hcmuteLogo from '../../assets/images/hcmute-logo.png'; // Đảm bảo đường dẫn chính xác

const About: React.FC = () => {
    return (
        <div className="container about-container">
            <div className="header">

                <div className="header-text">
                    <h3>BỘ GIÁO DỤC VÀ ĐÀO TẠO</h3>
                    <h3>TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</h3>
                    <h3>KHOA CÔNG NGHỆ THÔNG TIN</h3>
                    <h4>-------------------------------</h4>
                    <div className="logo">
                        {/* Sử dụng import để lấy hình ảnh */}
                        <img src={hcmuteLogo} alt="HCMUTE Logo" className="logo-img" />
                    </div>
                    <h2>BÁO CÁO ĐỀ TÀI</h2>
                    <h2>ĐỒ ÁN CÔNG NGHỆ THÔNG TIN</h2>
                    <h2>XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ KINH DOANH SÁCH</h2>
                </div>
            </div>

            <div className="content">
                <section>
                    <h2 className="section-title">MÔN HỌC: Đồ án Công nghệ thông tin</h2>
                    <h2 className="section-title">GVHD: Ths Nguyễn Trần Thi Văn</h2>
                </section>

                <section>
                    <h2 className="section-title">Thành viên thực hiện:</h2>
                    <ul className="student-list">
                        <li className="student-item">Phan Thị Mỹ Linh - 22110172</li>
                        <li className="student-item">Trần Nguyễn Quốc Bảo - 22110112</li>
                        <li className="student-item">Nguyễn Hữu Thông - 22110239</li>
                    </ul>
                </section>

                <section>
                    <h2 className="section-title">Mô tả đồ án:</h2>
                    <p className="project-description">
                        Đây là đồ án công nghệ thông tin của nhóm sinh viên thuộc Trường Sư phạm Kỹ thuật Thành phố Hồ Chí Minh. Đồ án có tên gọi "Website bán sách trực tuyến", mục tiêu xây dựng một nền tảng thương mại điện tử giúp người dùng dễ dàng tìm kiếm và mua sách trực tuyến. Dự án được thực hiện dưới sự hướng dẫn của Thạc sĩ Nguyễn Trần Thi Văn, giảng viên bộ môn Công nghệ thông tin. Website sẽ có các tính năng chính như tìm kiếm sách theo tên, tác giả, thể loại, giỏ hàng, thanh toán trực tuyến và hiển thị thông tin chi tiết về sách. Mục tiêu học tập của đồ án là giúp sinh viên phát triển kỹ năng lập trình web, thiết kế giao diện người dùng, và áp dụng kiến thức công nghệ thông tin vào thực tế. Kết quả mong đợi là xây dựng một website hoàn thiện, dễ sử dụng và có khả năng xử lý đơn hàng hiệu quả.
                    </p>
                </section>
            </div>

            <footer>
                <h3>TP. Hồ Chí Minh, tháng 11 năm 2024</h3>
            </footer>
        </div>
    );
};

export default About;
