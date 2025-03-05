import './Login.css'
import ImageContainer from './ImageContainer'
import LoginInput from './LoginInput'
import LoginButton from './LoginButton'


export const Login = () => {
    return(
        <>
        <div className="img-fondo"></div>
        <div className="contenido-login">
            <div className="cuestionario-login">
                <div className="info-organizacion-login">
                    <h2>Universidad de Valladolid</h2>
                    <ImageContainer picturePath={`src/Logotipo_de_la_Universidad_de_Valladolid.png`} size={`mini`}/>
                </div>
                <div className="info-inicio-de-sesion-login">
                    <p>Inicio de sesión</p>
                </div>
                <div className="campos-cuestionario-login">
                    <p>Introduzca su credencial</p>
                    <LoginInput icon={`key`} placeholder={`Credencial...`}></LoginInput>
                    <LoginButton color={`orange`} text={`Iniciar sesión`}></LoginButton>
                </div>
            </div>
        </div>
        </>
    )
}