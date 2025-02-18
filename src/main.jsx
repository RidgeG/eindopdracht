
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import {AuthContextProvider} from './context/AuthContext.jsx';
import {ThemeContextProvider} from './context/ThemeContext.jsx';
import { TrelloProvider } from './context/TrelloContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthContextProvider>
            <ThemeContextProvider>
                <TrelloProvider>
                    <Router>
                        <App />
                    </Router>
                </TrelloProvider>
            </ThemeContextProvider>
        </AuthContextProvider>
    </StrictMode>
);
