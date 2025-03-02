import React, { useState, useContext } from 'react';
import { TodoistContext } from '../../context/TodoistContext.jsx';
import InputField from '../../componenten/InputField.jsx';

const NewTask = () => {
    const { createTask } = useContext(TodoistContext);
    const [category, setCategory] = useState("boodschappenlijst");
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [frequency, setFrequency] = useState("niet herhalen");
    const [message, setMessage] = useState("");

    async function handleAddTask() {
        if (dateTime) {
            const selectedDate = new Date(dateTime);
            const now = new Date();
            if (selectedDate < now) {
                setMessage("Datum is verstreken. Kies een toekomstige datum.");
                return;
            }
        }

        try {
            const description = `Categorie: ${category}\nFrequentie: ${frequency}`;
            const isoDue = dateTime && dateTime.trim() !== "" ? new Date(dateTime).toISOString() : "";
            const task = await createTask(name, isoDue, description);
            setMessage(`Taak '${task.content}' toegevoegd!`);
            setCategory("boodschappenlijst");
            setName("");
            setDateTime("");
            setFrequency("niet herhalen");
        } catch (error) {
            console.error("Fout bij toevoegen van taak:", error);
            setMessage("Fout bij toevoegen van taak.");
        }
    }

    return (
        <div className="page-container">
            <h2>Nieuwe Taak</h2>
            <div className="form-container new-task-form">
                <label>
                    Categorie:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="boodschappenlijst">Boodschappenlijst</option>
                        <option value="huishoudelijk">Huishoudelijk</option>
                        <option value="werk">Werk</option>
                        <option value="privé">Privé</option>
                    </select>
                </label>
                <label>
                    Naam:
                    <InputField
                        type="text"
                        placeholder="Naam"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Datum en Tijd:
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </label>
                <label>
                    Frequentie:
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="niet herhalen">Niet herhalen</option>
                        <option value="elke dag">Elke dag</option>
                        <option value="om de dag">Om de dag</option>
                        <option value="elke week">Elke week</option>
                        <option value="om de week">Om de week</option>
                        <option value="elke maand">Elke maand</option>
                    </select>
                </label>
                <button className="btn" onClick={handleAddTask}>Taak Toevoegen</button>
            </div>
            <p className="message">{message}</p>
        </div>
    );
};

export default NewTask;