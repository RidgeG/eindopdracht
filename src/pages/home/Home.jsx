import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTodoist } from '../../context/TodoistContext';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import Loader from '../../componenten/Loader';

const Home = () => {
    const { user } = useAuth();
    const { tasks } = useTodoist();
    const [isInitialized, setIsInitialized] = useState(false);


    const todayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate || task.createdAt);
        return taskDate.toDateString() === new Date().toDateString();
    });


    useEffect(() => {
        if (tasks.length > 0 && !isInitialized) {
            setIsInitialized(true);
        }
    }, [tasks, isInitialized]);

    return (
        <div className="home-container">
            <h2>Welkom {user?.email}</h2>
            <h3>Taken voor vandaag</h3>

            <div className="auto-fetch-container">
                {!isInitialized && (
                    <div className="loading-overlay">
                        <Loader />
                    </div>
                )}

                <BigCalendarComponent
                    view="day"
                    events={todayTasks.map(task => ({
                        title: task.title,
                        start: new Date(task.dueDate || task.createdAt),
                        end: new Date(task.dueDate || task.createdAt),
                        className: task.category
                    }))}
                />
            </div>
        </div>
    );
};

export default Home;