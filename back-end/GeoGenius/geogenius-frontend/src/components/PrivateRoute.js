import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRole }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (!user) return <Navigate to="/login" />;

    if (allowedRole && !user.role.endsWith(allowedRole)) {
        return <Navigate to="/" />;
    }


    return children;
};

export default PrivateRoute;
