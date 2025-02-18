import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { DATAVORTEX_CONFIG } from '../config';

function isValidJWT(token) {
    return typeof token === 'string' && token.split('.').length === 3;
}

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [token, setToken] = useState(() => {
        const stored = localStorage.getItem("jwtToken");
        if (isValidJWT(stored)) return stored;
        localStorage.removeItem("jwtToken");
        return null;
    });
    const [user, setUser] = useState(null);

    function decodeToken(token) {
        try {
            if (!isValidJWT(token)) {
                throw new Error("Token is not a valid JWT");
            }
            return jwtDecode(token);
        } catch (error) {
            console.error("Ongeldig token:", error);
            return null;
        }
    }

    async function login(username, password) {
        try {
            const lowerUserName = username.toLowerCase();
            console.log("Inloggen met:", lowerUserName);
            const response = await axios.post(
                `https://api.datavortex.nl/${DATAVORTEX_CONFIG.APPLICATION_NAME}/users/authenticate`,
                { username: lowerUserName, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': DATAVORTEX_CONFIG.API_KEY
                    }
                }
            );

            const jwtToken = response.data.jwt;
            if (!jwtToken || !isValidJWT(jwtToken)) {
                throw new Error("Invalid token received");
            }
            localStorage.setItem("jwtToken", jwtToken);
            setToken(jwtToken);
            const decodedUser = decodeToken(jwtToken);
            setUser(decodedUser);
            console.log("Inloggen succesvol, gebruiker:", decodedUser);
        } catch (error) {
            console.error("Inloggen mislukt:", error);
            throw error;
        }
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("cronofy_access_token");
        localStorage.removeItem("trello_access_token");
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        if (token) {
            const decoded = decodeToken(token);
            setUser(decoded);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
