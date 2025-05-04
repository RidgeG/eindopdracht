import React from 'react';
import { useTodoist } from '../../context/TodoistContext';


const ListsPage = () => {
    const { tasks } = useTodoist();

    const listCategories = ['boodschappen', 'huishouden'];
    const calendarCategories = ['werk', 'prive'];

    return (
        <div className="page-container">
            <h2>Lijsten</h2>

            <section className="list-section">
                <h3>Checklists</h3>
                <div className="lists-grid">
                    {listCategories.map((category) => {
                        const categoryTasks = tasks.filter(t => t.category === category);
                        return (
                            <article key={category} className="list-card">
                                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                {categoryTasks.length > 0 ? (
                                    <ul className="checklist">
                                        {categoryTasks.flatMap(t =>
                                            t.items?.map((item, i) => (
                                                <li key={`${t.id}-${i}`} className="checklist-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.completed}
                                                        readOnly
                                                    />
                                                    <span>{item}</span>
                                                </li>
                                            )) || []
                                        )}
                                    </ul>
                                ) : (
                                    <p className="empty-state">Geen items gevonden</p>
                                )}
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="calendar-section">
                <h3>Kalender taken</h3>
                <div className="calendar-categories">
                    {calendarCategories.map((category) => {
                        const categoryTasks = tasks.filter(t => t.category === category);
                        return (
                            <div key={category} className="category-block">
                                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                {categoryTasks.length > 0 ? (
                                    <ul className="calendar-list">
                                        {categoryTasks.map(task => (
                                            <li key={task.id} className="calendar-item">
                                                <div className="task-title">{task.title}</div>
                                                <div className="task-date">
                                                    {new Date(task.dueDate).toLocaleDateString('nl-NL', {
                                                        weekday: 'short',
                                                        day: 'numeric',
                                                        month: 'short'
                                                    })}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="empty-state">Geen taken gevonden</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default ListsPage;