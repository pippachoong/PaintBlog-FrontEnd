import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Gallery';
import Gallery from './components/Gallery';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import EditPost from './components/EditPost';
import BlogPost from './components/BlogPost';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Nav, Navbar, Container } from 'react-bootstrap';
import CreateComment from './components/CreateComment';
import Paint from './components/Paint';
// import Proxy from './src/proxy';


let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://paint-blog-backend.vercel.app/';
} // end rails deployment if-else

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  function fetchUser() {
    let token = localStorage.getItem('jwt');

    if (token) {
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

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('jwt');
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  return (
    <div className="App">

      <div className="app-header">
        <h1> Welcome to Paint Blog! </h1>
      </div>
      {/* <Router> */}
      <div>
        <Navbar bg="light">
          <Container>
            <Nav>
              <Nav.Link href="/">
                Home
              </Nav.Link>
              {
                currentUser !== null
                  ?
                  (
                    // TODO: add my profile link here
                    <>
                    <Nav.Link href="/paint"> Paint </Nav.Link>
                    <Nav.Link href="/create"> Create Post </Nav.Link>
                    <Nav.Link href="/" onClick={handleLogout}>
                      Log Out
                    </Nav.Link>
                    </>
                  )
                  :
                  (
                    <>
                      <Nav.Link href="/signup">
                        Sign Up
                      </Nav.Link>
                      <Nav.Link href="/login">
                        Login
                      </Nav.Link>
                      <Nav.Link href="/paint">
                        Paint
                      </Nav.Link>
                    </>
                  )
              }
            </Nav>
            <Navbar.Brand>
              Paint Blog
            </Navbar.Brand>
            <Navbar.Text>
              Welcome
              <strong>
              {currentUser !== null
                ?
                
                (" " + currentUser.name)
                :
                ("Sign-up today!")
              }
              </strong>
            </Navbar.Text>
          </Container>
        </Navbar>
      </div>

      <Routes>
        <Route path="/" element={<Gallery user={currentUser} />} />
        <Route path="/blogs/:id" element={<BlogPost fetchUser={fetchUser} user={currentUser} {...useState}  />} />
        <Route path="/blogs/:id/edit" element={<EditPost fetchUser={fetchUser} user={currentUser} {...useState}  />} />
        <Route path="/create" element={<CreateBlog fetchUser={fetchUser} user={currentUser} {...useState} />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} user={currentUser} {...useState} />} />
        <Route path="/signup" element={<SignUp fetchUser={fetchUser} {...useState} />} />
        <Route path="/comments" element={<CreateComment fetchUser={fetchUser} {...useState} />} />
        <Route path="/paint" element={<Paint />} />
      </Routes>
      {/* </Router> */}
      

    </div>
  );
}

export default App;
