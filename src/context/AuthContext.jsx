import React, { createContext, useState, useEffect, useRef } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const inactivityTimerRef = useRef(null);

    // Automatic logout na 2 uur inactiviteit
    const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(async () => {
            try {
                if (user) {
                    await signOut(auth);
                    setUser(null);
                }
            } catch (error) {
                console.error("Automatisch uitloggen mislukt:", error);
            }
        }, 7200000); // 2 uur in ms
    };

    // Voeg activity listeners toe
    useEffect(() => {
        if (!user) return;

        const activities = ['mousemove', 'keydown', 'click'];
        const resetTimer = () => resetInactivityTimer();

        activities.forEach(event => window.addEventListener(event, resetTimer));
        return () => activities.forEach(event => window.removeEventListener(event, resetTimer));
    }, [user]);

    // Auth state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) resetInactivityTimer();
        });
        return unsubscribe;
    }, []);

    // Google Login handler
    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.message };
        }
    };

    // Logout handler
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, message: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};