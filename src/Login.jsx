import './Login.css'
import ImageContainer from './ImageContainer'
import LoginInput from './LoginInput'
import LoginButton from './LoginButton'
import { useState } from 'react'
import React from 'react';

export const Login = () => {

    const [failedAttempt, setFailedAttempt] = useState(false);
    const [link, setLink] = useState("/creacion-horarios");
    const [credential, setCredential] = useState("");

    return(
        <>
        <div className="img-fondo"></div>
        <div className="contenido-login">
            <div className="cuestionario-login">
                <div className="contenido-imagen-login">
                    <ImageContainer picturePath={`/LogoRojoEscuela-288x300.png`} size={`tiny`} isCircular={true}/>
                </div>
                <div className="info-organizacion-login">
                    <p>Escuela de Ingeniería Informática</p>
                </div>
                <div className="info-inicio-de-sesion-login">
                    <p>Inicio de sesión</p>
                </div>
                <div className="campos-cuestionario-login">
                    <div className="campo-introducir-credencial">
                        <p>Introduzca su credencial</p>
                    </div>
                    <LoginInput icon={`key`} placeholder={`Credencial...`} onChange={(e) => setCredential(e.target.value)}></LoginInput>
                    {failedAttempt === true &&(
                        <div className="info-inicio-de-sesion-erroneo">
                            <p>Credenciales erroneas, pruebe de nuevo.</p>
                        </div>      
                    )}
                    <LoginButton color={`#edbeba`} text={`Iniciar sesión`} link={link} setLink={setLink} setFailedAttempt={setFailedAttempt} credential={credential}></LoginButton>
                </div>
            </div>
        </div>
        </>
    )
}