import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import { TodoistProvider } from './context/TodoistContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ThemeContextProvider>
                <TodoistProvider>
                    <Router>
                        <App />
                    </Router>
                </TodoistProvider>
            </ThemeContextProvider>
        </AuthProvider>
    </StrictMode>
);