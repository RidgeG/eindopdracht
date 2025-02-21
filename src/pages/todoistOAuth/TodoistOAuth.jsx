import React from "react";
import { TODOIST_CONFIG } from "../../config.js";

const TodoistOAuth = () => {
    const handleTodoistLogin = () => {
        const authUrl = `https://todoist.com/oauth/authorize?client_id=${TODOIST_CONFIG.CLIENT_ID}&scope=task:add,data:read,data:read_write,data:delete,project:delete&redirect_uri=${encodeURIComponent(TODOIST_CONFIG.OAUTH_REDIRECT_URI)}`;
        window.location.href = authUrl;
    };

    return (
        <div className="page-container">
            <h2>Inloggen met Todoist</h2>
            <button className="btn" onClick={handleTodoistLogin}>
                Verbind Todoist
            </button>
        </div>
    );
};

export default TodoistOAuth;