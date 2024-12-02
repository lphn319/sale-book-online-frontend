import { DataGrid } from "@mui/x-data-grid/DataGrid";
import React from "react";
import "../utils/style/Table.css"

interface DataTableProps {
    rows: any;
    columns: any;
}

export const DataTable: React.FC<DataTableProps> = (props) => {
    return (
        <div
            style={{
                width: "100%",
                height: props.rows.length > 0 ? "auto" : "200px",
            }}
        >
            <div className="data-table-container">
                <DataGrid
                    rows={props.rows}
                    columns={props.columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    pageSizeOptions={[10, 15, 20, 30]}
                    autoHeight // Tự động điều chỉnh chiều cao
                    disableRowSelectionOnClick // Vô hiệu hóa chọn hàng khi click
                    sx={{
                        "& .MuiDataGrid-cell": {
                            whiteSpace: "normal", // Cho phép xuống dòng nội dung
                            wordWrap: "break-word", // Tự động ngắt dòng nội dung dài
                        },
                        "& .MuiDataGrid-columnHeader": {
                            textAlign: "center", // Căn giữa tiêu đề cột
                        },
                    }}
                />
            </div>
        </div>
    );
};
