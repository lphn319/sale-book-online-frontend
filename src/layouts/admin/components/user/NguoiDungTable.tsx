import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import NguoiDungModel from "../../../../models/NguoiDungModel";
import {useConfirm} from "material-ui-confirm";
import {layTatCaNguoiDungCoQuyen} from "../../../../api/NguoiDungAPI";
import {Box, Chip, CircularProgress, IconButton, Tooltip} from "@mui/material";
import {DataTable} from "../../../../utils/DataTable";
import {GridColDef} from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {DeleteOutlineOutlined} from "@mui/icons-material";

interface NguoiDungTableProps {
    setOption: any;
    handleOpenModal: any;
    setKeyCountReload?: any;
    keyCountReload?: any;
    setId: any;
}
export const NguoiDungTable: React.FC<NguoiDungTableProps> = (props) => {
    const [loading, setLoading] = useState(true);
    // Tạo biến để lấy tất cả data
    const [data, setData] = useState<NguoiDungModel[]>([]);

    const confirm = useConfirm();

    // Xử lý xoá user
    function handleDeleteUser(maNguoiDung: any) {
        const token = localStorage.getItem("token");
        confirm({
            title: "Xoá nguoi dung",
            description: "Bạn chắc chắn xoá người dùng này chứ?",
            confirmationText: ["Xoá"],
            cancellationText: ["Huỷ"],
        })
            .then(() => {
                toast.promise(
                    fetch(`http://localhost:8080/tai-khoan/xoa-tai-khoan/${maNguoiDung}`, {
                    method: "DELETE",
                        headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((response) => {
                    if (response.ok) {
                        toast.success("Xoá người dùng thành công");
                        props.setKeyCountReload(Math.random());
                        console.log(response.status)
                    } else {
                        toast.error("Lỗi khi xoá người dùng");
                    }
                })
                    .catch((error) => {
                        toast.error("Lỗi khi xoá người dùng");
                        console.log(error);
                        console.log(data);
                    }),
                    { pending: "Đang trong quá trình xử lý ..." }
            );
            })
            .catch(() => {});
    }

    useEffect(() => {
        layTatCaNguoiDungCoQuyen()
            .then((response) => {
                console.log("Danh sách người dùng từ API:", response);
                let danhSachNguoiDung = response
                    .flat().map((nguoiDung) => ({
                    ...nguoiDung,
                    id: nguoiDung.maNguoiDung, // Thêm thuộc tính id bằng maNguoiDung
                }));
                danhSachNguoiDung = danhSachNguoiDung
                                .sort((u1, u2) => u1.maNguoiDung - u2.maNguoiDung);
                setData(danhSachNguoiDung);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [props.keyCountReload]);


    const columns: GridColDef[] = [
        { field: "maNguoiDung", headerName: "Mã người dùng", width: 50 },
        { field: "tenDangNhap", headerName: "Tên đăng nhập", width: 120 },
        {
            field: "quyen",
            headerName: "Quyền",
            width: 150,
            renderCell: (params) => {
                return (
                    <Chip
                        label={params.value}
                        color={params.value === "KHACH HANG" ? "success" : "error"}
                        variant='outlined'
                    />
                );
            },
        },
        { field: "ten", headerName: "Tên", width: 100 },
        {
            field: "ngaySinh",
            headerName: "Ngày sinh",
            width: 100,
        },
        { field: "email", headerName: "Email", width: 200 },
        { field: "soDienThoai", headerName: "Số điện thoại", width: 120 },

        {
            field: "action",
            headerName: "Hành động",
            width: 200,
            type: "actions",
            renderCell: (item) => {
                return (
                    <div>
                        <Tooltip title={"Chỉnh sửa"}>
                            <IconButton
                                color='primary'
                                onClick={() => {
                                    props.setOption("cap-nhat");
                                    props.setId(item.id);
                                    props.handleOpenModal();
                                }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Xoá"}>
                            <IconButton
                                color='error'
                                onClick={() => handleDeleteUser(item.id)}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return <DataTable columns={columns} rows={data} />;
};