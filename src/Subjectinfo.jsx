import './SubjectInfo.css'


const SubjectInfo = ({event,backgroundColor, setEventClicked, setHoveredEvent}) => {

    const handleCloseClick = () => {
        setTimeout(() => {
        setEventClicked(null);
        setHoveredEvent(null);
    }, 0);
    }

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

                
            </div>
      

        </div>
    );
};

export default SubjectInfo;
