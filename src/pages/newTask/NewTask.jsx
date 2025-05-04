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
        items: []
    });
    const [currentItem, setCurrentItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const taskData = {
                ...task,
                userId: user?.uid,
                createdAt: new Date().toISOString()
            };

            await addTask(taskData);
            setFeedback({
                type: 'success',
                message: `Taak "${task.title}" opgeslagen in ${isLinked ? 'Todoist' : 'lokale opslag'}!`
            });
            resetForm();
        } catch (error) {
            setFeedback({
                type: 'error',
                message: `Fout: ${error.message}`
            });
        } finally {
            setLoading(false);
            setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
        }
    };

    const validateForm = () => {
        if (!task.title.trim()) {
            setFeedback({ type: 'error', message: 'Titel is verplicht' });
            return false;
        }

        if (['werk', 'prive'].includes(task.category) && !task.dueDate) {
            setFeedback({ type: 'error', message: 'Deadline is verplicht voor deze categorie' });
            return false;
        }

        if (['boodschappen', 'huishouden'].includes(task.category) && task.items.length === 0) {
            setFeedback({ type: 'error', message: 'Voeg minimaal 1 item toe' });
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setTask({
            title: '',
            dueDate: '',
            category: 'prive',
            items: []
        });
        setCurrentItem('');
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Nieuwe Taak {isLinked && <span className="todoist-badge">Todoist</span>}</h2>

                {feedback.message && (
                    <div className={`feedback-banner ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Titel"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                    />

                    <div className="form-section">
                        <label>Categorie</label>
                        <div className="category-grid">
                            {['boodschappen', 'huishouden', 'werk', 'prive'].map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`category-btn ${task.category === category ? 'active' : ''} ${category}`}
                                    onClick={() => setTask({ ...task, category })}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {['boodschappen', 'huishouden'].includes(task.category) ? (
                        <div className="form-section">
                            <label>Items toevoegen</label>
                            <div className="item-input-group">
                                <input
                                    type="text"
                                    value={currentItem}
                                    onChange={(e) => setCurrentItem(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && currentItem.trim()) {
                                            setTask({ ...task, items: [...task.items, currentItem.trim()] });
                                            setCurrentItem('');
                                        }
                                    }}
                                    placeholder="Voeg item toe (Enter om toe te voegen)"
                                />
                                <div className="item-list">
                                    {task.items.map((item, index) => (
                                        <div key={index} className="item">
                                            <span>{item}</span>
                                            <button
                                                type="button"
                                                onClick={() => setTask({
                                                    ...task,
                                                    items: task.items.filter((_, i) => i !== index)
                                                })}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="form-section">
                            <InputField
                                type="datetime-local"
                                label="Deadline"
                                value={task.dueDate}
                                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? <Loader small /> : 'Taak Opslaan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTask;