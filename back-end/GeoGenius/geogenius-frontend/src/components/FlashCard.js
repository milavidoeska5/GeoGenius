import React, { useState } from "react";

const FlashCard = ({ title, description }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="flashcard"
            onClick={() => setFlipped(!flipped)}
            style={{
                width: "240px",
                height: "160px",
                perspective: "1000px",
                cursor: "pointer"
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transition: "transform 0.6s",
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
            >
                {/* Front */}
                <div style={cardSideStyle("#dbeafe", "#0d1b2a")}>
                    <h4 style={{ fontWeight: "600", margin: 0 }}>{title}</h4>
                </div>

                {/* Back */}
                <div style={cardSideStyle("#dbeafe", "#0d1b2a", true)}>
                    <p style={{ fontSize: "14px", margin: 0 }}>{description}</p>
                </div>
            </div>
        </div>
    );
};

const cardSideStyle = (bg, color, back = false) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: bg,
    color: color,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    backfaceVisibility: "hidden",
    transform: back ? "rotateY(180deg)" : "none",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "sans-serif"
});

export default FlashCard;
