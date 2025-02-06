
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwtToken"));


    function decodeToken(token) {
        try {
            return jwt_decode(token);
        } catch (error) {
            console.error("Ongeldig token:", error);
            return null;
        }
    }


    async function login(username, password) {
        try {
            const response = await axios.post(
                "https://api.datavortex.nl/users/authenticate",
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'kalenderapp:0m01WGvb06SMv1D1T658'
                    }
                }
            );


            const jwtToken = response.data.token;
            localStorage.setItem("jwtToken", jwtToken);
            setToken(jwtToken);
            const decodedUser = decodeToken(jwtToken);
            setUser(decodedUser);
        } catch (error) {
            console.error("Inloggen mislukt:", error);
            throw error;
        }
    }


    function logout() {
        localStorage.removeItem("jwtToken");
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
