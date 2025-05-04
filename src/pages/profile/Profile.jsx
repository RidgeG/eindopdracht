import React, { useContext } from 'react';
import { useTodoist } from '../../context/TodoistContext';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import ProgressBar from '../../componenten/ProgressBar';
import Button from '../../componenten/Button';

const ProfilePage = () => {
    const { isLinked, toggleStorage, tasks } = useTodoist();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    // Berekeningen voor statistieken
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const uniqueCategories = new Set(tasks.map(t => t.category)).size;
    const storagePercentage = Math.min((totalTasks / (isLinked ? 300 : 100)) * 100, 100);

    return (
        <div className="page-container">
            {/* Profiel Header */}
            <div className="profile-header">
                <div className="user-avatar">
                    {user?.email[0].toUpperCase()}
                </div>
                <h1 className="user-email">{user?.email}</h1>
                <p className="account-age">
                    Lid sinds: {new Date(user?.metadata?.creationTime).toLocaleDateString('nl-NL')}
                </p>
            </div>

            {/* Profiel Grid */}
            <div className="profile-grid">
                {/* Account Sectie */}
                <div className="profile-card">
                    <h2 className="card-title">Account</h2>
                    <div className="card-content">
                        <div className="info-item">
                            <span>Laatste login:</span>
                            <span>
                                {new Date(user?.metadata?.lastSignInTime).toLocaleString('nl-NL')}
                            </span>
                        </div>
                        <div className="info-item">
                            <span>Account status:</span>
                            <span className="status-badge active">Actief</span>
                        </div>
                        <Button
                            onClick={logout}
                            className="logout-btn"
                            aria-label="Uitloggen"
                        >
                            Uitloggen
                        </Button>
                    </div>
                </div>

                {/* Opslag Sectie */}
                <div className="profile-card">
                    <h2 className="card-title">Opslag</h2>
                    <div className="card-content">
                        <ProgressBar percentage={storagePercentage} />
                        <div className="storage-info">
                            <span>{totalTasks} taken</span>
                            <span>{isLinked ? '300' : '100'} max</span>
                        </div>

                        {/* Todoist Koppeling */}
                        <div className="todoist-connection">
                            <div className={`status-indicator ${isLinked ? 'connected' : 'disconnected'}`} />
                            <div className="connection-info">
                                <span>Todoist: {isLinked ? 'Gekoppeld' : 'Niet gekoppeld'}</span>
                                <Button
                                    onClick={toggleStorage}
                                    variant="outline"
                                    className="connection-btn"
                                >
                                    {isLinked ? 'Ontkoppel' : 'Koppel nu'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weergave Sectie */}
                <div className="profile-card">
                    <h2 className="card-title">Weergave</h2>
                    <div className="card-content">
                        <div className="theme-switch">
                            <span>Donker thema:</span>
                            <label className="theme-toggle">
                                <input
                                    type="checkbox"
                                    checked={theme === 'dark'}
                                    onChange={toggleTheme}
                                />
                                <span className="toggle-slider" />
                            </label>
                        </div>
                        <div className="theme-preview">
                            <div className={`preview-box ${theme}`} />
                            <span>Huidig thema: {theme === 'light' ? 'Licht' : 'Donker'}</span>
                        </div>
                    </div>
                </div>

                {/* Statistieken Sectie */}
                <div className="profile-card">
                    <h2 className="card-title">Statistieken</h2>
                    <div className="card-content">
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-value">{totalTasks}</div>
                                <div className="stat-label">Totaal taken</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{completedTasks}</div>
                                <div className="stat-label">Voltooid</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{uniqueCategories}</div>
                                <div className="stat-label">Categorieën</div>
                            </div>
                        </div>
                        <div className="chart-placeholder">
                            <span>Taakverdeling per categorie</span>
                            <div className="chart-bars">
                                {['prive', 'werk', 'boodschappen', 'huishouden'].map(cat => (
                                    <div
                                        key={cat}
                                        className="chart-bar"
                                        style={{
                                            width: `${(tasks.filter(t => t.category === cat).length / totalTasks) * 100 || 0}%`,
                                            backgroundColor: `var(--${cat})`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;