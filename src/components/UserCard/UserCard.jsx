import React, { useState } from "react";
import "./UserCard.css"
import Delete from "../Delete/Delete";
import EditUser from "../EditUser/EditUser";

const UserCard = ({ user, handleUserDelete, handleUserUpdate }) => {

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userData] = useState(user);

  if (!user) {
    return <div className="card">User data is loading...</div>;
  }

  return (
    <div className='card_test'>
      <div className='test'>
        {userData.avatar ? (
          <img src={userData.avatar} alt={`${userData.first_name} ${userData.last_name}`} />
        ) : (
          <p>No Avatar</p>
        )}
        <h5>{userData.first_name} {userData.last_name}</h5>

        <div className="card-buttons">
          <button className="delete-btn" onClick={() => setShowDelete(true)}>Delete</button>
          <button className="edit-btn" onClick={() => setShowEdit(true)}>Edit</button>
        </div>
      </div>

      <Delete 
        isOpen={showDelete} 
        onClose={() => setShowDelete(false)} 
        userId={user.id} 
        onDelete={handleUserDelete} 
      />


      <EditUser 
        isOpen={showEdit} 
        onClose={() => setShowEdit(false)} 
        onUpdate={handleUserUpdate}
        user={userData}
      />
    </div>
  )
}

export default UserCard