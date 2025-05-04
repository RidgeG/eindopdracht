import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTodoist } from '../../context/TodoistContext';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import Loader from '../../componenten/Loader';

const Home = () => {
    const { user } = useAuth();
    const { tasks, getTasks } = useTodoist();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            await getTasks();
            setLoading(false);
        };
        loadTasks();
    }, [getTasks]);

    const todayTasks = tasks.filter(task => {
        const taskDate = new Date(task.due?.date || task.createdAt);
        return taskDate.toDateString() === new Date().toDateString();
    });

    return (
        <div className="page-container">
            <h2>Welkom {user?.email}</h2>
            <h3>Vandaag</h3>
            {loading ? <Loader /> : (
                <BigCalendarComponent
                    view="day"
                    events={todayTasks.map(task => ({
                        title: task.content || task.title,
                        start: new Date(task.due?.date || task.createdAt),
                        end: new Date(task.due?.date || task.createdAt)
                    }))}
                />
            )}
        </div>
    );
};

export default Home;