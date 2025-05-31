// LogoutButton.jsx
import { Button, Icon } from "semantic-ui-react";
import { useAuth } from "./AuthProvider";
import "./LogoutButton.css";

const LogoutButton = ({ color, text, iconName}) => {
    const { logout } = useAuth(); // Obtenemos la función logout del contexto

    return (
        <Button
            className="logout-button"
            style={{ backgroundColor: color, borderColor: color }}
            onClick={logout} // Cierra sesión y redirige a /admin
            icon
            labelPosition="left"
        >
            {iconName && <Icon name={iconName} size="large" />}
            {text}
        </Button>
    );
};

export default LogoutButton;
