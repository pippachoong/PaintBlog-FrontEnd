import React from "react";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// adding base URL
// TODO: need to add if statement when deployed to cloud

let BASE_URL = 'http://localhost:3000';

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigatePush = useNavigate();

    function handleInput(ev) {
        switch (ev.target.name) {
            case 'email': setEmail(ev.target.value)
                break;
            case 'password': setPassword(ev.target.value)
                break;
            default: return;
        }
    }

    function handleSubmit(ev){
        ev.preventDefault();
        const request = {
            'email' : email,
            'password' : password
        }
        axios.post(`${BASE_URL}/login`, request)
        .then(
            result => {
                localStorage.setItem('jwt', result.data.token)
                props.fetchUser();
            }
        )
        .catch(err => {
            console.warn(err);
        })
    }

    return (
        <div className="login">
            <div className="login-title"> Login Form </div>
            <form onSubmit={handleSubmit}>
                <input className="login-input"
                    onChange={handleInput}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                />
                <input className="login-input"
                    onChange={handleInput}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                />
                <button className="login-button">Login</button>
            </form>
        </div>
    );

}