import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        navigate('/profile');
    };

    return (
        <div>
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Gebruikersnaam"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Inloggen</button>
            </form>
        </div>
    );
}

export default Login;
