import React, { useState, useEffect } from 'react';
import "./UserList.css"
import axios from 'axios';
import UserCard from '../UserCard/UserCard';


const UserList = ({ searchQuery }) => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://reqres.in/api/users?page=${page}`);

                if (response.data && response.data.data) {


                    const storedDeletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
                    const storedEditedUsers = JSON.parse(localStorage.getItem("editedUsers")) || {};
                    // Filter out deleted users
                    let filteredUsers = response.data.data.filter(user => !storedDeletedUsers.includes(user.id));
                    // Merge edited users with fetched data
                    filteredUsers = filteredUsers.map(user => storedEditedUsers[user.id] ? storedEditedUsers[user.id] : user);
                    setUsers(filteredUsers);


                    // setUsers(response.data.data);
                    setTotalPages(response.data.total_pages || 1);
                } else {
                    console.error("Invalid API response:", response);
                }

            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        };
        fetchUsers();
    }, [page]);


    // **Filter users based on search query**
    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const handleUserDelete = async (userId) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${userId}`);


            // Store deleted users in localStorage
            const storedDeletedUsers = JSON.parse(localStorage.getItem("deletedUsers")) || [];
            localStorage.setItem("deletedUsers", JSON.stringify([...storedDeletedUsers, userId]));


            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    const handleUserUpdate = (updatedUser) => {
        // Store edited user in localStorage
        const storedEditedUsers = JSON.parse(localStorage.getItem("editedUsers")) || {};
        storedEditedUsers[updatedUser.id] = updatedUser;
        localStorage.setItem("editedUsers", JSON.stringify(storedEditedUsers));

        // Update state
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    };



    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


  return (
    <div className="users-list-container">
        {/* <h2 className=''>Users List</h2> */}
        {loading ? (
            <p>Loading users...</p>
        ) : (
            <div className="card_test">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} handleUserDelete={handleUserDelete} handleUserUpdate={handleUserUpdate} />
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        )}


        {/* Pagination Controls */}

        <div className="pagination">
            <button 
                className={`page-btn ${page === 1 ? 'disabled' : ''}`} 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1}
            >
                ◀ Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index} 
                    className={`page-btn ${page === index + 1 ? 'active' : ''}`} 
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}    
            <button 
                className={`page-btn ${page === totalPages ? 'disabled' : ''}`} 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page === totalPages}
            >
                Next ▶
            </button>
        </div>
    </div>
  )
}

export default UserList