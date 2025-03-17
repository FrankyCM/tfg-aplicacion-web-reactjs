// LogoutButton.jsx
import { Button } from "semantic-ui-react";
import { useAuth } from "./AuthProvider";
import "./LogoutButton.css";

const LogoutButton = ({ color, text }) => {
    const { logout } = useAuth(); // Obtenemos la función logout del contexto

    return (
        <Button
            className="logout-button"
            fluid
            style={{ backgroundColor: color, borderColor: color }}
            onClick={logout} // Cierra sesión y redirige a /admin
        >
            {text}
        </Button>
    );
};

export default LogoutButton;
