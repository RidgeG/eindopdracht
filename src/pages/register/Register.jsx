import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InputField from '../../componenten/InputField';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Ongeldig e-mailadres');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Wachtwoord moet minimaal 8 tekens zijn');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Wachtwoorden komen niet overeen');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            await register(formData.email, formData.password);
            navigate('/login');
        } catch (error) {
            setError('Registratie mislukt - probeer een andere e-mail');
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <InputField
                        type="password"
                        label="Wachtwoord"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <InputField
                        type="password"
                        label="Bevestig wachtwoord"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary">
                        Account aanmaken
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
