import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TodoistContext } from '../context/TodoistContext';
import Loader from '../componenten/Loader';

const ProfilePage = ({ onLogout }) => {
    const { user } = useContext(AuthContext);
    const {
        redirectToTodoistOAuth,
        isLinked,
        isLoading,
        error,
        fetchTasks
    } = useContext(TodoistContext);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const error = params.get('error');

        if (success) setStatus('Todoist succesvol gekoppeld! 🎉');
        if (error) setStatus(`Fout: ${decodeURIComponent(error)}`);
    }, []);

    return (
        <div className="page-container user-profile">
            <h2>Profiel</h2>
            {user && (
                <div className="profile-content">
                    <div className="user-info">
                        <p><strong>E-mail:</strong> {user.email}</p>
                        <p><strong>Laatste login:</strong> {new Date(user.metadata.lastLoginAt).toLocaleString()}</p>
                    </div>

                    <div className="sync-section">
                        <h3>Agenda Synchronisatie</h3>

                        {status && (
                            <div className={`status-message ${status.includes('🎉') ? 'success' : 'error'}`}>
                                {status}
                            </div>
                        )}

                        {!isLinked ? (
                            <button
                                className={`btn sync-button ${isLoading ? 'loading' : ''}`}
                                onClick={redirectToTodoistOAuth}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader small />
                                        <span>Bezig met verbinden...</span>
                                    </>
                                ) : (
                                    'Verbind met Todoist'
                                )}
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn sync-button"
                                    onClick={fetchTasks}
                                >
                                    Handmatig synchroniseren
                                </button>
                                <p className="sync-status">
                                    Laatste synchronisatie: {new Date().toLocaleTimeString()}
                                </p>
                            </>
                        )}

                        {error && <p className="error-message">{error}</p>}
                    </div>

                    <button
                        className="btn logout-button"
                        onClick={onLogout}
                    >
                        Uitloggen
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;