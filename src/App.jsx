import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import NewTask from './pages/newTask/NewTask.jsx';
import Overview from './pages/allTasks/AllTask.jsx';
import Profile from './pages/profile/Profile.jsx';
import UpcomingTask from './pages/upcomingTask/UpcomingTask.jsx';
import Settings from './pages/settings/Settings.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import OAuthCallback from './pages/oAuthCallback/OAuthCallback.jsx';
import TrelloOAuth from './pages/trelloOAuth/TrelloOAuth.jsx';
import TrelloOAuthCallback from './pages/trelloOAuthCallback/TrelloOAuthCallback.jsx';
import ProtectedRoute from './componenten/ProtectedRoute.jsx';
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import Header from './componenten/Header.jsx';
import Footer from './componenten/Footer.jsx';
import './app.css';

function App() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { logout } = useContext(AuthContext);

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className={`app ${theme}`}>
            <Header toggleTheme={toggleTheme} />
            <main className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/oauth-callback" element={<OAuthCallback />} />
                    <Route path="/trello" element={<TrelloOAuth />} />
                    <Route path="/trello-callback" element={<TrelloOAuthCallback />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/newtask" element={<NewTask />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/upcoming" element={<UpcomingTask />} />
                    <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
