import Button from "@mui/material/Button";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RequireAdmin from "./RequireAdmin";
import { TheLoaiTable } from "./components/genre/TheLoaiTable";
import { FadeModal } from "../../utils/FadeModal";
import { TheLoaiForm } from "./components/genre/TheLoaiForm";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const QuanLyTheLoai = () => {
    const navigate = useNavigate(); // Hook điều hướng

    // Tạo biến để mỗi khi thao tác CRUD thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);

    const [option, setOption] = useState(""); // Truyền vào là (add, update, view)
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [id, setId] = useState<number>(0);

    return (
        <div className="container p-5">
            <div className="shadow-4-strong rounded p-5">
                {/* Tiêu đề và nút "Thêm Thể Loại", "Về Dashboard" */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h3>Quản Lý Thể Loại</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                handleOpenModal();
                                setOption("add");
                            }}
                            startIcon={<AddIcon />}
                        >
                            Thêm Thể Loại
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

                {/* Bảng Thể Loại */}
                <div>
                    <TheLoaiTable
                        keyCountReload={keyCountReload}
                        setOption={setOption}
                        setId={setId}
                        handleOpenModal={handleOpenModal}
                        setKeyCountReload={setKeyCountReload}
                    />
                </div>
            </div>

            {/* Modal Form */}
            <FadeModal
                open={openModal}
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
            >
                <TheLoaiForm
                    option={option}
                    id={id}
                    handleCloseModal={handleCloseModal}
                    setKeyCountReload={setKeyCountReload}
                />
            </FadeModal>
        </div>
    );
};

const QuanLyTheLoaiPage = RequireAdmin(QuanLyTheLoai);
export default QuanLyTheLoaiPage;
