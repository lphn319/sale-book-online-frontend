import React from "react";

function Banner(){
    return (
        <div className="p-2 mb-4 bg-dark">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h3 className="display-5 fw-bold">
                        Đọc đọc đọc <br/> và đọc đọc đọc
                    </h3>
                    <button className="btn btn-primary btn-lg text-white float-end">Khám phá sách tại BaConBo.vn</button>
                </div>
            </div>
        </div>
    );
}
export default Banner;