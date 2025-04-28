import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Header = ({ toggleTheme }) => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="header-left">
                <h1>ADHD Kalender</h1>
            </div>
            <div className="header-right">
                <nav className="nav">
                    <ul className="nav-list">
                        <li>
                            <button onClick={() => navigate("/home")}>Home</button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/alltask")}>Overzicht</button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/newtask")}>Nieuwe Taak</button>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <button onClick={() => navigate("/profile")}>Profiel</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/upcoming")}>Aankomende Taken</button>
                                </li>
                                <li>
                                    <button
                                        className="logout-button"
                                        onClick={() => {
                                            logout();
                                            navigate("/login");
                                        }}
                                    >
                                        Uitloggen
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button onClick={() => navigate("/login")}>Inloggen</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate("/register")}>Registreren</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="theme-toggle">
                    <button onClick={toggleTheme}>Toggle Thema</button>
                </div>
            </div>
        </header>
    );
};

export default Header;