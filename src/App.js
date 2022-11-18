import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Gallery';
import Gallery from './components/Gallery';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import BlogPost from './components/BlogPost';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import axios from 'axios';

// TODO: add if statement for cloud
let BASE_URL = 'http://localhost:3000';


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);
  
  function fetchUser(){
    let token = localStorage.getItem('jwt');

    if(token){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      axios.get(`${BASE_URL}/current_user`)
      .then(res => {
        setCurrentUser(res.data)
      })
      .catch(err => {
        console.warn(err);
      })
    }
  }

  function handleLogout(){
    setCurrentUser(null);
    localStorage.removeItem('jwt');
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  return (
    <div className="App">
      <h1> Welcome to Paint Blog! The best blog ever! </h1>
      {/* <Router> */}
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/create'>New Blog</Link>
        <Link to='/login'>Login</Link>
        <Link onClick={handleLogout} to='/'>Logout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} user={currentUser} {...useState} />} />


      </Routes>
      {/* </Router> */}
      .

    </div>
  );
}

export default App;
