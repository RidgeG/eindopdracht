import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './componenten/Header';
import Footer from './componenten/Footer';
import Home from './pages/Home/Home';
import AllTasks from './pages/AllTasks/AllTask.jsx';
import NewTask from './pages/NewTask/NewTask';
import Profile from './pages/Profile/Profile';
import UpcomingTasks from './pages/upcomingTask/UpcomingTask.jsx';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import TodoistOAuthCallback from './pages/TodoistOAuthCallback/TodoistOAuthCallback';
import ProtectedRoute from './componenten/ProtectedRoute';
import './App.css';

function App() {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/todoist-oauth-callback" element={<TodoistOAuthCallback />} />

                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/alltasks" element={<ProtectedRoute><AllTasks /></ProtectedRoute>} />
                    <Route path="/upcomingtasks" element={<ProtectedRoute><UpcomingTasks /></ProtectedRoute>} />
                    <Route path="/newtask" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;