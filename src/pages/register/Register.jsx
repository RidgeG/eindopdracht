
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import InputField from '../../componenten/InputField.jsx';

function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        try {

            const response = await axios.post(
                "https://api.datavortex.nl/users",
                { username, password, email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'kalenderapp:0m01WGvb06SMv1D1T658'
                    }
                }
            );

            setMessage("Registratie succesvol! Je wordt ingelogd.");

            await login(username, password);
            navigate('/profile');
        } catch (error) {
            console.error("Registratie mislukt:", error);
            setMessage("Registratie mislukt: " + (error.response?.data?.message || error.message));
        }
    }

    return (
        <div>
            <h2>Registreren</h2>
            <form onSubmit={handleRegister}>
                <InputField
                    type="text"
                    placeholder="Gebruikersnaam"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registreren</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;
