/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const axios = require("axios");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

exports.exchangeToken = onRequest({ cors: true }, async (req, res) => {
    cors(req, res, async () => {
        try {
            const { code, uid, state } = req.body;

            // Validatie
            if (!code || !uid || !state) {
                return res.status(400).json({ error: "Ontbrekende parameters" });
            }

            // State validatie
            const stateDoc = await admin.firestore().collection("oauth_states").doc(uid).get();
            if (!stateDoc.exists || stateDoc.data().state !== state) {
                return res.status(401).json({ error: "Ongeldige state parameter" });
            }

            // Verwijder state direct na gebruik
            await admin.firestore().collection("oauth_states").doc(uid).delete();

            // Todoist API call
            const params = new URLSearchParams();
            params.append("client_id", "d55dd65057de47d2b169cfefb010d605");
            params.append("client_secret", "5998eb9aea904cd595d121c421808437");
            params.append("code", code);
            params.append("redirect_uri",
                process.env.NODE_ENV === "production"
                    ? "https://kalenderapp94.web.app/todoist-oauth-callback"
                    : "http://localhost:5173/todoist-oauth-callback"
            );

            const response = await axios.post(
                "https://todoist.com/oauth/access_token",
                params.toString(),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            // Opslaan token
            await admin.firestore().collection("users").doc(uid).update({
                todoistToken: response.data.access_token,
            });

            res.status(200).json({ success: true });

        } catch (error) {
            console.error("Fout:", error.response?.data || error.message);
            res.status(500).json({
                error: "Interne serverfout",
                details: error.response?.data || error.message,
            });
        }
    });
});