import React from "react";
import "./CalendarEventPopUp.css";

const CalendarEventPopUp = ({ event, position, backgroundColor, setHoveredEvent }) => {
  if (!event) return null; 

  const handleMouseEnter = () => {
    setHoveredEvent(event);
    console.log("encima evento popup");
};

const handleMouseLeave = () => {
    setTimeout(() => {
        setHoveredEvent(null); 
    }, 100);
    console.log("salida evento popup");
};

  return (
    <div
      className="evento-popup" style={{ top: position.y, left: position.x, backgroundColor: backgroundColor}} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="informacion-popup">
        <p className="informacion-nombre-siglas">{event.nombre} - {event.siglas}</p>
        <div className="informacion-grupo-aula">
            {!event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio === "" && (
                <>
                <div className="informacion-grupo">
                    <p>Grupo:</p>
                    <p>{event.grupo}</p>
                </div>
                <div className="informacion-aula">
                    <p>Aula:</p>
                    <p>{event.aula}</p>
                </div>
                </>
            )}

            {event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio !== "" && (
                <>
                <div className="informacion-grupo">
                    <p>Grupo de laboratorio:</p>
                    <p>{event.grupoLaboratorio}</p>
                </div>
                <div className="informacion-aula">
                    <p>Aula de laboratorio:</p>
                    <p>{event.aula}</p>
                </div>
                </>
            )}
        </div>
        <div className="informacion-profesor">
            <p>Profesor:</p>
            <p>{event.profesor}</p>
        </div>
        
      </div>
      
      
    </div>
  );
};

export default CalendarEventPopUp;
