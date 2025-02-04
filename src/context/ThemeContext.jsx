
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {

    const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('appTheme', newTheme);
    }


    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
