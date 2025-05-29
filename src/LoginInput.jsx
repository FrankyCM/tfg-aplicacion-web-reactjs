import React from 'react';
import { Input } from 'semantic-ui-react';
import './LoginInput.css';

const LoginInput = ({ icon, placeholder, onChange }) => (
    <Input 
        icon={icon} 
        placeholder={placeholder} 
        fluid 
        onChange={onChange} // Aquí pasamos el evento correctamente
        className="login-input"
    />
);

export default LoginInput;
