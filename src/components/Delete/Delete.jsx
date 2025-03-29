import React, { useState } from 'react';
import "./Delete.css"
import axios from 'axios';


const Delete = ({ isOpen, onClose, onDelete, userId }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;


    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`https://reqres.in/api/users/${userId}`);
            
            if (response.status !== 204) { 
                throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
            }

            onDelete(userId);
            onClose();
        } catch (err) {
            setError(err.message);
            console.error("Delete Request Error:", err);
        } finally {
            setLoading(false);
        }
    };



  return (
    <div className='delete-overlay'>
        <div className="delete-popup">
            <h3>Do you want to permenantly delete the user</h3>
            {error && <p className="error-message">{error}</p>}
            <div className='delete-buttons'>
                <button className="cancel-btn" onClick={onClose} disabled={loading}>
                    Cancel
                </button>
                <button className="delete" onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Delete