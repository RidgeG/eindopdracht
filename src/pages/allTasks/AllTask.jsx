import React, { useState, useEffect, useContext } from 'react';
import BigCalendarComponent from '../../componenten/BigCalendarComponent.jsx';
import { TodoistContext } from '../../context/TodoistContext';
import TaskDetailsModal from '../../componenten/TaskDetailsModal.jsx';

const AllTask = () => {
    const [date, setDate] = useState(new Date());
    const { tasks, fetchTasks } = useContext(TodoistContext);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const events = safeTasks.map(task => {
        if (task.due && task.due.datetime) {
            return {
                id: task.id,
                title: task.content,
                start: new Date(task.due.datetime),
                end: new Date(task.due.datetime),
                description: task.description
            };
        }
        return null;
    }).filter(event => event !== null);

    const [selectedTask, setSelectedTask] = useState(null);

    const handleSelectEvent = (event) => {
        setSelectedTask(event);
    };

    return (
        <div className="page-container">
            <h2>Maandoverzicht</h2>
            <BigCalendarComponent
                view="month"
                date={date}
                events={events}
                onSelectEvent={handleSelectEvent}
                onNavigate={(newDate) => setDate(newDate)}
            />
            {selectedTask && (
                <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}
        </div>
    );
};

export default AllTask;