import React, { FormEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { lay1TheLoai } from "../../../../api/TheLoaiAPI";
import TheLoaiModel from "../../../../models/TheLoaiModel";
import { isTokenExpired } from "../../../../utils/JwtService";
import "../../../../utils/style/TheLoai.css"; // Import the CSS

interface TheLoaiFormProps {
    option: string;
    id: number;
    handleCloseModal: () => void;
    setKeyCountReload?: (key: number) => void;
}

export const TheLoaiForm: React.FC<TheLoaiFormProps> = ({ option, id, handleCloseModal, setKeyCountReload }) => {
    const [genre, setGenre] = useState<TheLoaiModel>({
        maTheLoai: 0,
        tenTheLoai: "",
    });

    useEffect(() => {
        if (option === "update" && id) {
            lay1TheLoai(id)
                .then((response) =>
                    setGenre({
                        maTheLoai: response.theLoai.maTheLoai,
                        tenTheLoai: response.theLoai.tenTheLoai,
                    })
                )
                .catch(() => toast.error("Không tìm thấy thể loại này!"));
        }
    }, [id, option]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Bạn chưa đăng nhập!");
            return;
        }
        if (isTokenExpired(token)) {
            toast.error("Token đã hết hạn. Vui lòng đăng nhập lại!");
            return;
        }

        const method = option === "add" ? "POST" : "PUT";
        const endpoint =
            option === "add"
                ? "http://localhost:8080/the-loai/them-the-loai"
                : `http://localhost:8080/the-loai/cap-nhat-the-loai/${id}`;

        fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(genre),
        })
            .then((response) => {
                if (response.ok) {
                    setGenre({
                        maTheLoai: 0,
                        tenTheLoai: "",
                    });

                    if (option === "add") {
                        toast.success("Thêm thể loại thành công");
                    } else {
                        toast.success("Cập nhật thể loại thành công");
                    }

                    setKeyCountReload && setKeyCountReload(Math.random());
                    handleCloseModal();
                } else {
                    toast.error("Lỗi khi thực hiện hành động");
                    handleCloseModal();
                }
            })
            .catch((e) => {
                toast.error("Lỗi khi thực hiện hành động");
                handleCloseModal();
                console.log(e);
            });
    }

    return (
        <div className="form-container">
            <Typography variant="h4" component="h2" className="form-title">
                {option === "add"
                    ? "TẠO THỂ LOẠI"
                    : option === "update"
                        ? "SỬA THỂ LOẠI"
                        : "XEM CHI TIẾT"}
            </Typography>
            <hr className="form-divider" />
            <div className="container px-5">
                <form onSubmit={handleSubmit} className="form">
                    <Box
                        sx={{
                            "& .MuiTextField-root": { mb: 3 },
                        }}
                    >
                        <TextField
                            required
                            label="Tên thể loại"
                            className="form-field"
                            value={genre.tenTheLoai}
                            onChange={(e) => setGenre({ ...genre, tenTheLoai: e.target.value })}
                            size="small"
                            disabled={option === "view"}
                        />
                    </Box>
                    {option !== "view" && (
                        <button className="form-button" type="submit">
                            {option === "add" ? "Tạo thể loại" : "Lưu thể loại"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};
