import React from 'react'
import { Button } from 'semantic-ui-react'

const LoginButton = ({color, text}) => (
    <Button color={color} fluid className="loginButton">{text}</Button>
)

export default LoginButton