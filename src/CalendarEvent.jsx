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

    return (
        <div className="evento-calendario" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} title="" onClick={handleEventClick}>
            <strong className="evento-calendario-siglas">{event.siglas}</strong>
            {!event.aula.startsWith("L") && (
                <span className="evento-calendario-grupo-aula">{event.grupo} - {event.aula}</span>
            )}
            {event.aula.startsWith("L") && (
                <>
                <div className="evento-calendario-grupo-aula-laboratorio">
                    <strong>{event.grupo}</strong>
                    <span className="aula-laboratorio">{event.aula}</span>
                </div>               
                </>            
            )}

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
