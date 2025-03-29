import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import EditUser from './components/EditUser/EditUser';
import Home from './pages/Home/Home';
import "./App.css"


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;