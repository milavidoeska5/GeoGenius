import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GeoGeniusService from "../repository/GeoGeniusService";

const AdminNavbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        GeoGeniusService.logout()
            .then(() => {
                setUser(null);
                navigate("/login");
            })
            .catch(err => console.error("Logout failed:", err));
    };

    return (
        <div className="d-flex justify-content-center py-3" style={{ backgroundColor: "#fdf6e3" }}>
            <nav
                className="d-flex justify-content-between align-items-center px-4 py-2 w-100 shadow-sm"
                style={{
                    maxWidth: "1200px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    border: "1px solid #e3e3e3",
                    fontFamily: "'Poppins', sans-serif"
                }}
            >
                <div className="d-flex align-items-center">
                    <img
                        src="/images/Logo.png"
                        alt="GeoGenius"
                        width="45"
                        className="me-2"
                    />
                    <h5 className="fw-bold mb-0" style={{ color: "#4f83cc" }}>GeoGenius</h5>
                </div>

                {user && (
                    <button
                        onClick={handleLogout}
                        className="btn btn-danger rounded-pill fw-semibold px-4"
                    >
                        Logout
                    </button>
                )}
            </nav>
        </div>
    );
};

export default AdminNavbar;
