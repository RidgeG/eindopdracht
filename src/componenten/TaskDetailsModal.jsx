import React from 'react';
import Modal from './Modal';

const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <Modal isOpen={!!task} onClose={onClose}>
            <div className="task-details">
                <h3>{task.title}</h3>
                <div className="task-meta">
                    <p><strong>Categorie:</strong> {task.category}</p>
                    {task.dueDate && (
                        <p><strong>Deadline:</strong> {new Date(task.dueDate).toLocaleString()}</p>
                    )}
                </div>

                {task.checklist?.length > 0 && (
                    <div className="checklist-section">
                        <h4>Checklist</h4>
                        {task.checklist.map((item, index) => (
                            <div key={index} className="checklist-item">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    readOnly
                                />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                )}

                <button className="btn btn-secondary" onClick={onClose}>
                    Sluiten
                </button>
            </div>
        </Modal>
    );
};

export default TaskDetailsModal;