import './CalendarEvent.css'
import CalendarEventPopUp from './CalendarEventPopUp';
import SubjectInfo from './Subjectinfo';
import { useState, useEffect } from 'react';

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
            <strong className="siglas-evento">{event.siglas}</strong>
            {!event.aula.startsWith("L") && (
                <span className="grupo-aula-evento">{event.grupo} - {event.aula}</span>
            )}
            {event.aula.startsWith("L") && (
                <span className="grupo-aula-evento">{event.aula}</span>
            )}

            {hoveredEvent && <CalendarEventPopUp event={hoveredEvent} position={popUpPosition} backgroundColor={event.color} setHoveredEvent={setHoveredEvent}/>}

            {eventClicked && (
                <div className="overlay">
                    <>
                    <SubjectInfo event={eventClicked} backgroundColor={event.color} setEventClicked={setEventClicked} setHoveredEvent={setHoveredEvent}/>
                    </>   
                 </div>
            )}
        </div>            
    )
}
