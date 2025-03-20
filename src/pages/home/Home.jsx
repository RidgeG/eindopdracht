import React, {useEffect, useState} from "react";
import axios from "axios";


const CRONOFY_ACCESS_TOKEN = "je_access_token";
const CRONOFY_CALENDAR_ID = "je_calendar_id";

async function fetchCalendarEvents(setTasks) {
    try {
        const response = await axios.get(`https://api.cronofy.com/v1/events`, {
            headers: { Authorization: `Bearer ${CRONOFY_ACCESS_TOKEN}` }
        });
        setTasks(response.data.events);
    } catch (error) {
        console.error("Fout bij ophalen van evenementen:", error);
    }
}

function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchCalendarEvents(setTasks);
    }, []);



    return (
        <div>
            <h2>Weekoverzicht</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.event_id}>{task.summary} - {task.start}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;