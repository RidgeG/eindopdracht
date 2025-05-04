import React, { useContext } from 'react';
import { useTodoist } from '../../context/TodoistContext';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';

const AllTasks = () => {
    const { tasks } = useTodoist();

    return (
        <div className="page-container">
            <h2>Alle Taken</h2>
            <BigCalendarComponent
                events={tasks.map(task => ({
                    title: task.content || task.title,
                    start: new Date(task.due?.date || task.dueDate),
                    end: new Date(task.due?.date || task.dueDate)
                }))}
                view="month"
            />
        </div>
    );
};

export default AllTasks;