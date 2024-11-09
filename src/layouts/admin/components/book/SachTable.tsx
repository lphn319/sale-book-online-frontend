import React, {useEffect, useState} from "react";
import {useConfirm} from "material-ui-confirm";
import SachModel from "../../../../models/SachModel";
import {layToanBoSach} from "../../../../api/SachAPI";
import {layToanBoAnhCuaMotSach} from "../../../../api/HinhAnhAPI";
import {toast} from "react-toastify";
import {GridColDef} from "@mui/x-data-grid";
import {Box, CircularProgress, IconButton, Tooltip} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {DeleteOutlineOutlined} from "@mui/icons-material";
import {DataTable} from "../../../../utils/DataTable";

interface SachTableProps{
    setOption: any;
    handleOpenModal: any;
    setKeyCountReload?: any;
    keyCountReload?: any;
    setId: any;
}

export const SachTable: React.FC<SachTableProps> = (props) => {
    const [loading, setLoading] = useState(true);

    // Tạo các biến của confirm dialog
    const confirm = useConfirm();
    // Tạo biến để lấy tất cả data
    const [data, setData] = useState<SachModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const sachReponse = await layToanBoSach(1000, 0);

                const promises = sachReponse.ketQua.map(async (sach) => {
                    const danhSachHinhAnh = await layToanBoAnhCuaMotSach(sach.maSach);
                    //Lay anh
                    let duLieuAnh:string="";

                    if(danhSachHinhAnh[0] && danhSachHinhAnh[0].duLieuAnh){
                        duLieuAnh=danhSachHinhAnh[0].duLieuAnh;
                    }
                    // const thumbnail = imagesList.find((image) => image.thumbnail);


                    return {
                        ...sach,
                        id: sach.maSach,
                        duLieuAnh: duLieuAnh,
                    };
                });
                const danhSachSach = await Promise.all(promises);
                setData(danhSachSach);
                setLoading(false);
            } catch (error){
                console.error(error);
            }
        }
        fetchData();
    }, [props.keyCountReload]);

    const handleXoaSach = (maSach: any) => {
        const token = localStorage.getItem("token");
        confirm({
            title: "Xoá sách",
            description: `Bạn chắc chắn xoá sách này chứ?`,
            confirmationText: ["Xoá"],
            cancellationText: ["Huỷ"],
        })
            .then(() => {
                fetch(`http://localhost:8080/sach/${maSach}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            toast.success("Xoá sách thành công");
                            props.setKeyCountReload(Math.random());
                        } else {
                            toast.error("Lỗi khi xoá sách");
                        }
                    })
                    .catch((error) => {
                        toast.error("Lỗi khi xoá sách");
                        console.log(error);
                    });
            })
            .catch(() => {});
    };

    const columns: GridColDef[] = [
        {field: "maSach", headerName: "ID", width: 80},
        {
            field: "duLieuAnh",
            headerName: "Ảnh",
            width: 100,
            renderCell: (params) => {
                return <img src={params.value} alt='' width={70} />;
            },
        },
        { field: "tenSach", headerName: "TÊN SÁCH", width: 350 },
        { field: "soLuong", headerName: "SỐ LƯỢNG", width: 100 },
        {
            field: "giaBan",
            headerName: "GIÁ BÁN",
            width: 120,
            renderCell: (params) => {
                return (
                    <span>
						{Number.parseInt(params.value).toLocaleString("vi-vn")}đ
					</span>
                );
            },
        },
        { field: "tenTacGia", headerName: "TÁC GIẢ", width: 150 },
        {
            field: "action",
            headerName: "HÀNH ĐỘNG",
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
                                onClick={() => handleXoaSach(item.id)}
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
}