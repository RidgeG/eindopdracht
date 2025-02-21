import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import InputField from "../../componenten/InputField.jsx";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(username, password);
            setMessage("Login succesvol");
            navigate("/profile");
        } catch (error) {
            setMessage("Login mislukt: " + (error.response?.data?.message || error.message));
        }
    }

    return (
        <div className="form-container">
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    placeholder="Gebruikersnaam"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn">Inloggen</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Login;
