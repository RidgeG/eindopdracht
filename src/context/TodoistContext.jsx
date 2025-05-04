import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoistContext = createContext();
const TODOIST_TOKEN = '22fbcdbc3d1f2fc655d7a2661c2a5cc7493cc293';

export const TodoistProvider = ({ children }) => {
    const [isLinked, setIsLinked] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const linked = localStorage.getItem('todoistLinked') === 'true';
        setIsLinked(linked);
        if (!linked) {
            const localTasks = JSON.parse(localStorage.getItem('localTasks') || '[]');
            setTasks(localTasks);
        }
    }, []);

    const toggleStorage = () => {
        const newState = !isLinked;
        setIsLinked(newState);
        localStorage.setItem('todoistLinked', newState.toString());
    };

    const getTasks = async () => {
        if (isLinked) {
            try {
                const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
                    headers: { Authorization: `Bearer ${TODOIST_TOKEN}` }
                });
                const data = await response.json();
                setTasks(data);
                return data;
            } catch (error) {
                console.error('Todoist error:', error);
            }
        }
        return tasks;
    };

    const addTask = async (task) => {
        if (isLinked) {
            try {
                const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TODOIST_TOKEN}`
                    },
                    body: JSON.stringify(task)
                });
                const newTask = await response.json();
                setTasks(prev => [...prev, newTask]);
                return newTask;
            } catch (error) {
                console.error('Todoist error:', error);
            }
        } else {
            const newTask = {
                ...task,
                id: Date.now(),
                createdAt: new Date().toISOString()
            };
            const updatedTasks = [...tasks, newTask];
            localStorage.setItem('localTasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            return newTask;
        }
    };

    return (
        <TodoistContext.Provider value={{ isLinked, tasks, toggleStorage, getTasks, addTask }}>
            {children}
        </TodoistContext.Provider>
    );
};

export const useTodoist = () => useContext(TodoistContext);