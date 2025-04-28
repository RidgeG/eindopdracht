import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoistContext } from "../../context/TodoistContext";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../componenten/Loader";

const TodoistOAuthCallback = () => {
    const navigate = useNavigate();
    const { exchangeCodeForToken } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                const state = params.get("state");
                const error = params.get("error");

                if (error) throw new Error(error);
                if (!code || !state || !user) throw new Error("Ongeldig verzoek");

                await exchangeCodeForToken(code, state);
                navigate("/profile?success=connected");

            } catch (error) {
                console.error("Callback fout:", error);
                navigate(`/profile?error=${encodeURIComponent(error.message)}`);
            }
        };

        handleCallback();
    }, [navigate, user, exchangeCodeForToken]);

    return <Loader message="Bezig met autoriseren..." />;
};

export default TodoistOAuthCallback;