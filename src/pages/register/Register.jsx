import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import InputField from "../../componenten/InputField.jsx";

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        try {
            await register(email, password);
            setMessage("Registratie succesvol! Je wordt ingelogd.");
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (error) {
            console.error("Registratie mislukt:", error);
            setMessage("Registratie mislukt: " + error.message);
        }
    }

    return (
        <div className="form-container">
            <h2>Registreren</h2>
            <form onSubmit={handleRegister}>
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
};

export default Register;