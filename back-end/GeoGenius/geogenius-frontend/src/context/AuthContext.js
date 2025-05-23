import { createContext, useState, useEffect } from "react";
import GeoGeniusService from "../repository/GeoGeniusService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
            setLoading(false);
            return;
        }

        GeoGeniusService.getUserProfile()
            .then(res => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
