import React from "react";
import { Button } from "semantic-ui-react";
import "./LoginButton.css";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ color, text, link, setLink, setFailedAttempt, credential }) => {
    const navigate = useNavigate();

    const hashCredential = async (input) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase(); // Para que coincida con el formato en JSON
    };

    const handleClick = async () => {
        try {
            const response = await fetch("/credenciales.json"); 
            const data = await response.json();
            const hashedInput = await hashCredential(credential);
            console.log(hashedInput);
            if (hashedInput === data.admin.credenciales) {
                navigate(link);
            } else {
                setLink("/admin");
                setFailedAttempt(true);
                navigate("/admin");
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
            style={{
                width: "130%",
                fontFamily: "Arial, Helvetica, sans-serif",
                backgroundColor: color,
                borderColor: color,
            }}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
};

export default LoginButton;
