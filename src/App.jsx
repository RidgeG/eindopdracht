// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../src/componenten/Header';
import Footer from '../src/componenten/Footer';
import Home from './pages/Home/Home.jsx';
import AllTasks from './pages/AllTasks/AllTask.jsx';
import NewTask from './pages/NewTask/NewTask.jsx';
import Profile from './pages/Profile/Profile.jsx';
import UpcomingTasks from './pages/upcomingTask/UpcomingTask.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import TodoistOAuthCallback from './pages/TodoistOAuthCallback/TodoistOAuthCallback.jsx';
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
                                <Route path="/newtask" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
                                <Route path="/upcomingtasks" element={<ProtectedRoute><UpcomingTasks /></ProtectedRoute>} />
                                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
    );
}

export default App;