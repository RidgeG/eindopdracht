import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { AuthContext } from './AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, functions } from '../../firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { nanoid } from 'nanoid';

export const TodoistContext = createContext();

export const TodoistProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [api, setApi] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLinked, setIsLinked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const exchangeToken = httpsCallable(functions, 'todoistOAuthHandler');

    // Fetch taken van Todoist API
    const fetchTasks = useCallback(async () => {
        if (!api) return;
        try {
            setIsLoading(true);
            const tasks = await api.getTasks();
            setTasks(tasks);
            setError(null);
        } catch (error) {
            setError("Kon taken niet ophalen: " + error.message);
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    }, [api]);

    const redirectToTodoistOAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            const state = nanoid(12);
            await setDoc(doc(db, "oauth_states", user.uid), {
                state,
                timestamp: new Date()
            });

            window.location.href =
                `https://todoist.com/oauth/authorize?client_id=d55dd65057de47d2b169cfefb010d605&scope=data:read_write&state=${state}&redirect_uri=http://localhost:5173/todoist-oauth-callback`;
        } catch (error) {
            setError("Kon niet verbinden met Todoist: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    // Token exchange handler
    const exchangeCodeForToken = useCallback(async (code, state) => {
        try {
            const stateDoc = await getDoc(doc(db, "oauth_states", user.uid));
            if (!stateDoc.exists() || stateDoc.data().state !== state) throw new Error("Ongeldige state");

            const { data: { access_token } } = await exchangeToken({ code });
            await setDoc(doc(db, "users", user.uid), { todoistToken: access_token }, { merge: true });

            setApi(new TodoistApi(access_token));
            setIsLinked(true);
        } catch (error) {
            throw new Error("Autorisatie mislukt: " + error.message);
        }
    }, [user, exchangeToken]);

    // Initialiseer API bij mount
    useEffect(() => {
        const initializeApi = async () => {
            if (!user) return;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().todoistToken) {
                try {
                    const apiInstance = new TodoistApi(userDoc.data().todoistToken);
                    await apiInstance.getProjects(); // Test connectie
                    setApi(apiInstance);
                    setIsLinked(true);
                } catch (error) {
                    console.error("Ongeldig token:", error);
                    setIsLinked(false);
                }
            }
        };
        initializeApi();
    }, [user]);

    return (
        <TodoistContext.Provider value={{
            api,
            tasks,
            isLoading,
            error,
            isLinked,
            fetchTasks,
            redirectToTodoistOAuth,
            exchangeCodeForToken
        }}>
            {children}
        </TodoistContext.Provider>
    );
};