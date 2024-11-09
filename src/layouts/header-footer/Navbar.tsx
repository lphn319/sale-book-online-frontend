import React, { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import TheLoaiModel from "../../models/TheLoaiModel";
import { layToanBoTheLoai } from "../../api/TheLoaiAPI";
import { useXacThuc } from "../../utils/XacThucContext";

interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
    const [theLoaiList, setTheLoaiList] = useState<TheLoaiModel[]>([]);
    const { isLoggedIn, setLoggedIn } = useXacThuc();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTheLoai = async () => {
            try {
                const response = await layToanBoTheLoai();
                setTheLoaiList(response.danhSachTheLoai);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thể loại:", error);
            }
        };

        fetchTheLoai();
    }, []);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamThoi(e.target.value);
    };

    const handleSearch = () => {
        setTuKhoaTimKiem(tuKhoaTamThoi);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/dang-nhap"); // điều hướng đến trang đăng nhập
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Bookstore</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button"
                                     data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                {theLoaiList.map((theLoai) => (
                                    <li key={theLoai.maTheLoai}>
                                        <Link className="dropdown-item" to={`/${theLoai.maTheLoai}`}>{theLoai.tenTheLoai}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Liên hệ</a>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <input className="form-control me-2" type="search"
                           placeholder="Tìm kiếm" aria-label="Search"
                           onChange={onSearchInputChange} onKeyDown={handleKeyDown}
                           value={tuKhoaTamThoi} />
                    <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
                        <Search />
                    </button>
                </div>

                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <Link className="nav-link" to="/gio-hang">
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav me-1">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown3">
                            {!isLoggedIn ? (
                                <>
                                    <li><Link className="dropdown-item" to="/dang-nhap">Đăng nhập</Link></li>
                                    <li><Link className="dropdown-item" to="/dang-ky">Đăng ký</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className="dropdown-item" to="/account">Quản lý tài khoản</Link></li>
                                    <li><Link className="dropdown-item" to="/quan-li-don-hang">Quản lý đơn hàng</Link></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                                </>
                            )}
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
