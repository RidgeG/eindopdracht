import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import NewTask from './pages/newTask/NewTask.jsx';
import AllTask from './pages/allTasks/AllTask.jsx';
import Profile from './pages/profile/Profile.jsx';
import UpcomingTask from './pages/upcomingTask/UpcomingTask.jsx';
import Settings from './pages/settings/Settings.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import TodoistOAuth from './pages/todoistOAuth/TodoistOAuth.jsx';
import TodoistOAuthCallback from './pages/todoistOAuthCallback/TodoistOAuthCallback.jsx';
import ProtectedRoute from './componenten/ProtectedRoute.jsx';
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import Header from './componenten/Header.jsx';
import Footer from './componenten/Footer.jsx';
import './app.css';

function App() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { logout = () => {} } = useContext(AuthContext) || {};

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
                    <Route path="/todoist" element={<TodoistOAuth />} />
                    <Route path="/todoist-oauth-callback" element={<TodoistOAuthCallback />} />
                    {/* Protected routes */}
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/alltask" element={<ProtectedRoute><AllTask /></ProtectedRoute>} />
                    <Route path="/newtask" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
                    <Route path="/upcoming" element={<ProtectedRoute><UpcomingTask /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings onLogout={handleLogout} /></ProtectedRoute>} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;