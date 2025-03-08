import React from 'react'
import { Button } from 'semantic-ui-react'
import './LoginButton.css'

const LoginButton = ({color, text}) => (
    <Button
        className="login-button"
        fluid
        style={{
            width: "120%",
            fontFamily: "Arial, Helvetica, sans-serif",
            backgroundColor: color, // Cambia el color de fondo con el valor pasado por `color`
            borderColor: color,     // Opcionalmente, también puedes cambiar el color del borde
        }}
    >
        {text}
    </Button>
)

export default LoginButton
