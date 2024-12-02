import React from "react";

function Footer() {
    return (
        <footer style={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <p>Đây là đồ án học phần của sinh viên Trường Sư phạm Kỹ thuật TP.HCM. Website được xây dựng để phục vụ nhu cầu mua sắm sách trực tuyến.</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center py-3 mt-4 border-top">
                    <p>&copy; 2024 Đồ án học phần - Chỉ phục vụ mục đích học tập và nghiên cứu.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
