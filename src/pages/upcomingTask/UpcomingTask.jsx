import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalculateDate from '../../componenten/calculateDate.jsx';

async function fetchUpcomingTask(callback) {
    const TRELLO_API_KEY = "https://api-uk.cronofy.com";
    const TRELLO_OAUTH_TOKEN = "je_oauth_token";
    const LIST_ID = "je_list_id";
    try {
        const response = await axios.get(`https://api.trello.com/1/lists/${LIST_ID}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_OAUTH_TOKEN}`);
        const tasks = response.data;
        const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        callback(sortedTasks[0]);
    } catch (error) {
        console.error("Fout bij ophalen van aankomende taak:", error);
    }
}

function UpcomingTask() {
    const [task, setTask] = useState(null);

    useEffect(() => {
        fetchUpcomingTask(setTask);
    }, []);

    return (
        <div className="upcomingTask">
            <h2>Aankomende Taak</h2>
            {task ? (
                <div>
                    <h3>{task.name}</h3>
                    <p>Datum: <CalculateDate date={task.dueDate} /></p>
                    <p>Beschrijving: {task.desc}</p>
                </div>
            ) : (
                <p>Geen aankomende taak gevonden.</p>
            )}
        </div>
    );
}

export default UpcomingTask;