import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TrelloOAuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get("token");

        if (token) {
            localStorage.setItem("trello_access_token", token);
            navigate("/home");
        } else {
            console.error("Geen Trello token gevonden.");
        }
    }, [navigate]);

    return <div className="page-container">Verwerken van Trello authenticatie...</div>;
}

export default TrelloOAuthCallback;