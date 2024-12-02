import { Button } from "@mui/material";
import React, { useState } from "react";
import { NguoiDungForm } from "./components/user/NguoiDungForm";
import { FadeModal } from "../../utils/FadeModal";
import RequireAdmin from "./RequireAdmin";
import { NguoiDungTable } from "./components/user/NguoiDungTable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const QuanLyNguoiDung = () => {
    const navigate = useNavigate(); // Hook điều hướng

    // Tạo biến để mỗi khi thao tác CRUD thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);

    const [option, setOption] = useState(""); // Truyền vào là (them, cap-nhat)
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [id, setId] = useState<number>(0);

    return (
        <div className="container p-5">
            <div className="shadow-4-strong rounded p-5">
                {/* Tiêu đề và nút "Thêm người dùng", "Về Dashboard" */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h3>Quản Lý Người Dùng</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                handleOpenModal();
                                setOption("them");
                            }}
                            startIcon={<AddIcon />}
                        >
                            Thêm người dùng
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/dashboard")} // Điều hướng về dashboard
                        >
                            Về Dashboard
                        </Button>
                    </div>
                </div>

                {/* Bảng người dùng */}
                <div>
                    <NguoiDungTable
                        keyCountReload={keyCountReload}
                        setOption={setOption}
                        handleOpenModal={handleOpenModal}
                        setKeyCountReload={setKeyCountReload}
                        setId={setId}
                    />
                </div>
            </div>

            {/* Modal Form */}
            <FadeModal
                open={openModal}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            >
                <NguoiDungForm
                    option={option}
                    setKeyCountReload={setKeyCountReload}
                    id={id}
                    handleCloseModal={handleCloseModal}
                />
            </FadeModal>
        </div>
    );
};

const QuanLyNguoiDungPage = RequireAdmin(QuanLyNguoiDung);
export default QuanLyNguoiDungPage;
