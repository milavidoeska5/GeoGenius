import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoGeniusService from "../repository/GeoGeniusService";
import Navbar from "../components/Navbar";

const ProposeCardPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        GeoGeniusService.proposeCard(title, description)
            .then(() => {
                setMessage(" Card successfully proposed! Awaiting admin approval.");
                setTitle("");
                setDescription("");
            })
            .catch(() => {
                setMessage(" Something went wrong. Please try again.");
            });
    };

    return (
        <div style={{ backgroundColor: "#fdf6e3", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
            <Navbar />

            <div className="container mt-5" style={{ maxWidth: "550px" }}>
                <button
                    onClick={() => navigate("/")}
                    className="btn btn-outline-secondary mb-3 rounded-3 fw-medium"
                >
                    ← Back
                </button>

                <div style={{
                    padding: "35px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                }}>
                    <h2 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "600" }}>
                        Propose a New Fun Fact
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="form-control rounded-3"
                                style={{ padding: "10px" }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={4}
                                className="form-control rounded-3"
                                style={{ padding: "10px", resize: "none" }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn rounded-3 w-100 fw-semibold"
                            style={{ backgroundColor: "#4f83cc", color: "white", padding: "10px" }}
                        >
                            Submit
                        </button>
                        {message && (
                            <p className="text-center mt-3 fw-medium" style={{ color: "#4f83cc" }}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProposeCardPage;
