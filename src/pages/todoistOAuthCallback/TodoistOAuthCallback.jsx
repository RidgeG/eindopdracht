import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoistContext } from "../../context/TodoistContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const TodoistOAuthCallback = () => {
    const navigate = useNavigate();
    const { exchangeCodeForToken, getUserInfo } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function handleCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            const state = urlParams.get("state"); // Je kunt de state controleren indien gewenst
            if (code) {
                try {
                    await exchangeCodeForToken(code);
                    const todoistUser = await getUserInfo();
                    console.log("Todoist user:", todoistUser);
                    if (
                        todoistUser.email &&
                        user &&
                        user.email &&
                        todoistUser.email.toLowerCase() !== user.email.toLowerCase()
                    ) {
                        setError("Het Todoist account komt niet overeen met het geregistreerde e-mailadres.");
                        return;
                    }
                    navigate("/home");
                } catch (err) {
                    console.error("Todoist OAuth fout:", err);
                    setError("Todoist OAuth fout: " + err.message);
                }
            } else {
                setError("Geen autorisatiecode ontvangen");
            }
        }
        handleCallback();
    }, [exchangeCodeForToken, getUserInfo, navigate, user]);

    return (
        <div className="page-container">
            <h2>Verwerken van Todoist authenticatie...</h2>
            {error && <p className="message">{error}</p>}
        </div>
    );
};

export default TodoistOAuthCallback;