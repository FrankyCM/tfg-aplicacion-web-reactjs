import './CalendarEvent.css'
import CalendarEventPopUp from './CalendarEventPopUp';
import SubjectEventInfo from './SubjectEventinfo';
import { useState } from 'react';

export const CalendarEvent = ({event}) => {
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
    const [eventClicked, setEventClicked] = useState(null);
    
    const handleMouseEnter = (e) => {
        setHoveredEvent(event);
        setPopUpPosition({ x: e.clientX + 10, y: e.clientY + 10 });
    };
    
    const handleMouseLeave = () => {
        setTimeout(() => {
            setHoveredEvent(null);
        }, 100);
    };

    const handleEventClick = () => {
        setEventClicked(event);
    }

    const calculateEventDuration = (event) => {
        const start = new Date(event.start);
        const end = new Date(event.end);
    
        // Convertir a hora local (por seguridad si el navegador los interpreta en UTC)
        const localStart = new Date(start.getTime() + start.getTimezoneOffset() * 60000);
        const localEnd = new Date(end.getTime() + end.getTimezoneOffset() * 60000);
    
        const durationHours = (localEnd - localStart) / (1000 * 60 * 60);
    
        if (durationHours > 1) {
            return (
                <div className="evento-calendario-grupo-aula-laboratorio-2">
                    <strong>{event.grupoLaboratorio}</strong>
                    <span className="aula-laboratorio">{event.aula}</span>
                </div>
            );
        } else {
            return (
                <div className="evento-calendario-grupo-aula-laboratorio">
                    <span className="evento-calendario-grupo-aula-laboratorio">
                        {event.grupoLaboratorio} - {event.aula}
                    </span>
                </div>
            );
        }
    };

    return (
        <div className="evento-calendario" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} title="" onClick={handleEventClick}>
            <strong className="evento-calendario-siglas">{event.siglas}</strong>
            {!event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio === "" && (
                <span className="evento-calendario-grupo-aula">{event.grupo} - {event.aula}</span>
            )}
            
            {event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio !== "" && calculateEventDuration(event)}
            

            {hoveredEvent && <CalendarEventPopUp event={hoveredEvent} position={popUpPosition} backgroundColor={event.color} setHoveredEvent={setHoveredEvent}/>}

            {eventClicked && (
                <div className="overlay">
                    <>
                    <SubjectEventInfo event={eventClicked} backgroundColor={event.color} setEventClicked={setEventClicked} setHoveredEvent={setHoveredEvent}/>
                    </>   
                 </div>
            )}
        </div>            
    )
}
