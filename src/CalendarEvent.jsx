import './CalendarEvent.css'
import CalendarEventPopUp from './CalendarEventPopUp';
import { useState } from 'react';

export const CalendarEvent = ({event}) => {
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
    
    const handleMouseEnter = (e) => {
        setHoveredEvent(event);
        console.log("encima evento");
        setPopUpPosition({ x: e.clientX + 10, y: e.clientY + 10 });
    };
    
    const handleMouseLeave = () => {
        setHoveredEvent(null);
        console.log("fuera evneto");
    };

    return (
        <div className="evento-calendario" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <strong className="siglas-evento">{event.siglas}</strong>
            {!event.aula.startsWith("L") && (
                <span className="grupo-aula-evento">{event.grupo} - {event.aula}</span>
            )}
            {event.aula.startsWith("L") && (
                <span className="grupo-aula-evento">{event.aula}</span>
            )}

            {hoveredEvent && <CalendarEventPopUp event={hoveredEvent} position={popUpPosition} backgroundColor={event.color} setHoveredEvent={setHoveredEvent}/>}
        </div>
    )
}
