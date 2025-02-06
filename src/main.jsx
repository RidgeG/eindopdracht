
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import {AuthContextProvider} from './context/AuthContext.jsx';
import ThemeContextProvider from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthContextProvider>
            <ThemeContextProvider>
                <Router>
                    <App />
                </Router>
            </ThemeContextProvider>
        </AuthContextProvider>
    </StrictMode>
);
