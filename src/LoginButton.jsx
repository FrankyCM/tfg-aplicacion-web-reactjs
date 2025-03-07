import React from 'react'
import { Button } from 'semantic-ui-react'

const LoginButton = ({color, text}) => (
    <Button color={color} fluid style={{ width: "120%", fontFamily: "Arial, Helvetica, sans-serif" }}>{text}</Button>
)

export default LoginButton