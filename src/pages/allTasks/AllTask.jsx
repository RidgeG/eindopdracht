import React, { useContext, useState, useEffect } from 'react';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import { TodoistContext } from '../../context/TodoistContext';

const AllTask = () => {
    const { tasks, fetchTasks } = useContext(TodoistContext);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const events = tasks.map(task => {
        if (task.due && task.due.datetime) {
            return {
                id: task.id,
                title: task.content,
                start: new Date(task.due.datetime),
                end: new Date(task.due.datetime),
            };
        }
        return null;
    }).filter(event => event !== null);

    return (
        <div className="page-container">
            <h2>Maandoverzicht</h2>
            <BigCalendarComponent
                view="month"
                date={date}
                events={events}
                onNavigate={(newDate) => setDate(newDate)}
            />
        </div>
    );
};

export default AllTask;