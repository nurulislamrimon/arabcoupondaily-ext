import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    const user = null;
    if (!user) {
        return navigate('/login');
    } else {
        return children
    }
};

export default RequireAuth;