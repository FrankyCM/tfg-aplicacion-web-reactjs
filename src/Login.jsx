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
                    <LoginInput icon={`key`} placeholder={`Credencial...`}></LoginInput>
                    <LoginButton color={`#edbeba`} text={`Iniciar sesión`}></LoginButton>
                </div>
            </div>
        </div>
        </>
    )
}