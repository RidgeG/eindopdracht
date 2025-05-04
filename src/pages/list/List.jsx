import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTodoist } from '../../context/TodoistContext';
import Loader from '../../componenten/Loader';

const ListsPage = () => {
    const { user } = useAuth();
    const { tasks } = useTodoist();
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userTasks = tasks.filter(task =>
            task.userId === user?.uid &&
            ["boodschappen", "huishouden"].includes(task.category)
        );

        const grouped = userTasks.reduce((acc, task) => {
            const category = task.category;
            if (!acc[category]) acc[category] = [];
            acc[category].push(task);
            return acc;
        }, {});

        setLists(Object.entries(grouped));
        setLoading(false);
    }, [tasks, user]);

    return (
        <div className="page-container">
            <h1>Mijn Lijsten</h1>
            {loading ? <Loader /> : (
                <div className="lists-grid">
                    {lists.map(([category, items]) => (
                        <div key={category} className="list-card">
                            <h2>{category} ({items.length})</h2>
                            <ul>
                                {items.map(item => (
                                    <li key={item.id}>{item.content || item.title}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListsPage;