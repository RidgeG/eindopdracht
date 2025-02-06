import React, { useState } from 'react';
import axios from 'axios';
import inputField from "../../componenten/InputField.jsx";
import InputField from "../../componenten/InputField.jsx";

const TRELLO_API_KEY = "je_api_key";
const TRELLO_OAUTH_TOKEN = "je_oauth_token";
const LIST_ID = "je_list_id";

async function createTaskOnTrello(taskName, callback) {
    try {
        const response = await axios.post(`https://api.trello.com/1/cards`, {
            name: taskName,
            idList: LIST_ID,
            key: TRELLO_API_KEY,
            token: TRELLO_OAUTH_TOKEN
        });
        callback(response.data);
    } catch (error) {
        console.error("Fout bij toevoegen van taak:", error);
    }
}

function NewTask() {
    const [taskName, setTaskName] = useState('');
    const [message, setMessage] = useState('');

    async function handleAddTask() {
        await createTaskOnTrello(taskName, (data) => {
            setMessage(`Taak '${data.name}' toegevoegd!`);
        });
        setTaskName('');
    }

    return (
        <div>
            <h2>Nieuwe Taak</h2>
            <InputField>
                type="text"
                placeholder="Taaknaam"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            </InputField>

            <button onClick={handleAddTask}>Toevoegen</button>
            <p>{message}</p>
        </div>
    );
}

export default NewTask;