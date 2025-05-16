import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GeoGeniusService from "../repository/GeoGeniusService";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
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
                className="navbar navbar-expand-lg shadow-sm px-4 py-2 w-100"
                style={{
                    maxWidth: "95%",
                    backgroundColor: "#fdf6e3",
                    borderRadius: "20px",
                    border: "1px solid #e3e3e3",
                    padding: "50px 40px"
                }}
            >
                <div className="container-fluid px-0">
                    <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ color: "#4f83cc", fontSize: "24px" }}>
                        <img
                            src="/images/Logo.png"
                            alt="GeoGenius"
                            width="60"
                            height="60"
                            className="me-2"

                        />
                        GeoGenius
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                        <ul className="navbar-nav align-items-center gap-2">
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold text-dark" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold text-dark" to="/learn">Learn More</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold text-dark" to="/game">Game</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold text-dark" to="/profile">Profile</Link>
                            </li>
                            {user && (
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger rounded-pill px-3 fw-semibold"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
