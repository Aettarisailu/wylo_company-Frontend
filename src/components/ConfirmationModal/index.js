import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Are you sure you want to delete this post?</h2>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="delete-button">Delete Permanently</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
