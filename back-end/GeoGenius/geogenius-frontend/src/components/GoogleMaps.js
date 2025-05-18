
import React, { useRef, useState } from "react";
import {
    GoogleMap as Map,
    useJsApiLoader,
    Marker,
    StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
    width: "80%",
    height: "750px",
    borderRadius: "16px",
    margin:"0 auto",

};

const defaultCenter = {
    lat: 41.9981,
    lng: 21.4254,
};

const GoogleMap = () => {
    const [center, setCenter] = useState(defaultCenter);
    const searchBoxRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const onPlacesChanged = () => {
        const places = searchBoxRef.current?.getPlaces();
        if (places && places.length > 0) {
            const location = places[0].geometry?.location;
            if (location) {
                setCenter({
                    lat: location.lat(),
                    lng: location.lng(),
                });
            }
        }
    };

    return isLoaded ? (
        <div
            className="p-4 mt-5 shadow-sm"
            style={{
                backgroundColor: "#fdf6e3",
                borderRadius: "16px",
                maxWidth: "100%",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
            }}
        >
            <h2 className="mb-3" style={{  color: "#2c3e50", fontWeight: "600", textAlign:"center", marginTop: "-10px" }}>
                Explore on Map
            </h2>

            <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Search places..."
                    className="form-control mb-3"
                    style={{
                        maxWidth: "400px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        padding: "10px 15px",
                        margin:"0 auto",
                        textAlign:"center",

                    }}
                />
            </StandaloneSearchBox>

            <Map mapContainerStyle={containerStyle} center={center} zoom={10}>
                <Marker position={center} />
            </Map>
        </div>
    ) : (
        <p className="text-center">Loading map...</p>
    );
};

export default React.memo(GoogleMap);