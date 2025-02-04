
import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    function decodeToken(token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Ongeldig token:", error);
            return null;
        }
    }

    function login(tokenFromServer) {
        localStorage.setItem('authToken', tokenFromServer);
        const decoded = decodeToken(tokenFromServer);
        setToken(tokenFromServer);
        setUser(decoded);
    }

    function logout() {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    }


    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('authToken');
        if (tokenFromStorage) {
            const decoded = decodeToken(tokenFromStorage);
            setToken(tokenFromStorage);
            setUser(decoded);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
