import React, {useState} from "react";
import {FadeModal} from "../../utils/FadeModal";
import {DonHangTable} from "./components/order/DonHangTable";
import {DonHangForm} from "./components/order/DonHangForm";
import RequireAdmin from "./RequireAdmin";
import {useNavigate} from "react-router-dom"; // Import useNavigate
import {Button} from "@mui/material"; // Import Button từ Material-UI


const QuanLyDonHang = () => {
    const navigate = useNavigate();
    // Tạo ra biến để mỗi khi thao tác CRUD thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);
    const [id, setId] = useState(0);

    const [option, setOption] = useState(""); // Truyền vào là có thể là (add, update, view)
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div className='conatiner p-5'>
            <div className='shadow-4-strong rounded p-5'>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                    <h3>Quản Lý Đơn Hàng</h3>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/dashboard")} // Điều hướng về dashboard
                    >
                        Về Dashboard
                    </Button>
                </div>
                <div>
                    <DonHangTable
                        keyCountReload={keyCountReload}
                        setOption={setOption}
                        handleOpenModal={handleOpenModal}
                        setKeyCountReload={setKeyCountReload}
                        setId={setId}
                    />
                </div>

            </div>
            <FadeModal
                open={openModal}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            >
                <DonHangForm
                    id={id}
                    option={option}
                    setKeyCountReload={setKeyCountReload}
                    handleCloseModal={handleCloseModal}
                />
            </FadeModal>

        </div>
    );
}
const QuanLyDonHangPage = RequireAdmin(QuanLyDonHang);
export default QuanLyDonHangPage;