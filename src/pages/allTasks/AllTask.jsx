import React, {useState, useEffect} from "react";
import axios from "axios";

async function fetchAllTask(callback) {
    const TRELLO_API_KEY = "je_api_key";
    const TRELLO_OAUTH_TOKEN = "je_oauth_token";
    const LIST_ID = "je_list_id";

    try{
        const response = await axios.get(`https://api.trello.com/1/lists/${LIST_ID}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_OAUTH_TOKEN}`);
        callback(response.data);
    } catch (error) {
        console.error("Fout bij het ophalen van de taken", error);
    }
}

function AllTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchAllTask(setTasks);
    }, []);


return (
    <div>
        <h2>Maandkalender</h2>
        <ul>
            {tasks.map((task) => (
                <li key={taks.id}>{taks.name}</li>
            ))}
        </ul>
    </div>
);

}

export default AllTasks;