import React, {useState} from "react";
import {Button} from "@mui/material";
import {FadeModal} from "../../utils/FadeModal";
import {SachTable} from "./components/book/SachTable";
import RequireAdmin from "./RequireAdmin";
import {SachForm} from "./components/book/SachForm";

function AddIcon() {
    return null;
}

const QuanLySach: React.FC = () => {
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
                            setOption("them");
                        }}
                        startIcon={<AddIcon />}
                    >
                        Thêm sách
                    </Button>
                </div>
                <div>
                    <SachTable
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
                <SachForm
                    id={id}
                    handleCloseModal={handleCloseModal}
                    option={option}
                    setKeyCountReload={setKeyCountReload}
                />
            </FadeModal>
        </div>
    );
};
const QuanLySachPage = RequireAdmin(QuanLySach);
export default QuanLySachPage;