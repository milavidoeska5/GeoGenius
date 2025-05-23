import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GeoGeniusService from "../repository/GeoGeniusService";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        GeoGeniusService.login(username, password)
            .then(() => GeoGeniusService.getUserProfile())
            .then(res => {
                setUser(res.data);
                setError("");
                if (res.data.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            })
            .catch(() => {
                setError("Invalid username or password.");
            });
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fdf6e3' }}>
            <div className="row shadow-lg rounded-5 overflow-hidden" style={{ maxWidth: "1100px", minHeight: "600px", width: "100%", backgroundColor: '#fff' }}>

            {/* Left Illustration */}
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center" style={{ backgroundColor: '#dbeafe' }}>
                    <div className="text-center">
                        <img
                            src="/images/Logo.png"
                            alt="GeoGenius Logo"
                            className="img-fluid p-4"
                            style={{ maxWidth: '300px' }}
                        />
                    </div>
                </div>

                {/* Right Login Form */}
                <div className="col-12 col-md-6 p-5">
                    <h2 className="text-center fw-bold mb-1" style={{ color: '#0d1b2a' }}>Welcome back!</h2>
                    <p className="text-center text-muted mb-4">Please enter your details</p>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control rounded-3"
                                id="username"
                                placeholder="your_username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control rounded-3"
                                id="password"
                                placeholder="•••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="d-grid mb-3">
                            <button type="submit" className="btn rounded-3 py-2" style={{ backgroundColor: '#4f83cc', color: 'white', fontWeight: 'bold' }}>
                                Log In
                            </button>
                        </div>

                        <div className="text-center small text-muted">
                            Don’t have an account? <a href="/register" className="fw-semibold text-primary">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
