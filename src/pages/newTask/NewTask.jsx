import React, { useState } from 'react';
import axios from 'axios';

const TRELLO_API_KEY = "je_api_key";
const TRELLO_OAUTH_TOKEN = "je_oauth_token";
const LIST_ID = "je_list_id";

function NewTask() {
    const [taskName, setTaskName] = useState('');

    async function addTask() {
        await axios.post(`https://api.trello.com/1/cards`, {
            name: taskName,
            idList: LIST_ID,
            key: TRELLO_API_KEY,
            token: TRELLO_OAUTH_TOKEN
        });
        setTaskName('');
    }

    return (
        <div>
            <h2>Nieuwe Taak</h2>
            <input type="text" placeholder="Taaknaam" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <button onClick={addTask}>Toevoegen</button>
        </div>
    );
}

export default NewTask;