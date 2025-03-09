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
      <h3>{event.siglas}</h3>
      <div className="informacion-popup">
        {!event.aula.startsWith("L") && (
            <>
            <p>Grupo:{event.grupo}</p>
            <p>Aula:{event.aula}</p>
            </>
        )}
        {event.aula.startsWith("L") && (
            <>
            <p>Aula:{event.aula}</p>
            </>
        )}
        <p><strong>Horario:</strong> {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}</p>
      </div>
      
      
    </div>
  );
};

export default CalendarEventPopUp;
