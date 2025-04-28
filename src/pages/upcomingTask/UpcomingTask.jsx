import React, { useContext, useEffect, useState } from 'react';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loader from '../../componenten/Loader';
import { Link } from 'react-router-dom';

const UpcomingTask = () => {
    const { tasks, isLinked, fetchTasks } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [localTasks, setLocalTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocalTasks = async () => {
            try {
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
                    due: { datetime: doc.data().dueDate }
                })));
            } catch (error) {
                console.error("Fout bij ophalen taken:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isLinked) {
            fetchTasks().finally(() => setLoading(false));
        } else {
            fetchLocalTasks();
        }
    }, [isLinked, user.uid, fetchTasks]);

    const events = (isLinked ? tasks : localTasks)
        .filter(task => task?.due?.datetime)
        .map(task => ({
            id: task.id,
            title: task.content || task.title,
            start: new Date(task.due.datetime),
            end: new Date(task.due.datetime)
        }));

    return (
        <div className="page-container">
            <h2>Aankomende Taken</h2>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {!isLinked && (
                        <div className="info-banner">
                            <p>
                                Toont lokale taken.
                                <Link to="/profile"> Koppel Todoist</Link> voor uitgebreide planning.
                            </p>
                        </div>
                    )}
                    <BigCalendarComponent
                        view="week"
                        date={new Date()}
                        events={events}
                    />
                </>
            )}
        </div>
    );
};

export default UpcomingTask;