export default async function handler(req, res) {
    // Sta alleen POST-verzoeken toe
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: "Missing 'code' parameter" });
    }

    try {
        // Bouw de URL-gecodeerde form data
        const params = new URLSearchParams();
        params.append("client_id", "d55dd65057de47d2b169cfefb010d605");
        params.append("client_secret", "02640cb871ef4f1b89ae255df6f4b3b1");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:3000/todoist-oauth-callback");

        // Verstuur de POST-request naar de Todoist OAuth access token endpoint
        const response = await fetch("https://todoist.com/oauth/access_token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
        });

        if (!response.ok) {
            const errorData = await response.text();
            return res.status(response.status).json({ error: errorData });
        }

        const data = await response.json();
        // Geef de verkregen data door aan de frontend
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error exchanging code:", error);
        return res.status(500).json({ error: error.message });
    }
}