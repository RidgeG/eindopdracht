import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cronofy from 'cronofy';
import { CRONOFY_CONFIG } from '../../config.js';
function OAuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function exchangeCodeForToken() {
            console.log("Current URL:", window.location.href);

            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            console.log("Received authorization code:", code);

            if (!code) {
                console.warn("Geen autorisatiecode gevonden in de URL; gebruik standaard test tokens.");

                localStorage.setItem("cronofy_access_token", CRONOFY_CONFIG.DEFAULT_ACCESS_TOKEN);
                localStorage.setItem("cronofy_refresh_token", CRONOFY_CONFIG.DEFAULT_REFRESH_TOKEN);
                navigate("/home");
                return;
            }


            const cronofyClient = new Cronofy({
                client_id: CRONOFY_CONFIG.CLIENT_ID,
                client_secret: CRONOFY_CONFIG.CLIENT_SECRET,
                data_center: 'uk'
            });

            const options = {
                code,
                redirect_uri: CRONOFY_CONFIG.REDIRECT_URI
            };

            try {
                const tokenResponse = await cronofyClient.requestAccessToken(options);
                console.log("Token response:", tokenResponse);

                const { access_token, refresh_token } = tokenResponse;
                if (!access_token || typeof access_token !== 'string') {
                    throw new Error("Invalid access token received");
                }

                localStorage.setItem("cronofy_access_token", access_token);
                if (refresh_token && typeof refresh_token === 'string') {
                    localStorage.setItem("cronofy_refresh_token", refresh_token);
                }
                console.log("Cronofy tokens opgeslagen:", { access_token, refresh_token });
                navigate("/home");
            } catch (error) {
                console.error("Fout bij het ophalen van het Cronofy access token:", error);
            }
        }

        exchangeCodeForToken();
    }, [navigate]);

    return <div className="page-container">Verwerken van Cronofy authenticatie...</div>;
}

export default OAuthCallback;