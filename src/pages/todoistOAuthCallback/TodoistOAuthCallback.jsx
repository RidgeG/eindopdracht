import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TodoistContext } from '../../context/TodoistContext';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../componenten/Loader';

const TodoistOAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { exchangeCodeForToken } = useContext(TodoistContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const params = new URLSearchParams(location.search);
                await exchangeCodeForToken(
                    params.get('code'),
                    params.get('state')
                );
                navigate('/profile');
            } catch (error) {
                navigate('/profile?error=oauth_failed');
            }
        };

        if (user) handleCallback();
    }, [navigate, user, location.search]);

    return <Loader message="Autoriseren..." />;
};

export default TodoistOAuthCallback;