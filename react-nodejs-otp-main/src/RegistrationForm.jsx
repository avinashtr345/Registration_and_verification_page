import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send registration request to backend
            const response = await axios.post('http://localhost:5000/register', { username, email, password });

            // Set OTP and success message
            setOtp(response.data.otp);
            setMessage('User registered successfully. OTP: ' + response.data.otp);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error occurred');
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default RegistrationForm;
