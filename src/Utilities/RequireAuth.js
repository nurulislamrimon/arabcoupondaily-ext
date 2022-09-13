import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);


    if (!user) {
        navigate('/login');
    } else {
        return children;
    }
};

export default RequireAuth;