import React, { useState, useEffect, useContext } from 'react';
import BigCalendar from '../../componenten/BigCalendarComponent.jsx';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import TaskDetailsModal from '../../componenten/TaskDetailsModal';
import Loader from '../../componenten/Loader';

const AllTasks = () => {
    const [date, setDate] = useState(new Date());
    const { tasks: todoistTasks, isLinked, fetchTasks } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [localTasks, setLocalTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(true);

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
                        due: { datetime: doc.data().dueDate }
                    })));
                }
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, [isLinked, user.uid, fetchTasks]);

    if (loading) return <Loader />;

    return (
        <div className="page-container">
            <h2>Alle Taken</h2>
            <BigCalendar
                events={isLinked ? todoistTasks : localTasks}
                onSelectEvent={setSelectedTask}
                date={date}
                onNavigate={setDate}
                view="month"
            />
            {selectedTask && <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
        </div>
    );
};

export default AllTasks;