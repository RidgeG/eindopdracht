import React from "react";

const TodoistOAuth = () => {
    const handleTodoistLogin = () => {
        window.location.href = `https://todoist.com/oauth/authorize?client_id=d55dd65057de47d2b169cfefb010d605&scope=data:read_write,data:delete&state=secretstring`;
    };

    return (
        <div className="page-container">
            <h2>Verbind Todoist</h2>
            <button className="btn" onClick={handleTodoistLogin}>
                Todoist Account Koppelen
            </button>
        </div>
    );
};

export default TodoistOAuth;