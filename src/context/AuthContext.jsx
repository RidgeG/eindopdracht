import React, { createContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import {doc, getDoc, setDoc} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setUser({ ...user, ...userDoc.data() });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const emailSignUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                createdAt: new Date().toISOString(),
                todoistToken: null,
                taskCount: 0,
                completedTasks: 0
            });
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const emailSignIn = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, emailSignUp, emailSignIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};