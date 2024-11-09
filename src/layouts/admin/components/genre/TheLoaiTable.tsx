import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";
import { layToanBoTheLoai } from "../../../../api/TheLoaiAPI";
import TheLoaiModel from "../../../../models/TheLoaiModel";
import { DataTable } from "../../../../utils/DataTable";
import "../../../../utils/style/TheLoai.css";

interface GenreTableProps {
    setOption: any;
    handleOpenModal: any;
    setId: any;
    setKeyCountReload?: any;
    keyCountReload?: any;
}

export const TheLoaiTable: React.FC<GenreTableProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const confirm = useConfirm();
    const [data, setData] = useState<TheLoaiModel[]>([]);

    useEffect(() => {
        layToanBoTheLoai().then((response) => {
            const genres = response.danhSachTheLoai.map((theLoai) => ({
                ...theLoai,
                id: theLoai.maTheLoai,
            }));
            setData(genres);
            setLoading(false);
        });
    }, [props.keyCountReload]);

    const handleDeleteGenre = (id: any) => {
        const token = localStorage.getItem("token");

        confirm({
            title: "Xoá thể loại",
            description: `Bạn chắc chắn xoá thể loại này chứ?`,
            confirmationText: "Xoá",
            cancellationText: "Huỷ",
        })
            .then(() => {
                fetch(`http://localhost:8080/the-loai/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            toast.success("Xoá thể loại thành công");
                            props.setKeyCountReload(Math.random());
                        } else {
                            toast.error("Lỗi khi xoá thể loại");
                        }
                    })
                    .catch((error) => {
                        toast.error("Lỗi khi xoá thể loại");
                        console.log(error);
                    });
            })
            .catch(() => {});
    };

    // Sử dụng `flex` để tự động chỉnh chiều rộng của các cột
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
        { field: "tenTheLoai", headerName: "TÊN THỂ LOẠI", flex: 2, minWidth: 200 },
        {
            field: "action",
            headerName: "HÀNH ĐỘNG",
            flex: 1,
            minWidth: 150,
            type: "actions",
            renderCell: (item) => (
                <div className="action-buttons">
                    <Tooltip title="Chỉnh sửa">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                props.setOption("update");
                                props.setId(item.id);
                                props.handleOpenModal();
                            }}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteGenre(item.id)}
                        >
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="table-container">
            <DataTable columns={columns} rows={data}  />
        </Box>
    );
};
