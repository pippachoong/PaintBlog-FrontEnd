import React from "react";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://paint-blog-backend.vercel.app/';
} // end rails deployment if-else


export default function SignUp(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeInput, setActiveInput] = useState(null);
    const navigatePush = useNavigate();

    function handleInput(ev) {
        switch (ev.target.name) {
            case 'name':
                setName(ev.target.value)
                break;
            case 'email':
                setEmail(ev.target.value)
                break;
            case 'password':
                setPassword(ev.target.value)
                break;
            default:
                console.log('Sign up failed');
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        const request = { 'name': name, 'email': email, 'password': password };

        await axios.post(`${BASE_URL}/signup`, request)
        .then(res => {
            console.log('Signup', res.data);
            localStorage.setItem('jwt', res.data.token);
            props.fetchUser();
            navigatePush('/');
        })
        .catch(err => {
            console.warn(err);
        });
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className={`input-wrapper ${activeInput === 'name' ? 'active' : ''}`}>
                    <input
                        onChange={handleInput}
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        onFocus={() => setActiveInput('name')}
                        onBlur={() => setActiveInput(null)}
                    />
                </div>
                <div className={`input-wrapper ${activeInput === 'email' ? 'active' : ''}`}>
                    <input
                        onChange={handleInput}
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onFocus={() => setActiveInput('email')}
                        onBlur={() => setActiveInput(null)}
                    />
                </div>
                <div className={`input-wrapper ${activeInput === 'password' ? 'active' : ''}`}>
                    <input
                        onChange={handleInput}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        onFocus={() => setActiveInput('password')}
                        onBlur={() => setActiveInput(null)}
                    />
                </div>
                <button>Sign Up</button>
            </form>
        </div>
    );
}
