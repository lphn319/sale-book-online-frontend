import {Box, Chip, CircularProgress, IconButton, Tooltip} from "@mui/material";
import {DataTable} from "../../../../utils/DataTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import DonHangModel from "../../../../models/DonHangModel";
import {layToanBoDonHang} from "../../../../api/DonHangApi";
import {VisibilityOutlined} from "@mui/icons-material";

interface DonHangTableProps {
    setId: any;
    setOption: any;
    handleOpenModal: any;
    setKeyCountReload?: any;
    keyCountReload?: any;
}
export const DonHangTable: React.FC<DonHangTableProps> = (props) => {
    const [loading, setLoading] = useState(true);
    // Tạo biến để lấy tất cả data
    const [data, setData] = useState<DonHangModel[]>([]);
    useEffect(() => {
        layToanBoDonHang()
            .then((response) => {
                const orders = response.map((order) => ({
                    ...order,
                    id: order.maDonHang,
                }));

                setData(orders);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [props.keyCountReload]);

    const columns: GridColDef[] = [
        { field: "maDonHang", headerName: "ID", width: 80 },
        { field: "hoTen", headerName: "TÊN KHÁCH HÀNG", width: 200 },
        { field: "ngayTao", headerName: "NGÀY TẠO", width: 100 },
        {
            field: "tongTien",
            headerName: "TỔNG TIỀN",
            width: 120,
            renderCell: (params) => {
                return (
                    <>{Number.parseInt(params.value).toLocaleString("vi-vn")} đ</>
                );
            },
        },
        {
            field: "trangThai",
            headerName: "TRẠNG THÁI",
            width: 150,
            renderCell: (params) => {
                return (
                    <Chip
                        label={params.value}
                        color={
                            params.value === "Thành công"
                                ? "success"
                                : params.value === "Đang xử lý"
                                    ? "info"
                                    : params.value === "Đang giao hàng"
                                        ? "warning"
                                        : "error"
                        }
                        variant='outlined'
                    />
                );
            },
        },
        { field: "hinhThucThanhToan", headerName: "THANH TOÁN", width: 150 },
        {
            field: "action",
            headerName: "HÀNH ĐỘNG",
            width: 200,
            type: "actions",
            renderCell: (item) => {
                return (
                    <div>
                        <Tooltip title={"Xem chi tiết"}>
                            <IconButton
                                color='secondary'
                                onClick={() => {
                                    props.setOption("view");
                                    props.setId(item.id);
                                    props.handleOpenModal();
                                }}
                            >
                                <VisibilityOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Chỉnh sửa"}>
                            <IconButton
                                color='primary'
                                onClick={() => {
                                    props.setOption("update");
                                    props.setId(item.id);
                                    props.handleOpenModal();
                                }}
                            >
                                <EditOutlinedIcon />
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