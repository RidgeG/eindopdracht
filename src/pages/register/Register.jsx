// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import InputField from '../../componenten/InputField.jsx';
import { DATAVORTEX_CONFIG } from '../../config.js';


function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]   = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        try {

            const lowerUserName = username.toLowerCase();
            const payload = {
                username: lowerUserName,
                email,
                password,
                info: "Geregistreerd via webapp",
                authorities: [{ authority: "USER" }]
            };

            const response = await axios.post(
                `https://api.datavortex.nl/${DATAVORTEX_CONFIG.APPLICATION_NAME}/users`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': DATAVORTEX_CONFIG.API_KEY
                    }
                }
            );


            if (response.status === 200 || response.status === 201) {
                setMessage("Registratie succesvol! Je wordt ingelogd.");

                setTimeout(async () => {
                    try {
                        await login(lowerUserName, password);
                        navigate('/profile');
                    } catch (loginError) {
                        console.error("Inloggen mislukt:", loginError);
                        setMessage("Inloggen mislukt: " + (loginError.response?.data || loginError.message));
                    }
                }, 3000);
            } else {
                setMessage("Registratie mislukt: Onverwachte statuscode " + response.status);
            }
        } catch (error) {
            console.error("Registratie mislukt:", error);

            localStorage.removeItem("jwtToken");
            if (error.response && error.response.status === 409) {
                setMessage("Registratie mislukt: Deze gebruikersnaam bestaat al.");
            } else if (error.response && error.response.data) {
                setMessage("Registratie mislukt: " + error.response.data);
            } else {
                setMessage("Registratie mislukt: " + error.message);
            }
        }
    }

    return (
        <div className="form-container">
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
                <button type="submit" className="btn">Registreren</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
}

export default Register;
