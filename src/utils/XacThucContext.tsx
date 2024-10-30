import React, { createContext, useContext, useState } from "react";
import { isToken } from "./JwtService";

interface XacThucContextProps {
    children: React.ReactNode;
}

interface XacThucContextType {
    isLoggedIn: boolean;
    setLoggedIn: any;
}

const XacThucContext = createContext<XacThucContextType | undefined>(undefined);

export const XacThucProvider: React.FC<XacThucContextProps> = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(isToken());

    return (
        <XacThucContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {props.children}
        </XacThucContext.Provider>
    );
};

export const useXacThuc = (): XacThucContextType => {
    const context = useContext(XacThucContext);
    if (!context) {
        throw new Error("Lỗi context");
    }
    return context;
};
