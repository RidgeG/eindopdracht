import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../componenten/InputField";
import Loader from "../../componenten/Loader";

const Login = () => {
    const { emailSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await emailSignIn(email, password);
            navigate("/");
        } catch (err) {
            setError("Inloggen mislukt - controleer je gegevens");
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Inloggen</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        label="E-mailadres"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        type="password"
                        label="Wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <div className="error">{error}</div>}

                    <button type="submit" disabled={loading} className="primary-btn">
                        {loading ? <Loader /> : "Inloggen"}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/registreren">Nog geen account? Registreer</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;