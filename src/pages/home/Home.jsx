import React, {useEffect, useState} from "react";
import axios from "axios";
import { CRONOFY_CONFIG} from "../../config.js";
import CalculateDate from "../../componenten/calculateDate.jsx";

async function fetchCalendarEvents(setTasks) {
    try {
        const accessToken = localStorage.getItem("cronofy_access_token");
        if (!accessToken) {
            console.error("Geen Cronofy access token gevonden.");
            return;
        }
        const response = await axios.get(`${CRONOFY_CONFIG.API_HOST}/v1/events`, {
            headers: { Authorization: `Bearer ${accessToken}` }
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
        <div className="page-container">
            <h2>Weekoverzicht</h2>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.event_id}>
                        {task.summary} - <CalculateDate date={task.start} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;