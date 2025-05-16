import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoGeniusService from "../repository/GeoGeniusService";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        GeoGeniusService.register(
            formData.firstName,
            formData.lastName,
            formData.username,
            formData.email,
            formData.password
        ).then(() => {
            setSuccess("Registration successful. Redirecting...");
            setError("");
            setTimeout(() => navigate("/login"), 1500);
        }).catch(() => {
            setSuccess("");
            setError("Registration failed. Try again.");
        });
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fdf6e3' }}>
            <div className="row shadow-lg rounded-5 overflow-hidden" style={{ maxWidth: "1100px", minHeight: "620px", width: "100%", backgroundColor: "#fff" }}>
                {/* Left Logo */}
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center" style={{ backgroundColor: '#dbeafe' }}>
                    <div className="text-center">
                        <img
                            src="/images/Logo.png"
                            alt="GeoGenius Logo"
                            className="img-fluid p-3"
                            style={{ maxWidth: '300px' }}
                        />
                        <h5 className="mt-3 fw-bold" style={{ color: '#0d1b2a' }}>GEOGENIUS</h5>
                    </div>
                </div>

                {/* Right Form */}
                <div className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center">
                    <h2 className="text-center fw-bold mb-1" style={{ color: '#0d1b2a' }}>Sign up</h2>
                    <p className="text-center text-muted mb-4">Create your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control rounded-3"
                                    placeholder="Your name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control rounded-3"
                                    placeholder="Your surname"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control rounded-3"
                                placeholder="your_username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control rounded-3"
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control rounded-3"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        {success && <div className="alert alert-success py-2">{success}</div>}

                        <div className="d-grid mb-3">
                            <button type="submit" className="btn rounded-3 py-2" style={{ backgroundColor: '#4f83cc', color: 'white', fontWeight: 'bold' }}>
                                Register
                            </button>
                        </div>

                        <div className="text-center small text-muted">
                            Already have an account? <a href="/login" className="fw-semibold text-primary">Log in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
