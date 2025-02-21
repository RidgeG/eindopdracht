import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoistContext } from "../../context/TodoistContext";

const TodoistOAuthCallback = () => {
    const navigate = useNavigate();
    const { exchangeCodeForToken } = useContext(TodoistContext);

    useEffect(() => {
        async function handleCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            if (code) {
                try {
                    await exchangeCodeForToken(code);
                    navigate("/home");
                } catch (error) {
                    console.error("Todoist OAuth fout:", error);
                }
            }
        }
        handleCallback();
    }, [exchangeCodeForToken, navigate]);

    return (
        <div className="page-container">
            <h2>Verwerken van Todoist authenticatie...</h2>
        </div>
    );
};

export default TodoistOAuthCallback;