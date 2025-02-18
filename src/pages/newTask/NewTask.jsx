// src/pages/NewTask.jsx
import React, { useState, useContext } from 'react';
import InputField from '../../componenten/InputField.jsx';
import { TrelloContext } from '../../context/TrelloContext.jsx';

function NewTask() {
    const [taskName, setTaskName] = useState('');
    const [message, setMessage] = useState('');
    const { createCard } = useContext(TrelloContext);

    async function handleAddTask() {
        try {
            const card = await createCard(taskName);
            setMessage(`Taak '${card.name}' toegevoegd!`);
            setTaskName('');
        } catch (error) {
            setMessage("Fout bij toevoegen van taak.");
        }
    }

    return (
        <div className="page-container">
            <h2>Nieuwe Taak</h2>
            <InputField
                type="text"
                placeholder="Taaknaam"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button className="btn" onClick={handleAddTask}>Toevoegen</button>
            <p className="message">{message}</p>
        </div>
    );
}

export default NewTask;
