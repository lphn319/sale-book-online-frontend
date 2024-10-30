import { Button } from "@mui/material";
import React, {useState} from "react";
import {NguoiDungForm} from "./user/NguoiDungForm";
import {FadeModal} from "../../utils/FadeModal";
import RequireAdmin from "./RequireAdmin";
import {NguoiDungTable} from "./user/NguoiDungTable";

function AddIcon() {
    return null;
}

const QuanLyNguoiDung =() => {
    // Tạo ra biến để mỗi khi thao tác CRUD thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);

    const [option, setOption] = useState(""); // Truyền vào là có thể là (them, cap-nhat)
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [id, setId] = useState<number>(0);

    return (
        <div className='conatiner p-5'>
            <div className='shadow-4-strong rounded p-5'>
                <div className='mb-3'>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={() => {
                            handleOpenModal();
                            setOption("them");
                        }}
                        startIcon={<AddIcon />}
                    >
                        Thêm người dùng
                    </Button>
                </div>
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
}
const QuanLyNguoiDungPage = RequireAdmin(QuanLyNguoiDung);
export default QuanLyNguoiDungPage;