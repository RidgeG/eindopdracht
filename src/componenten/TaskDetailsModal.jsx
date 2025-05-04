import React from 'react';
import Modal from './Modal';

const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="task-details">
                <h3>{task.title}</h3>
                <p><strong>Deadline:</strong> {new Date(task.dueDate).toLocaleString()}</p>
                {task.checklist?.length > 0 && (
                    <div className="checklist">
                        <h4>Checklist:</h4>
                        {task.checklist.map((item, index) => (
                            <div key={index} className="checklist-item">
                                <input type="checkbox" checked={item.completed} readOnly />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TaskDetailsModal;