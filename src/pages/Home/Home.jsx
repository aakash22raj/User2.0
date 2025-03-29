import React from 'react';
import "./Home.css"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import UserList from '../../components/UserList/UserList';


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='Header'>
        <Header />
      </div>
      <div className='userlist app'>
        <div className='search-bar'>
          
          <h2>Users List</h2>
        </div>
        <UserList />
      </div>
      <Footer/>
    </div>
  )
}

export default Home