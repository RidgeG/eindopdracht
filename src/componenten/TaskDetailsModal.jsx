import React from "react";
import Modal from "./Modal";

const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <Modal isOpen={!!task} onClose={onClose}>
            <div className="task-details">
                <h3>{task.title}</h3>

                <div className="task-meta">
                    <p><strong>Categorie:</strong> {task.category}</p>
                    <p><strong>Prioriteit:</strong> {task.priority}</p>
                    <p><strong>Aangemaakt op:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                </div>

                {(task.category === "boodschappen" || task.category === "huishouden") && (
                    <div className="checklist-section">
                        <h4>Checklist</h4>
                        {task.checklist?.map((item, index) => (
                            <div key={index} className="checklist-item">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    readOnly
                                />
                                <span>{item.item}</span>
                            </div>
                        ))}
                    </div>
                )}

                {task.category === "werk" && (
                    <div className="deadline-section">
                        <p><strong>Deadline:</strong> {new Date(task.dueDate).toLocaleString()}</p>
                        <p><strong>Herinnering:</strong> {new Date(task.reminderDate).toLocaleString()}</p>
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