import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../componenten/InputField";
import Loader from "../../componenten/Loader";

const Register = () => {
    const { emailSignUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError("Vul alle velden in");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        if (formData.password.length < 6) {
            setError("Wachtwoord moet minimaal 6 tekens zijn");
            return;
        }

        setLoading(true);

        try {
            await emailSignUp(formData.email, formData.password);
            navigate("/home");
        } catch (error) {
            setError(mapErrorCodeToMessage(error.message));
        }

        setLoading(false);
    };

    const mapErrorCodeToMessage = (code) => {
        switch (code) {
            case "auth/email-already-in-use":
                return "E-mailadres is al in gebruik";
            case "auth/invalid-email":
                return "Ongeldig e-mailadres";
            case "auth/weak-password":
                return "Wachtwoord moet minimaal 6 tekens zijn";
            default:
                return "Registratie mislukt";
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Registreren</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        label="E-mailadres"
                        placeholder="voorbeeld@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <InputField
                        type="password"
                        label="Wachtwoord"
                        placeholder="Minimaal 6 tekens"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <InputField
                        type="password"
                        label="Bevestig wachtwoord"
                        placeholder="Herhaal uw wachtwoord"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                    />

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="btn primary"
                        disabled={loading}
                    >
                        {loading ? <Loader small /> : "Account aanmaken"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Al een account? </span>
                    <Link to="/login" className="auth-link">
                        Log hier in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;