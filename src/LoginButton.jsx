import { Button } from "semantic-ui-react";
import "./LoginButton.css";
import { useAuth } from "./AuthProvider";

const LoginButton = ({ color, text, credential, setFailedAttempt }) => {
    const { login } = useAuth();

    const hashCredential = async (input) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
    };

    const handleClick = async () => {
        try {
            const response = await fetch("/credenciales.json");
            const data = await response.json();
            const hashedInput = await hashCredential(credential);
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