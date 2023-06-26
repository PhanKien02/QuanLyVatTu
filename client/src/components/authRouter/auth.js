import { useSelector } from "react-redux";
import { useLocation,Navigate } from "react-router-dom";
function RequireAuth({ children }) {
    let location = useLocation();
    const login = useSelector(state => state.user);
    if (!login.isAuth) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAuth;