import React, { useState } from 'react';
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import UserList from '../../components/UserList/UserList';
import { FaSearch } from 'react-icons/fa';


const Home = () => {


  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };


  return (
    <div>
      <Navbar />
      <div className='Header'>
        <Header />
      </div>
      <div className='userlist app'>
        <div className='search-bar'>
          <h2>Users List</h2>

          <div className={`search-container ${searchOpen ? 'open' : ''}`}>
            <input
              type='text'
              placeholder='Search users...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
            <FaSearch className='search-icon' onClick={handleSearchToggle} />
          </div>
        </div>
        <UserList searchQuery={searchQuery} />
      </div>
      <Footer/>
    </div>
  )
}

export default Home