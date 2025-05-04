import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InputField from '../../componenten/InputField';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/home');
        } catch (error) {
            setError('Ongeldige inloggegevens');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Inloggen</h2>
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

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Bezig...' : 'Inloggen'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Nog geen account?{' '}
                        <Link to="/register" className="auth-link">
                            Registreer hier
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
