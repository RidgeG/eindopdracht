import React, { useState, useContext } from 'react';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import InputField from '../../componenten/InputField';
import { useNavigate } from 'react-router-dom';
import Loader from '../../componenten/Loader';

const NewTask = () => {
    const { createTask, isLinked, isLoading } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);
    const [taskData, setTaskData] = useState({ title: '', dueDate: '', description: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validatie
            if (!taskData.title.trim()) throw new Error('Taaknaam is verplicht');
            if (!taskData.dueDate) throw new Error('Deadline is verplicht');

            // Notificatie permissie check
            if (Notification.permission !== "granted") {
                await Notification.requestPermission();
            }

            // Opslaan taak
            if (isLinked) {
                await createTask({
                    content: taskData.title,
                    due: { datetime: taskData.dueDate },
                    description: taskData.description
                });
            } else {
                await setDoc(doc(db, 'localTasks', `${user.uid}_${Date.now()}`), {
                    ...taskData,
                    userId: user.uid,
                    createdAt: new Date().toISOString()
                });
            }

            // Notificatie
            if (Notification.permission === "granted") {
                new Notification("Taak aangemaakt", {
                    body: `${taskData.title} - ${new Date(taskData.dueDate).toLocaleDateString()}`
                });
            }

            navigate('/home');
        } catch (error) {
            setMessage(error.message);
            console.error("Opslaan mislukt:", error);
        }
    };

    return (
        <div className="page-container">
            <h2>Nieuwe Taak</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Taaknaam *"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                />
                <InputField
                    type="datetime-local"
                    label="Deadline *"
                    value={taskData.dueDate}
                    onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                />
                <div className="form-group">
                    <label>Beschrijving</label>
                    <textarea
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn" disabled={isLoading}>
                    {isLoading ? <Loader small /> : 'Opslaan'}
                </button>
                {message && <p className="error-message">{message}</p>}
            </form>
        </div>
    );
};

export default NewTask;