import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTodoist } from '../../context/TodoistContext';
import InputField from '../../componenten/InputField';
import Loader from '../../componenten/Loader';

const NewTask = () => {
    const { user } = useAuth();
    const { isLinked, addTask } = useTodoist();
    const [task, setTask] = useState({
        title: '',
        dueDate: '',
        category: 'prive',
        checklist: []
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const taskData = {
                content: task.title,
                due_date: task.dueDate,
                description: `Gemaakt door: ${user?.email}`
            };

            await addTask(isLinked ? taskData : {
                ...task,
                userId: user?.uid,
                createdAt: new Date().toISOString()
            });

            setFeedback(`Taak "${task.title} opgeslagen in ${isLinked ? 'Todoist' : 'lokale opslag'}!`);
            setTask({ title: '', dueDate: '', category: 'prive', checklist: [] });
        } catch (error) {
            setFeedback(`Fout: ${error.message}`);
        } finally {
            setLoading(false);
            setTimeout(() => setFeedback(''), 3000);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Nieuwe Taak {isLinked && "(Todoist)"}</h2>
                {feedback && <div className="feedback-banner">{feedback}</div>}

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Titel"
                        value={task.title}
                        onChange={e => setTask({ ...task, title: e.target.value })}
                        required
                    />

                    <div className="form-group">
                        <label>Deadline</label>
                        <InputField
                            type="datetime-local"
                            value={task.dueDate}
                            onChange={e => setTask({ ...task, dueDate: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <Loader small /> : 'Taak Opslaan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTask;