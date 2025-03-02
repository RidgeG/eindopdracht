import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const TodoistContext = createContext();

export const TodoistProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    // Redirect-functie voor Todoist OAuth met directe waarden
    const redirectToTodoistOAuth = () => {
        const clientId = "d55dd65057de47d2b169cfefb010d605";
        const redirectUri = "http://localhost:3000/todoist-oauth-callback";
        const state = "secretstring"; // In productie genereer je een dynamische, veilige waarde
        const scopes = "task:add,data:read,data:read_write,data:delete,project:delete";
        const authUrl = `https://todoist.com/oauth/authorize?client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scopes)}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        console.log("Redirecting to Todoist OAuth URL:", authUrl);
        window.location.href = authUrl;
    };

    // Initialiseer de Todoist API als er een ingelogde gebruiker is
    useEffect(() => {
        if (user) {
            const token = localStorage.getItem("todoist_token");
            console.log("Todoist API Token:", token);
            if (token) {
                try {
                    const todoistApi = new TodoistApi(token);
                    setApi(todoistApi);
                    console.log("Todoist API geïnitialiseerd met gebruikersspecifieke token");
                } catch (err) {
                    console.error("Fout bij initialisatie van Todoist API:", err);
                }
            } else {
                console.error("Todoist API Token is undefined. Laat de gebruiker eerst via OAuth inloggen.");
                redirectToTodoistOAuth();
            }
        }
    }, [user]);

    const fetchTasks = useCallback(async () => {
        if (!api) {
            console.warn("Todoist API niet geïnitialiseerd bij fetchTasks");
            return;
        }
        try {
            const tasksResponse = await api.getTasks();
            console.log("Received tasks from Todoist:", tasksResponse);
            if (Array.isArray(tasksResponse)) {
                setTasks(tasksResponse);
            } else if (tasksResponse && Array.isArray(tasksResponse.results)) {
                setTasks(tasksResponse.results);
            } else {
                console.warn("Onverwachte taken-response:", tasksResponse);
                setTasks([]);
            }
        } catch (error) {
            console.error("Fout bij ophalen van Todoist taken:", error);
            setError(error);
        }
    }, [api]);

    useEffect(() => {
        if (api) {
            fetchTasks();
        }
    }, [api, fetchTasks]);

    const createTask = async (content, due_datetime, description) => {
        if (!api) throw new Error("Todoist API niet geïnitialiseerd");
        try {
            let isoDue = null;
            if (due_datetime && due_datetime.trim() !== "") {
                const dateObj = new Date(due_datetime);
                if (!isNaN(dateObj)) {
                    isoDue = dateObj.toISOString();
                }
            }
            const payload = { content, description };
            if (isoDue) payload.due_datetime = isoDue;
            const newTask = await api.addTask(payload);
            await fetchTasks();
            return newTask;
        } catch (error) {
            console.error("Fout bij het aanmaken van een Todoist taak:", error);
            throw error;
        }
    };

    // Token exchange functie voor Todoist OAuth, verstuurt form data zoals vereist
    const exchangeCodeForToken = async (code) => {
        try {
            const params = new URLSearchParams();
            params.append("client_id", "d55dd65057de47d2b169cfefb010d605");
            params.append("client_secret", "02640cb871ef4f1b89ae255df6f4b3b1");
            params.append("code", code);
            params.append("redirect_uri", "http://localhost:3000/todoist-oauth-callback");

            const response = await axios.post(
                "https://todoist.com/oauth/access_token",
                params,
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );
            console.log("Todoist token exchange response:", response.data);
            const newToken = response.data.access_token;
            if (!newToken) {
                throw new Error("Geen access token ontvangen");
            }
            localStorage.setItem("todoist_token", newToken);
            const todoistApi = new TodoistApi(newToken);
            setApi(todoistApi);
            return newToken;
        } catch (error) {
            console.error("Todoist token exchange fout:", error);
            throw error;
        }
    };

    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem("todoist_token");
            if (!token) throw new Error("Todoist token ontbreekt");
            const response = await axios.get("https://api.todoist.com/rest/v2/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Todoist user info:", response.data);
            return response.data;
        } catch (error) {
            console.error("Fout bij ophalen van Todoist user info:", error);
            throw error;
        }
    };

    return (
        <TodoistContext.Provider value={{
            api,
            tasks,
            fetchTasks,
            createTask,
            exchangeCodeForToken,
            getUserInfo,
            redirectToTodoistOAuth,
            error
        }}>
            {children}
        </TodoistContext.Provider>
    );
};

export default TodoistProvider;