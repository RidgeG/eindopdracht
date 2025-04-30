import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TodoistContext } from "../context/TodoistContext";
import Loader from "../componenten/Loader";

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const { isLinked, redirectToTodoistOAuth, unlinkTodoist } = useContext(TodoistContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user) setLoading(false);
    }, [user]);

    if(loading) return <Loader />;

    return (
        <div className="profile-page container">
            <div className="profile-card card">
                <div className="profile-header">
                    <div className="avatar">
                        {user.email[0].toUpperCase()}
                    </div>
                    <h1>{user.email}</h1>
                    <p>Lid sinds: {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <h3>{user.taskCount || 0}</h3>
                        <p>Taken</p>
                    </div>
                    <div className="stat-item">
                        <h3>{user.completedTasks || 0}</h3>
                        <p>Voltooid</p>
                    </div>
                </div>

                <div className="profile-actions">
                    <button
                        onClick={isLinked ? unlinkTodoist : redirectToTodoistOAuth}
                        className={`btn ${isLinked ? 'btn-danger' : 'btn-success'}`}
                        disabled={loading}
                    >
                        {isLinked ? 'Todoist ontkoppelen' : 'Todoist koppelen'}
                    </button>
                    <button onClick={logout} className="btn btn-primary">
                        Uitloggen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;