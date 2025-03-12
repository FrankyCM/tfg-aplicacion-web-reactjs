import { Button } from 'semantic-ui-react';
import './SubjectEventInfo.css'
import { useState } from 'react';
import ImageContainer from './ImageContainer';


const SubjectEventInfo = ({event,backgroundColor, setEventClicked, setHoveredEvent}) => {

    const [classMapButtonClicked, setClassMapButtonClicked] = useState(false);
    const [buttonText, setButtonText] = useState("Mostrar mapa de aulas");

    const handleCloseClick = () => {
        setTimeout(() => {
        setEventClicked(null);
        setHoveredEvent(null);
        setClassMapButtonClicked(false);
        setButtonText("Mostrar mapa de aulas");
    }, 0);
    }

    const toggleClassMap = () => {
        setClassMapButtonClicked((prev) => !prev);
        setButtonText((prev) => (prev === "Mostrar mapa de aulas" ? "Ocultar mapa de aulas" : "Mostrar mapa de aulas"));
    };

    return(
        <div className="cuadro-evento-asignatura" style = {{backgroundColor: backgroundColor}}>
            <div className="cuadro-evento-informacion-asignatura">
                <div className="cuadro-evento-cabecera">
                    <p className="cuadro-evento-informacion-nombre-siglas">{event.nombre} - {event.siglas}</p>
                    <div className="cuadro-evento-boton-cerrar" onClick={handleCloseClick}>
                        ✖
                    </div>
                </div>
                
                <div className="cuadro-evento-informacion-grupo-aula">
                    {!event.aula.startsWith("L") ? (
                            <>
                                <div className="cuadro-evento-informacion-grupo">
                                    <p>Grupo:</p>
                                    <p className="texto-grupo-aula">{event.grupo}</p>
                                </div>
                                <div className="cuadro-evento-informacion-aula">
                                    <p>Aula:</p>
                                    <p className="texto-grupo-aula">{event.aula}</p>
                                </div>
                            </>
                        ) : (
                            <div className="cuadro-evento-informacion-aula">
                                <p>Aula:</p>
                                <p>{event.aula}</p>
                            </div>
                        )}
                </div>

                <div className="cuadro-evento-mapa-aulas">
                    <Button className="cuadro-evento-boton-mostrar-mapa-aulas" onClick={toggleClassMap}>
                        {buttonText}
                    </Button>

                    {classMapButtonClicked === true && (
                        !event.aula.startsWith("L") ? (
                            <>
                                <div className="cuadro-evento-imagen-mapa-aulas-planta-baja">
                                    <ImageContainer bgColor={`white`} picturePath={`/mapa-clases-UVa.png`} size={`big`} isCircular={false}/>
                                </div>
                            </>
                        ) : (   
                            <>
                                <div className="cuadro-evento-imagen-mapa-aulas-primera-planta">
                                    <ImageContainer bgColor={`white`} picturePath={`/mapa-clases-UVa.png`} size={`medium`} isCircular={false}/>
                                </div>
                            </>
                        )     
                    )}
                    
                </div>

                
            </div>
      

        </div>
    );
};

export default SubjectEventInfo;
