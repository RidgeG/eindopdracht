import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="header">
            <div className="header-left">
                <h1>ADHD Kalender</h1>
            </div>
            <div className="header-right">
                <nav className="nav">
                    <ul className="nav-list">
                        <li><button onClick={() => navigate("/home")}>Home</button></li>
                        <li><button onClick={() => navigate("/alltasks")}>Overzicht</button></li>
                        <li><button onClick={() => navigate("/upcomingtasks")}>Aankomend</button></li>
                        <li><button onClick={() => navigate("/newtask")}>Nieuwe Taak</button></li>
                        {user && (
                            <>
                                <li><button onClick={() => navigate("/profile")}>Profiel</button></li>
                                <li><button onClick={() => logout()}>Uitloggen</button></li>
                            </>
                        )}
                    </ul>
                </nav>
                <button
                    onClick={toggleTheme}
                    className="theme-toggle-btn"
                    aria-label="Thema wisselen"
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
};

export default Header;