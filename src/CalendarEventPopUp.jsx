import React from "react";
import "./CalendarEventPopUp.css";

const CalendarEventPopUp = ({ event, position }) => {
  if (!event) return null;

  return (
    <div
      className="evento-popup"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
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
