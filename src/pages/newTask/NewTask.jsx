import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TodoistContext } from "../../context/TodoistContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import InputField from "../../componenten/InputField";
import { nanoid } from "nanoid";
import Loader from "../../componenten/Loader";

const NewTask = () => {
    const { user } = useContext(AuthContext);
    const { isLinked } = useContext(TodoistContext);
    const [task, setTask] = useState({
        title: "",
        dueDate: "",
        priority: "medium",
        category: "prive",
        checklist: [],
        reminderDate: ""
    });
    const [submitting, setSubmitting] = useState(false);

    // Automatische herinnering voor werk-taken
    useEffect(() => {
        if (task.category === "werk" && task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const reminderDate = new Date(dueDate);
            reminderDate.setDate(dueDate.getDate() - 2);
            setTask(prev => ({
                ...prev,
                reminderDate: reminderDate.toISOString().slice(0, 16)
            }));
        }
    }, [task.dueDate, task.category]);

    const handleChecklistChange = (index, value) => {
        const newChecklist = [...task.checklist];
        newChecklist[index] = { ...newChecklist[index], item: value };
        setTask({ ...task, checklist: newChecklist });
    };

    const addChecklistItem = () => {
        setTask({
            ...task,
            checklist: [...task.checklist, { item: "", completed: false }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const taskData = {
                ...task,
                userId: user.uid,
                createdAt: new Date().toISOString(),
                completed: false,
                ...(task.category !== "werk" && { dueDate: null, reminderDate: null }),
                ...((task.category !== "boodschappen" && task.category !== "huishouden") && { checklist: [] })
            };

            if (isLinked) {
                alert('Todoist-integratie komt binnenkort!');
            } else {
                await setDoc(doc(db, "localTasks", nanoid()), taskData);
                setTask({
                    title: "",
                    dueDate: "",
                    priority: "medium",
                    category: "prive",
                    checklist: [],
                    reminderDate: ""
                });
                alert("Taak opgeslagen!");
            }
        } catch (error) {
            console.error("Opslagfout:", error);
            alert("Opslaan mislukt");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Nieuwe Taak</h2>
                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label>Categorie</label>
                        <select
                            value={task.category}
                            onChange={(e) => setTask({...task, category: e.target.value})}
                            className="input-field"
                            required
                        >
                            <option value="prive">Privé</option>
                            <option value="boodschappen">Boodschappen</option>
                            <option value="huishouden">Huishouden</option>
                            <option value="werk">Werk</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Titel</label>
                        <InputField
                            type="text"
                            value={task.title}
                            onChange={(e) => setTask({...task, title: e.target.value})}
                            required
                        />
                    </div>

                    {(task.category === "boodschappen" || task.category === "huishouden") && (
                        <div className="form-group">
                            <label>Checklist items</label>
                            {task.checklist.map((item, index) => (
                                <div key={index} className="checklist-item">
                                    <InputField
                                        type="text"
                                        value={item.item}
                                        onChange={(e) => handleChecklistChange(index, e.target.value)}
                                        placeholder="Item toevoegen"
                                        required
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addChecklistItem}
                                className="btn btn-secondary"
                            >
                                + Item toevoegen
                            </button>
                        </div>
                    )}

                    {task.category === "werk" && (
                        <div className="form-group">
                            <label>Deadline</label>
                            <InputField
                                type="datetime-local"
                                value={task.dueDate}
                                onChange={(e) => setTask({...task, dueDate: e.target.value})}
                                required
                            />
                            <p className="hint-text">
                                Automatische herinnering op: {task.reminderDate || 'Niet ingesteld'}
                            </p>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Prioriteit</label>
                        <div className="priority-select">
                            {['low', 'medium', 'high'].map((level) => (
                                <label key={level} className="priority-option">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={level}
                                        checked={task.priority === level}
                                        onChange={(e) => setTask({...task, priority: e.target.value})}
                                    />
                                    <span className="priority-label">{level}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? <Loader small /> : 'Taak opslaan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTask;