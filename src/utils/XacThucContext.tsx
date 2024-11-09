import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import {getIdUserByToken, isToken} from "./JwtService";

interface XacThucContextProps {
    children: React.ReactNode;
}

// Update context type to include userId
interface XacThucContextType {
    isLoggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    userId: number | null; // userId can be null if not logged in
}

// Create the authentication context
const XacThucContext = createContext<XacThucContextType | undefined>(undefined);

export const XacThucProvider: React.FC<XacThucContextProps> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(isToken());
    const [userId, setUserId] = useState<number | null>(null);

    // Update userId based on login status
    useEffect(() => {
        if (isLoggedIn) {
            const id = getIdUserByToken();
            setUserId(id);
        } else {
            setUserId(null);
        }
    }, [isLoggedIn]);

    return (
        <XacThucContext.Provider value={{ isLoggedIn, setLoggedIn, userId }}>
            {children}
        </XacThucContext.Provider>
    );
};

// Hook to use authentication context
export const useXacThuc = (): XacThucContextType => {
    const context = useContext(XacThucContext);
    if (!context) {
        throw new Error("useXacThuc must be used within XacThucProvider");
    }
    return context;
};
