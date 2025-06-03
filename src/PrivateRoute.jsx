import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import React from 'react';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;