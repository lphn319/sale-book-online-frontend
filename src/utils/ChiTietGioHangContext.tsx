import React, {createContext, useContext, useEffect, useState} from 'react';
import ChiTietGioHangModel from "../models/ChiTietGioHangModel";

interface ChiTietGioHangProps {
    children: React.ReactNode;
}

interface ChiTietGioHangType {
    danhSachGioHang: ChiTietGioHangModel[];
    setDanhSachGioHang: React.Dispatch<React.SetStateAction<ChiTietGioHangModel[]>>;
    tatCaGioHang: number;
    setTatCaGioHang: React.Dispatch<React.SetStateAction<number>>;
}

// Tạo context và cung cấp giá trị mặc định là undefined
const ChiTietGioHang = createContext<ChiTietGioHangType | undefined>(undefined);

export const ChiTietGioHangProvider: React.FC<ChiTietGioHangProps> = (props) => {
    const [danhSachGioHang, setDanhSachGioHang] = useState<ChiTietGioHangModel[]>([]);
    const [tatCaGioHang, setTatCaGioHang] = useState(0);

    useEffect(() => {
        const gioHangData: string | null = localStorage.getItem("gioHang");
        let gioHang: ChiTietGioHangModel[] = [];
        gioHang = gioHangData ? JSON.parse(gioHangData) : [];
        setDanhSachGioHang(gioHang);
        setTatCaGioHang(gioHang.length);
    }, []);

    return (
        <ChiTietGioHang.Provider value={{ danhSachGioHang, setDanhSachGioHang, tatCaGioHang, setTatCaGioHang }}>
            {props.children}
        </ChiTietGioHang.Provider>
    );
};

// Custom hook để sử dụng context dễ dàng hơn
export const useChiTietGioHang = (): ChiTietGioHangType => {
    const context = useContext(ChiTietGioHang);
    if (!context) {
        throw new Error("Lỗi context");
    }
    return context;
};
