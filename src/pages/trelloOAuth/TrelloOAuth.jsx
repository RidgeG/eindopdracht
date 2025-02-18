import React from "react";
import { TRELLO_CONFIG } from "../../config.js";


function TrelloOAuth() {
    const handleTrelloLogin = () => {
        const authUrl = `https://trello.com/1/authorize?expiration=never&name=${encodeURIComponent(
            TRELLO_CONFIG.APP_NAME
        )}&scope=read,write&response_type=token&key=${TRELLO_CONFIG.API_KEY}&return_url=${encodeURIComponent(TRELLO_CONFIG.RETURN_URL)}`;
        window.location.href = authUrl;
    };

    return (
        <div className="page-container">
            <h2>Inloggen met Trello</h2>
            <button className="btn" onClick={handleTrelloLogin}>Verbind Trello</button>
        </div>
    );
}

export default TrelloOAuth;