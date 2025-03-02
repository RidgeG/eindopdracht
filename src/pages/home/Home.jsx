import React, { useEffect, useState, useContext } from 'react';
import BigCalendarComponent from '../../componenten/BigCalendarComponent.jsx';
import { TodoistContext } from '../../context/TodoistContext';

const Home = () => {
    const [date, setDate] = useState(new Date());
    const { tasks, fetchTasks } = useContext(TodoistContext);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const events = tasks
        .map(task => {
            if (task.due && task.due.datetime) {
                return {
                    id: task.id,
                    title: task.content,
                    start: new Date(task.due.datetime),
                    end: new Date(task.due.datetime),
                };
            }
            return null;
        })
        .filter(event => event !== null);

    const handleSelectEvent = (arg) => {
        alert(`Datum: ${arg.start.toLocaleDateString()}`);
    };

    return (
        <div className="page-container">
            <h2>Vandaag</h2>
            <BigCalendarComponent
                view="day"
                date={date}
                events={events}
                onSelectEvent={handleSelectEvent}
                onNavigate={(newDate) => setDate(newDate)}
            />
        </div>
    );
};

export default Home;