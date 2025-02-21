import React, { useContext, useState, useEffect } from 'react';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import { TodoistContext } from '../../context/TodoistContext';

const UpcomingTask = () => {
    const { tasks, fetchTasks } = useContext(TodoistContext);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);
    const upcomingTasks = tasks.filter(task => {
        if (task.due && task.due.datetime) {
            const taskDate = new Date(task.due.datetime);
            return taskDate >= now && taskDate <= oneWeekLater;
        }
        return false;
    });

    const events = upcomingTasks.map(task => ({
        id: task.id,
        title: task.content,
        start: new Date(task.due.datetime),
        end: new Date(task.due.datetime),
    }));

    return (
        <div className="page-container">
            <h2>Aankomende Taken (Weekoverzicht)</h2>
            <BigCalendarComponent
                view="week"
                date={date}
                events={events}
                onNavigate={(newDate) => setDate(newDate)}
            />
        </div>
    );
};

export default UpcomingTask;