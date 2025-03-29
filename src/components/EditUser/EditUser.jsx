import React, { useState } from "react";
import "./EditUser.css"
import axios from "axios";


const EditUser = ({ isOpen, onClose, onUpdate, user }) => {


    const [firstName, setFirstName] = useState(user?.first_name || "");
    const [lastName, setLastName] = useState(user?.last_name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    if (!isOpen) return null;



    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.put(`https://reqres.in/api/users/${user.id}`, {
                first_name: firstName,
                last_name: lastName,
                email
            });

            if (response.status !== 200) {
                throw new Error(`Failed to update user: ${response.status}`);
            }

            const updatedUser = {
                ...user,
                first_name: firstName,
                last_name: lastName,
                email
            };


            // Store updated user in localStorage
            const storedEditedUsers = JSON.parse(localStorage.getItem("editedUsers")) || {};
            storedEditedUsers[user.id] = updatedUser;
            localStorage.setItem("editedUsers", JSON.stringify(storedEditedUsers));

            
            onUpdate(updatedUser); // Pass updated data to parent
            onClose(); // Close the form
        } catch (err) {
            setError(err.message);
            console.error("Update Request Error:", err);
        } finally {
            setLoading(false);
        }
    };



  return (
    <div className="edit-popup">
        <div className="edit-content">
            <h2>Update the user</h2>
            <form>
                <div className="form-edit">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                        className="input-field"
                    />
                </div>
                <div className="form-edit">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                        className="input-field"
                    />
                </div>
                <div className="form-edit">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="input-field"
                    />
                </div>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
                <button className="cancel-btn" onClick={onClose} disabled={loading}>
                    Cancel
                </button>
                <button className="update-edit-btn" onClick={handleUpdate} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default EditUser