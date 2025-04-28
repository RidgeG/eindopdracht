import React, { useState, useContext,  } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../componenten/InputField.jsx";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(email, password);
            setMessage("Login succesvol");
            navigate("/home");
        } catch (error) {
            console.error("Inloggen mislukt:", error);
            setMessage("Inloggen mislukt: " + error.message);
        }
    }

    return (
        <div className="form-container">
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn">Inloggen</button>
            </form>
            <p className="message">{message}</p>
            <p>Heb je nog geen account? <Link to="/register">Registreer hier</Link></p>
        </div>
    );
};

export default Login;