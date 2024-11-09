import Button from "@mui/material/Button";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import RequireAdmin from "./RequireAdmin";
import {TheLoaiTable} from "./components/genre/TheLoaiTable";
import {FadeModal} from "../../utils/FadeModal";
import {TheLoaiForm} from "./components/genre/TheLoaiForm";
import "../../utils/style/TheLoai.css";


const QuanLyTheLoai = () => {
    // Tạo ra biến để mỗi khi thao tác CRUD thì sẽ update lại table
    const [keyCountReload, setKeyCountReload] = useState(0);

    const [option, setOption] = useState(""); // Truyền vào là có thể là (add, update, view)
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
                            setOption("add");
                        }}
                        startIcon={<AddIcon />}
                    >
                        Thêm thể loại
                    </Button>
                </div>
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