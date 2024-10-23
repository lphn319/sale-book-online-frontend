import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function KichHoatTaiKhoan(){

    const { email } = useParams();
    const { maKichHoat } = useParams();
    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState("");

    useEffect(()=>{

        console.log("Email:", email);
        console.log("MaKichHoat:", maKichHoat);
        if(email && maKichHoat){
            thucHienKichHoat();
        }
    }, [email, maKichHoat]);

    const thucHienKichHoat = async() => {
        console.log("Email:", email);
        console.log("MaKichHoat:", maKichHoat);
        try {
            const url:string = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`;
            const response = await fetch(url, {method: "GET"});

            if(response.ok){
                setDaKichHoat(true);
            } else {
                const errorText = await response.text();  // Chờ lấy nội dung lỗi
                setThongBao(errorText);
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt: ", error);
            setThongBao("Đã xảy ra lỗi, vui lòng thử lại sau.");
        }
    }

    return (
        <div>
            <h1>Kích hoạt tài khoản</h1>
            {
                daKichHoat
                    ? (<p> Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!</p>)
                    : (
                        <p>{thongBao}</p>
                    )
            }
        </div>
    );
}

export default KichHoatTaiKhoan;