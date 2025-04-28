import React, { useState, useEffect, useContext } from 'react';
import BigCalendarComponent from '../../componenten/BigCalendarComponent';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loader from '../../componenten/Loader';
import { Link } from 'react-router-dom';

const Home = () => {
    const [date, setDate] = useState(new Date());
    const { tasks, isLinked, fetchTasks } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [localTasks, setLocalTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocalTasks = async () => {
            try {
                const q = query(
                    collection(db, "localTasks"),
                    where("userId", "==", user.uid),
                    where("dueDate", ">=", new Date().toISOString())
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
            <h2>Vandaag</h2>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {!isLinked && (
                        <div className="info-banner">
                            <p>
                                Gebruikt lokale opslag.
                                <Link to="/profile"> Koppel Todoist</Link> voor synchronisatie.
                            </p>
                        </div>
                    )}
                    <BigCalendarComponent
                        view="day"
                        date={date}
                        events={events}
                        onNavigate={setDate}
                    />
                </>
            )}
        </div>
    );
};

export default Home;