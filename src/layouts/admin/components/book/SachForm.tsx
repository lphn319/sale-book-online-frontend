import {FormEvent, useEffect, useState} from "react";
import TheLoaiModel from "../../../../models/TheLoaiModel";
import {layToanBoThongTinSachTheoMaSach} from "../../../../api/SachAPI";
import SachModel from "../../../../models/SachModel";
import {layToanBoTheLoai} from "../../../../api/TheLoaiAPI";
import {toast} from "react-toastify";
import { LoadingButton } from "@mui/lab";
import {Button, TextField, Typography} from "@mui/material";
import {CloudUpload } from "react-bootstrap-icons";
import { Box } from "@mui/material";
import {SelectMultiple} from "../../../../utils/SelectMultiple";

interface SachFormProps {
    id: number;
    option: string;
    setKeyCountReload?: any;
    handleCloseModal: any;
}

export const SachForm: React.FC<SachFormProps> = (props) => {
    const [sach, setSach] = useState<SachModel>({
        maSach: 0,
        tenSach: "",
        tenTacGia: "",
        moTa: "",
        giaNiemYet: 0,
        giaBan: 0,
        soLuong: 0,
        trungBinhXepHang: 0,
        isbn: "",
        danhSachMaTheLoai: [],
        danhSachTheLoai: [],
        relatedImg: [],
        thumbnail: "",
    });
    const [genresList, setGenresList] = useState<TheLoaiModel[]>([]);
    const [genresListSelected, setGenresListSelected] = useState<number[]>([]);
    const [previewThumbnail, setPreviewThumbnail] = useState("");
    const [previewRelatedImages, setPreviewRelatedImages] = useState<string[]>([]);

    // Giá trị khi đã chọn ở trong select multiple
    const [SelectedListName, setSelectedListName] = useState<any[]>([]);
    // Khi submit thì btn loading ...
    const [statusBtn, setStatusBtn] = useState(false);
    // Biến reload (cho selectMultiple)
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        if (props.option === "cap-nhat") {
            layToanBoThongTinSachTheoMaSach(props.id).then((response) => {
                console.log("Dữ liệu sách từ API:", response);
                setSach(response as SachModel);
                setPreviewThumbnail(response?.thumbnail as string);
                setPreviewRelatedImages(response?.relatedImg as string[]);
                response?.danhSachTheLoai?.forEach((data) => {
                    setSelectedListName((prev) => [...prev, data.tenTheLoai]);
                    setSach((prevBook) => {
                        return {
                            ...prevBook,
                            danhSachMaTheLoai: [...(prevBook.danhSachMaTheLoai || []), data.maTheLoai],
                        };
                    });
                });
            });
        } else {
            // Đặt lại form nếu không phải là chế độ "cap-nhat"
            setSach({
                maSach: 0,
                tenSach: "",
                tenTacGia: "",
                moTa: "",
                giaNiemYet: 0,
                giaBan: 0,
                soLuong: 0,
                trungBinhXepHang: 0,
                isbn: "",
                danhSachMaTheLoai: [],
                danhSachTheLoai: [],
                relatedImg: [],
                thumbnail: "",
            });
            setPreviewThumbnail("");
            setPreviewRelatedImages([]);
            setSelectedListName([]);
            setGenresListSelected([]);
        }
    }, [props.option, props.id]);


    // Khúc này lấy ra tất cả thể loại để cho vào select
    useEffect(() => {
        layToanBoTheLoai().then((response) => {
            setGenresList(response.danhSachTheLoai);
        });
    }, [props.option]);

    // Khúc này để lưu danh sách thể loại của sách
    useEffect(() => {
        setSach({ ...sach, danhSachMaTheLoai: genresListSelected });
    }, [genresListSelected]);

    async function hanleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        let bookRequest: SachModel = sach;
        console.log("Payload gửi lên server:", JSON.stringify(bookRequest));


        // console.log(book);

        setStatusBtn(true);

        const endpoint =
            props.option === "them"
                ? "http://localhost:8080/sach/them-sach"
                : "http://localhost:8080/sach/cap-nhat-sach";
        const method = props.option === "them" ? "POST" : "PUT";
        toast.promise(
            fetch(endpoint, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(bookRequest),
            })
                .then((response) => {
                    console.log("Response status:", response.status);
                    if (response.ok) {
                        setSach({
                            maSach: 0,
                            tenSach: "",
                            tenTacGia: "",
                            moTa: "",
                            giaNiemYet: 0,
                            giaBan: 0,
                            soLuong: 0,
                            trungBinhXepHang: 0,
                            isbn: "",
                            danhSachMaTheLoai: [],
                            danhSachTheLoai: [],
                            relatedImg: [],
                            thumbnail: "",
                        });
                        setPreviewThumbnail("");
                        setPreviewRelatedImages([]);
                        setReloadCount(Math.random());
                        setStatusBtn(false);
                        props.setKeyCountReload(Math.random());
                        props.handleCloseModal();
                        props.option === "them"
                            ? toast.success("Thêm sách thành công")
                            : toast.success("Cập nhật sách thành công");
                    } else {
                        toast.error("Gặp lỗi trong quá trình xử lý sách");
                        setStatusBtn(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setStatusBtn(false);
                    toast.error("Gặp lỗi trong quá trình xử lý sách");
                }),
            {
                pending: "Đang trong quá trình xử lý ...",
            }
        );
    }
    function handleThumnailImageUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const inputElement = event.target as HTMLInputElement;

        if (inputElement.files && inputElement.files.length > 0) {
            const selectedFile = inputElement.files[0];

            const reader = new FileReader();

            // Xử lý sự kiện khi tệp đã được đọc thành công
            reader.onload = (e: any) => {
                // e.target.result chính là chuỗi base64
                const thumnailBase64 = e.target?.result as string;

                setSach({ ...sach, thumbnail: thumnailBase64 });

                setPreviewThumbnail(URL.createObjectURL(selectedFile));
            };

            // Đọc tệp dưới dạng chuỗi base64
            reader.readAsDataURL(selectedFile);
        }
    }
    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = event.target as HTMLInputElement;

        if (inputElement.files && inputElement.files.length > 0) {
            const newPreviewImages = [...previewRelatedImages];

            if (newPreviewImages.length + inputElement.files.length > 5) {
                toast.warning("Chỉ được tải lên tối đa 5 ảnh");
                return;
            }

            // Duyệt qua từng file đã chọn
            for (let i = 0; i < inputElement.files.length; i++) {
                const selectedFile = inputElement.files[i];

                const reader = new FileReader();

                // Xử lý sự kiện khi tệp đã được đọc thành công
                reader.onload = (e: any) => {
                    // e.target.result chính là chuỗi base64
                    const thumbnailBase64 = e.target?.result as string;

                    setSach((prevBook) => ({
                        ...prevBook,
                        relatedImg: [...(prevBook.relatedImg || []), thumbnailBase64],
                    }));

                    newPreviewImages.push(URL.createObjectURL(selectedFile));

                    // Cập nhật trạng thái với mảng mới
                    setPreviewRelatedImages(newPreviewImages);
                };

                // Đọc tệp dưới dạng chuỗi base64
                reader.readAsDataURL(selectedFile);
            }
        }
    }
    return (
        <div>
            <Typography className='text-center' variant='h4' component='h2'>
                {props.option === "them" ? "TẠO SÁCH" : "SỬA SÁCH"}
            </Typography>
            <hr/>
            <div className='container px-5'>
                <form onSubmit={hanleSubmit} className='form'>
                    <input type='hidden' id='maSach' value={sach?.maSach} hidden/>
                    <div className='row'>
                        <div
                            className={props.option === "cap-nhat" ? "col-4" : "col-6"}
                        >
                            <Box
                                sx={{
                                    "& .MuiTextField-root": {mb: 3},
                                }}
                            >
                                <TextField
                                    required
                                    id='filled-required'
                                    label='Tên sách'
                                    style={{width: "100%"}}
                                    value={sach.tenSach}
                                    onChange={(e: any) =>
                                        setSach({...sach, tenSach: e.target.value})
                                    }
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Tên tác giả'
                                    style={{width: "100%"}}
                                    value={sach.tenTacGia}
                                    onChange={(e: any) =>
                                        setSach({...sach, tenTacGia: e.target.value})
                                    }
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Giá niêm yết'
                                    style={{width: "100%"}}
                                    type='number'
                                    value={
                                        Number.isNaN(sach.giaNiemYet) ? "" : sach.giaNiemYet
                                    }
                                    onChange={(e: any) =>
                                        setSach({
                                            ...sach,
                                            giaNiemYet: parseFloat(e.target.value),
                                        })
                                    }
                                    size='small'
                                />
                            </Box>
                        </div>
                        <div
                            className={props.option === "cap-nhat" ? "col-4" : "col-6"}
                        >
                            <Box
                                sx={{
                                    "& .MuiTextField-root": {mb: 3},
                                }}
                            >
                                <TextField
                                    required
                                    id='filled-required'
                                    label='Giá bán'
                                    style={{ width: "100%" }}
                                    type='number'
                                    value={sach.giaBan ? sach.giaBan : ""}
                                    onChange={(e: any) =>
                                        setSach({
                                            ...sach,
                                            giaBan: parseFloat(e.target.value),
                                        })
                                    }
                                    size='small'
                                />

                                <TextField
                                    required
                                    id='filled-required'
                                    label='Số lượng'
                                    style={{ width: "100%" }}
                                    type='number'
                                    value={sach.soLuong ? sach.soLuong : ""}
                                    onChange={(e: any) =>
                                        setSach({
                                            ...sach,
                                            soLuong: parseInt(e.target.value),
                                        })
                                    }
                                    size='small'
                                />

                                <SelectMultiple
                                    selectedList={genresListSelected}
                                    setSelectedList={setGenresListSelected}
                                    selectedListName={SelectedListName}
                                    setSelectedListName={setSelectedListName}
                                    values={genresList}
                                    setValue={setSach}
                                    key={reloadCount}
                                    required={true}
                                />


                            </Box>
                        </div>
                        {props.option === "cap-nhat" && (
                            <div className='col-4'>
                                <Box
                                    sx={{
                                        "& .MuiTextField-root": {mb: 3},
                                    }}
                                >
                                    <TextField
                                        id='filled-required'
                                        label='Điểm đánh giá'
                                        style={{width: "100%"}}
                                        value={sach.trungBinhXepHang}
                                        InputProps={{
                                            disabled: true,
                                        }}
                                        size='small'
                                    />
                                </Box>
                            </div>
                        )}
                        <div className='col-12'>
                            <Box>
                                <TextField
                                    id='outlined-multiline-flexible'
                                    label='Mô tả sách'
                                    style={{width: "100%"}}
                                    multiline
                                    maxRows={5}
                                    value={sach.moTa}
                                    onChange={(e: any) =>
                                        setSach({...sach, moTa: e.target.value})
                                    }
                                    required
                                />
                            </Box>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload/>}
                            >
                                Tải ảnh thumbnail
                                <input
                                    style={{opacity: "0", width: "10px"}}
                                    // required={props.option === "cap-nhat" ? false : true}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleThumnailImageUpload}
                                    alt=''
                                />
                            </Button>
                            <img src={previewThumbnail} alt='' width={100}/>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload/>}
                            >
                                Tải ảnh liên quan
                                <input
                                    style={{opacity: "0", width: "10px"}}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    multiple
                                    alt=''
                                />
                            </Button>
                            {previewRelatedImages.map((imgURL) => (
                                <img src={imgURL} alt='' width={100}/>
                            ))}
                            {previewRelatedImages.length > 0 && (
                                <Button
                                    onClick={() => {
                                        setPreviewRelatedImages([]);
                                        setSach({...sach, relatedImg: []});
                                    }}
                                >
                                    Xoá tất cả
                                </Button>
                            )}
                        </div>
                    </div>
                    {props.option !== "view" && (
                        <LoadingButton
                            className='w-100 my-3'
                            type='submit'
                            loading={statusBtn}
                            variant='outlined'
                            sx={{width: "25%", padding: "10px"}}
                        >
                            {props.option === "them" ? "Tạo sách" : "Lưu sách"}
                        </LoadingButton>
                    )}
                </form>
            </div>
        </div>
    );
}
