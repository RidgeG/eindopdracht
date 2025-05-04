import React, { useContext } from 'react';
import { useTodoist } from '../../context/TodoistContext';

const ProfilePage = () => {
    const { isLinked, toggleStorage } = useTodoist();

    return (
        <div className="page-container">
            <h1>Profielinstellingen</h1>
            <div className="storage-toggle">
                <p>Huidige opslag: {isLinked ? 'Todoist' : 'Lokaal'}</p>
                <button onClick={toggleStorage} className="btn btn-secondary">
                    Schakel naar {isLinked ? 'Lokaal' : 'Todoist'}
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;