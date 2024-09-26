import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthentcated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthentcated(true); 
            const redirectPaths = ['/', '/login', '/signup'];
            if (redirectPaths.includes(location.pathname)) {
                navigate('/home', { replace: true }); 
            }
        } else {
            setIsAuthentcated(false); 
        }
    }, [location.pathname, navigate, setIsAuthentcated]);

    return null; 
};

export default RefreshHandler;
