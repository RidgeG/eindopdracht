import React, { useContext, useEffect, useState } from 'react';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import Loader from '../../componenten/Loader';

const AllTasks = () => {
    const [date, setDate] = useState(new Date());
    const { tasks: todoistTasks, isLinked, fetchTasks } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [localTasks, setLocalTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Haal taken op
    useEffect(() => {
        const loadTasks = async () => {
            try {
                if (isLinked) {
                    await fetchTasks();
                } else {
                    const q = query(collection(db, 'localTasks'), where('userId', '==', user.uid));
                    const snapshot = await getDocs(q);
                    setLocalTasks(snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        start: new Date(doc.data().dueDate),
                        end: new Date(doc.data().dueDate)
                    })));
                }
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, [isLinked, user?.uid]);

    // Formatteer events
    const events = (isLinked ? todoistTasks : localTasks).map(task => ({
        id: task.id,
        title: task.content || task.title,
        start: task.start || new Date(task.due?.datetime || task.dueDate),
        end: task.end || new Date(task.due?.datetime || task.dueDate)
    }));

    return (
        <div className="page-container">
            <h2>Overzicht (Maand)</h2>
            {loading ? (
                <Loader />
            ) : (
                <BigCalendarComponent
                    view="month"
                    date={date}
                    events={events}
                    onNavigate={setDate}
                />
            )}
        </div>
    );
};

export default AllTasks;