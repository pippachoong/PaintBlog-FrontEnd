import React from "react";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let BASE_URL = 'http://localhost:3000';

export default function SignUp(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            default: console.log('Sign in failed');
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
        })
    }


    return (
        <div>
            <div>
                <h1>
                    Sign Up
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className="signup"
                    onChange={handleInput}
                    name="name"
                    type="name"
                    placeholder="Enter name"
                />
                <input
                    className="signup"
                    onChange={handleInput}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                />
                <input
                    className="signup"
                    onChange={handleInput}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                />
                <button>
                    Sign Up
                </button>
            </form>
        </div>
    );
}