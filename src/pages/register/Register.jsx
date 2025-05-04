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
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Wachtwoorden komen niet overeen');
            setLoading(false);
            return;
        }

        try {
            const success = await register(formData.email, formData.password);
            if (success) {
                navigate('/login');
            } else {
                setError('Registratie mislukt');
            }
        } finally {
            setLoading(false);
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

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Bezig...' : 'Account aanmaken'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Al een account?{' '}
                        <Link to="/login" className="auth-link">
                            Log hier in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;