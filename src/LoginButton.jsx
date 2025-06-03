import { Button } from "semantic-ui-react";
import "./LoginButton.css";
import { useAuth } from "./AuthProvider";
import SHA256 from "crypto-js/sha256";
import React from 'react';

const LoginButton = ({ color, text, credential, setFailedAttempt }) => {
    const { login } = useAuth();

    const hashCredential = (input) => {
        return SHA256(input).toString().toUpperCase();
    };

    const handleClick = async () => {
        try {
            const response = await fetch("/credenciales.json");
            const data = await response.json();
            const hashedInput = await hashCredential(credential);
            console.log(hashedInput);
            if (hashedInput === data.admin.credenciales) {
                login();
            } else {
                setFailedAttempt(true);
            }
        } catch (error) {
            console.error("Error al validar credenciales:", error);
            setFailedAttempt(true);
        }
    };

    return (
        <Button
            className="login-button"
            fluid
            style={{ backgroundColor: color, borderColor: color }}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
};

export default LoginButton;