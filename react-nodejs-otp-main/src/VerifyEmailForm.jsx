import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function VerifyEmailForm() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Correct the URL to the backend server running at port 5000
            const response = await axios.post('http://localhost:5000/verify', { email, otp });

            console.log(response);
            if (response.data.message === 'Email verified') {
                window.alert('Email verification successful');
            } else {
                setMessage('Invalid OTP');
            }
        } catch (error) {
            // Log the error to the console for debugging purposes
            console.log(error.response);
            setMessage('Error verifying email. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='App'>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                OTP:
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </label>
            <button type="submit">Verify Email</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default VerifyEmailForm;
