import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        navigate("/creacion-horarios");
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate("/admin");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
