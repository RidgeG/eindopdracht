import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_BASE = '/api';
const API_KEY = 'kalenderapp:0m01WGvb06SMv1D1T658';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error('Token invalid:', error);
                localStorage.removeItem('authToken');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE}/users/login`, { email, password }, {
                headers: { 'X-Api-Key': API_KEY }
            });
            localStorage.setItem('authToken', response.data.token);
            setUser(jwtDecode(response.data.token));
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (email, password) => {
        try {
            await axios.post(`${API_BASE}/users/register`, { email, password }, {
                headers: { 'X-Api-Key': API_KEY }
            });
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);