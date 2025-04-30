import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { nanoid } from "nanoid";

export const TodoistContext = createContext();

export const TodoistProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isLinked, setIsLinked] = useState(false);

    const redirectToTodoistOAuth = async () => {
        try {
            const state = nanoid(16);
            await setDoc(doc(db, "oauth_states", user.uid), { state });
            window.location.href = `https://todoist.com/oauth/authorize?client_id=d55dd65057de47d2b169cfefb010d605&scope=data:read_write,data:delete&state=${state}`;
        } catch (error) {
            console.error("OAuth redirect error:", error);
            alert("Er ging iets mis bij het doorverwijzen naar Todoist");
        }
    };

    const unlinkTodoist = async () => {
        try {
            await updateDoc(doc(db, "users", user.uid), {
                todoistToken: deleteField()
            });
            setIsLinked(false);
            alert("Todoist succesvol ontkoppeld");
        } catch (error) {
            console.error("Ontkoppelfout:", error);
            alert("Ontkoppelen mislukt");
        }
    };

    useEffect(() => {
        const checkLinkStatus = async () => {
            if(user) {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                setIsLinked(!!docSnap.data()?.todoistToken);
            }
        };
        checkLinkStatus();
    }, [user]);

    return (
        <TodoistContext.Provider value={{
            isLinked,
            redirectToTodoistOAuth,
            unlinkTodoist
        }}>
            {children}
        </TodoistContext.Provider>
    );
};