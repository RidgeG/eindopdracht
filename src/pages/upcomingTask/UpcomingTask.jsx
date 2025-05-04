import React, { useEffect, useState, useContext } from 'react';
import { useTodoist } from '../../context/TodoistContext';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import Loader from '../../componenten/Loader';

const UpcomingTasks = () => {
    const { tasks, getTasks } = useTodoist();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            await getTasks();
            setLoading(false);
        };
        loadTasks();
    }, [getTasks]);

    return (
        <div className="page-container">
            <h2>Aankomende Taken</h2>
            {loading ? <Loader /> : (
                <BigCalendarComponent
                    view="week"
                    events={tasks.map(task => ({
                        title: task.content || task.title,
                        start: new Date(task.due?.date || task.createdAt),
                        end: new Date(task.due?.date || task.createdAt)
                    }))}
                />
            )}
        </div>
    );
};

export default UpcomingTasks;