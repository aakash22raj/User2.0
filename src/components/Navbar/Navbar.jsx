import React from 'react'
import "./Navbar.css"
import { TiThListOutline } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");

    navigate("/login");
  };


  return (
    <div className="nav-container">
      <div className='nav app'>
        <Link to="/home" className='logo'>
          <TiThListOutline className="logo-icon" />
          <p>User<span>2.0</span></p>
        </Link>
        
        <button  onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar