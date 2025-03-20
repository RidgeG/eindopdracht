
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function Header() {
    const navigate = useNavigate();
    const { toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    return (
        <header style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
            <nav>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
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
            <div style={{ marginTop: '10px' }}>
                <button onClick={toggleTheme}>Toggle Thema</button>
            </div>
        </header>
    );
}

export default Header;
