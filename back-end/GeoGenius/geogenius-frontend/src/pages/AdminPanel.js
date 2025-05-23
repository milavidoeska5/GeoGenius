import React, { useEffect, useState } from "react";
import GeoGeniusService from "../repository/GeoGeniusService";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanel = () => {
    const [pendingCards, setPendingCards] = useState([]);
    const [confirmRejectId, setConfirmRejectId] = useState(null);

    useEffect(() => {
        loadPendingCards();
    }, []);

    const loadPendingCards = () => {
        GeoGeniusService.getPendingCards()
            .then(res => setPendingCards(res.data))
            .catch(err => console.error("Failed to load pending cards:", err));
    };

    const handleApprove = (id) => {
        GeoGeniusService.approveCard(id).then(loadPendingCards);
    };

    const handleReject = (id) => {
        setConfirmRejectId(id);
    };

    const confirmReject = (id) => {
        GeoGeniusService.rejectCard(id).then(() => {
            setConfirmRejectId(null);
            loadPendingCards();
        });
    };

    return (
        <div style={{ backgroundColor: "#fdf6e3", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
            <AdminNavbar />

            <div className="container py-5">
                <h1 className="text-center fw-semibold mb-5" style={{ color: "#4f4f4f" }}>
                    Pending Cards
                </h1>

                {pendingCards.length === 0 ? (
                    <p className="text-center text-muted">No pending cards.</p>
                ) : (
                    <div
                        className="d-flex flex-wrap justify-content-center"
                        style={{ gap: "25px" }}
                    >
                        {pendingCards.map((card) => (
                            <div
                                key={card.id}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
                                    padding: "25px",
                                    width: "100%",
                                    maxWidth: "360px"
                                }}
                            >
                                <h5 className="fw-bold mb-2">{card.title}</h5>
                                <p className="text-muted">{card.description}</p>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button onClick={() => handleApprove(card.id)} style={approveBtn}>
                                        Approve
                                    </button>

                                    {confirmRejectId === card.id ? (
                                        <div className="d-flex gap-2">
                                            <button onClick={() => confirmReject(card.id)} style={approveBtn}>
                                                Yes
                                            </button>
                                            <button onClick={() => setConfirmRejectId(null)} style={rejectBtn}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => handleReject(card.id)} style={rejectBtn}>
                                            Reject
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const approveBtn = {
    padding: "8px 16px",
    backgroundColor: "#4f83cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

const rejectBtn = {
    ...approveBtn,
    backgroundColor: "#f44336"
};

export default AdminPanel;
