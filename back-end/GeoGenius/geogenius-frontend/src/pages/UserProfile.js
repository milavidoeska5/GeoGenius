import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import GeoGeniusService from "../repository/GeoGeniusService";
import Navbar from "../components/Navbar";

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    if (!user) return <p className="text-center mt-5">Loading profile...</p>;

    const handleChangePassword = (e) => {
        e.preventDefault();
        GeoGeniusService.changePassword(oldPassword, newPassword)
            .then(() => {
                setMessage(" Password changed successfully.");
                setOldPassword("");
                setNewPassword("");
                setShowPasswordForm(false);
            })
            .catch(() => {
                setMessage(" Failed to change password. Please try again.");
            });
    };

    return (
        <div style={{ backgroundColor: "#fdf6e3", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
            <Navbar />
            <div style={{
                maxWidth: "500px",
                margin: "60px auto",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
            }}>
                <h2 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "600" }}>
                    Your Profile
                </h2>
                <div style={{ lineHeight: "1.8", fontSize: "16px", marginBottom: "30px" }}>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                <button onClick={() => setShowPasswordForm(true)} style={buttonStyle}>
                    Change Password
                </button>
            </div>

            {showPasswordForm && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <h4 className="text-center mb-3" style={{ color: "#2c3e50", fontWeight: "600" }}>
                            Change Password
                        </h4>
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="password"
                                placeholder="Old password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={inputStyle}
                            />
                            <button type="submit" style={{ ...buttonStyle, marginBottom: "10px" }}>
                                Confirm
                            </button>
                            <button type="button" onClick={() => setShowPasswordForm(false)} style={rejectBtn}>
                                Cancel
                            </button>
                        </form>
                        {message && <p className="text-center mt-3" style={{ color: "#4f83cc" }}>{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
};

const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4f83cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

const rejectBtn = {
    ...buttonStyle,
    backgroundColor: "#f44336"
};

const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
};

const modalContent = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    fontFamily: "'Poppins', sans-serif"
};

export default UserProfile;
