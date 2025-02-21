import { createContext, useState, useEffect, useCallback } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { TODOIST_CONFIG } from "../config";

export const TodoistContext = createContext();

export const TodoistProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Initializeer de Todoist API zodra het token beschikbaar is
    useEffect(() => {
        console.log("Todoist API Token:", TODOIST_CONFIG.API_TOKEN);
        if (TODOIST_CONFIG.API_TOKEN) {
            try {
                const todoistApi = new TodoistApi(TODOIST_CONFIG.API_TOKEN);
                setApi(todoistApi);
                console.log("Todoist API geïnitialiseerd");
            } catch (err) {
                console.error("Fout bij initialisatie van Todoist API:", err);
            }
        } else {
            console.error("Todoist API Token is undefined");
        }
    }, []);

    // Fetch tasks maar alleen als api beschikbaar is
    const fetchTasks = useCallback(async () => {
        if (!api) {
            console.warn("Todoist API niet geïnitialiseerd bij fetchTasks");
            return;
        }
        try {
            const tasks = await api.getTasks();
            setTasks(tasks);
        } catch (error) {
            console.error("Fout bij ophalen van Todoist taken:", error);
            setError(error);
        }
    }, [api]);

    // Zorg ervoor dat fetchTasks opnieuw wordt uitgevoerd zodra de API beschikbaar is
    useEffect(() => {
        if (api) {
            fetchTasks();
        }
    }, [api, fetchTasks]);

    const createTask = async (content, due_datetime, description) => {
        if (!api) throw new Error("Todoist API niet geïnitialiseerd");
        try {
            const newTask = await api.addTask({
                content,
                due_datetime,
                description,
            });
            await fetchTasks();
            return newTask;
        } catch (error) {
            console.error("Fout bij het aanmaken van een Todoist taak:", error);
            throw error;
        }
    };

    return (
        <TodoistContext.Provider value={{ api, tasks, fetchTasks, createTask, error }}>
            {children}
        </TodoistContext.Provider>
    );
};

export default TodoistProvider;