import React from "react";
import "./CalendarEventPopUp.css";

const CalendarEventPopUp = ({ event, position, backgroundColor, setHoveredEvent }) => {
  if (!event) return null;

  // Función para manejar el mouse enter y leave sobre el popup
  const handleMouseEnterPopUp = () => {
    setHoveredEvent(event); // Mantenemos el evento cuando el ratón está sobre el popup
  };

  const handleMouseLeavePopUp = () => {
    setHoveredEvent(null);
  };

  return (
    <div
      className="evento-popup" style={{ top: position.y, left: position.x, backgroundColor: backgroundColor}} 
      onMouseEnter={handleMouseEnterPopUp}
      onMouseLeave={handleMouseLeavePopUp}>
      <div className="informacion-popup">
        <p className="informacion-nombre-siglas">{event.nombre} - {event.siglas}</p>
        <div className="informacion-grupo-aula">
            {!event.aula.startsWith("L") && (
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
            {event.aula.startsWith("L") && (
                <>
                <div className="informacion-aula">
                    <p>Aula:</p>
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
