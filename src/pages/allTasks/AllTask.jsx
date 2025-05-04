import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import Loader from '../../componenten/Loader';

const AllTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = () => {
            try {
                const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const userTasks = allTasks.filter(task => task.userId === user?.uid);
                setTasks(userTasks.map(task => ({
                    ...task,
                    start: new Date(task.dueDate),
                    end: new Date(task.dueDate)
                })));
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, [user]);

    return (
        <div className="page-container">
            <h2>Alle Taken</h2>
            {loading ? <Loader /> : <BigCalendarComponent events={tasks} />}
        </div>
    );
};

export default AllTasks;