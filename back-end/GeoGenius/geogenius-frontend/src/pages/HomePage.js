import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GeoGeniusService from "../repository/GeoGeniusService";
import FlashCard from "../components/FlashCard";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const [cards, setCards] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        GeoGeniusService.getApprovedCards()
            .then(res => setCards(res.data))
            .catch(err => console.error("Failed to fetch cards:", err));
    }, []);

    return (
        <div style={{ backgroundColor: "#fdf6e3", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
            <Navbar />
            <div className="container py-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <div>
                        <h1 style={{ color: "#2c3e50", fontWeight: "600" }}>Explore Fun Facts</h1>
                        <p style={{ fontSize: "18px", color: "#4f4f4f" }}>
                            Hello{user ? `, ${user.firstName}` : ""}! Discover interesting facts about Macedonia!
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/propose")}
                        className="btn rounded-3 px-4 py-2 fw-semibold mt-3 mt-md-0"
                        style={{ backgroundColor: '#4f83cc', color: 'white' }}
                    >
                        Propose a Card
                    </button>
                </div>

                {cards.length === 0 ? (
                    <p className="text-center text-muted">No cards available.</p>
                ) : (
                    <div className="d-flex flex-wrap justify-content-center" style={{ gap: "30px" }}>
                        {cards.map((card, index) => (
                            <div key={card.id} style={{ marginTop: `${index % 3 === 0 ? 0 : (index % 2 === 0 ? 20 : 10)}px` }}>
                                <FlashCard title={card.title} description={card.description} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
