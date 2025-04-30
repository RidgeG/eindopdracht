import React, { useContext, useEffect, useState } from 'react';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import Loader from '../../componenten/Loader';

const UpcomingTasks = () => {
    const [date, setDate] = useState(new Date());
    const { tasks, isLinked, fetchTasks } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [localTasks, setLocalTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Haal komende week op
    useEffect(() => {
        const loadData = async () => {
            try {
                if (isLinked) {
                    await fetchTasks();
                } else {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);

                    const q = query(
                        collection(db, "localTasks"),
                        where("userId", "==", user.uid),
                        where("dueDate", ">=", new Date().toISOString()),
                        where("dueDate", "<=", nextWeek.toISOString())
                    );

                    const querySnapshot = await getDocs(q);
                    setLocalTasks(querySnapshot.docs.map(doc => ({
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
        loadData();
    }, [isLinked, user?.uid]);

    // Formatteer events
    const events = (isLinked ? tasks : localTasks).map(task => ({
        id: task.id,
        title: task.content || task.title,
        start: task.start || new Date(task.due?.datetime || task.dueDate),
        end: task.end || new Date(task.due?.datetime || task.dueDate)
    }));

    return (
        <div className="page-container">
            <h2>Aankomende Taken (Week)</h2>
            {loading ? (
                <Loader />
            ) : (
                <BigCalendarComponent
                    view="week"
                    date={date}
                    events={events}
                    onNavigate={setDate}
                />
            )}
        </div>
    );
};

export default UpcomingTasks;