
import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import NewTask from './pages/NewTask/NewTask.jsx';
import Overview from './pages/allTasks/AllTask.jsx';
import Profile from './pages/Profile/Profile.jsx';
import UpcomingTask from './pages/UpcomingTask/UpcomingTask.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import ProtectedRoute from './componenten/ProtectedRoute.jsx';
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import Header from "./componenten/Header.jsx";
import Footer from "./componenten/Footer.jsx";

function App() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className={`app ${theme}`}>
            <Header navigate={navigate} toggleTheme={toggleTheme} />
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
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
