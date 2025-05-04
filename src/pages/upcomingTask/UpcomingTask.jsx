import React, { useContext } from 'react';
import { useTodoist } from '../../context/TodoistContext';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';

const UpcomingTasks = () => {
    const { tasks } = useTodoist();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingTasks = tasks.filter(task =>
        new Date(task.dueDate) > new Date() &&
        new Date(task.dueDate) <= nextWeek
    );

    return (
        <div className="page-container">
            <h2>Aankomende Taken</h2>
            <BigCalendarComponent
                events={upcomingTasks.map(task => ({
                    title: task.title,
                    start: new Date(task.dueDate),
                    end: new Date(task.dueDate)
                }))}
                view="week"
            />
        </div>
    );
};

export default UpcomingTasks;