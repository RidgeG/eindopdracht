import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function Header({ toggleTheme }) {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <h1>ADHD Kalender</h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li><button onClick={() => navigate('/')}>Home</button></li>
                    <li><button onClick={() => navigate('/newtask')}>Nieuwe Taak</button></li>
                    <li><button onClick={() => navigate('/overview')}>Overzicht</button></li>
                    {user ? (
                        <>
                            <li><button onClick={() => navigate('/profile')}>Profiel</button></li>
                            <li><button onClick={() => navigate('/upcoming')}>Aankomende Taak</button></li>
                            <li><button onClick={() => navigate('/settings')}>Instellingen</button></li>
                            <li><button onClick={() => { logout(); navigate('/login'); }}>Uitloggen</button></li>
                        </>
                    ) : (
                        <>
                            <li><button onClick={() => navigate('/login')}>Inloggen</button></li>
                            <li><button onClick={() => navigate('/register')}>Registreren</button></li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="theme-toggle">
                <button onClick={toggleTheme}>Toggle Thema</button>
            </div>
        </header>
    );
}

export default Header;
