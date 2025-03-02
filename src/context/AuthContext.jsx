import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { DATAVORTEX_CONFIG } from "../config";

function isValidJWT(token) {
    return typeof token === "string" && token.split(".").length === 3;
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const stored = localStorage.getItem("jwtToken");
        return isValidJWT(stored) ? stored : null;
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
            const lowerUserName = username.trim().toLowerCase();
            if (!lowerUserName) {
                throw new Error("Gebruikersnaam is leeg");
            }
            console.log("Inloggen met:", lowerUserName);


            const authResponse = await axios.post(
                `https://api.datavortex.nl/${DATAVORTEX_CONFIG.APPLICATION_NAME}/users/authenticate`,
                { username: lowerUserName, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": DATAVORTEX_CONFIG.API_KEY,
                    },
                }
            );

            const jwtToken = authResponse.data.jwt;
            if (!jwtToken || !isValidJWT(jwtToken)) {
                throw new Error("Invalid token received");
            }
            localStorage.setItem("jwtToken", jwtToken);
            setToken(jwtToken);


            const userResponse = await axios.get(
                `https://api.datavortex.nl/${DATAVORTEX_CONFIG.APPLICATION_NAME}/users/${lowerUserName}/info`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": DATAVORTEX_CONFIG.API_KEY,
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setUser(userResponse.data);
            console.log("Gebruikersinformatie opgehaald:", userResponse.data);
        } catch (error) {
            console.error("Inloggen mislukt:", error);
            localStorage.removeItem("jwtToken");
            setToken(null);
            setUser(null);
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
};

export default AuthContext;