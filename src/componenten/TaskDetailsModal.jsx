import React from "react";
import Modal from "./Modal";

const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <Modal isOpen={!!task} onClose={onClose}>
            <div className="task-details">
                <h3>{task.title}</h3>
                <p>
                    <strong>Start:</strong> {new Date(task.start).toLocaleString()}
                </p>
                <p>
                    <strong>Eind:</strong> {new Date(task.end).toLocaleString()}
                </p>
                <p>
                    <strong>Beschrijving:</strong> {task.description || "Geen beschrijving"}
                </p>
            </div>
        </Modal>
    );
};

export default TaskDetailsModal;