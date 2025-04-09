import './CalendarEvent.css'
import CalendarEventPopUp from './CalendarEventPopUp';
import ModifyCalendarEvent from './ModifyCalendarEvent';
import { useState } from 'react';


export const AdminCalendarEvent = ({
    event, asigCode, setAsigCode,
    asigInitials, setAsigInitials,
    asigDay, setAsigDay, asigPossibleDays,
    asigStartTime, setAsigStartTime, asigStartTimes,
    asigColor, setAsigColor, asigPossibleColors,
    asigFullName, setAsigFullName,
    asigSemester, setAsigSemester, asigPossibleSemesters,
    asigGroupNumber, setAsigGroupNumber, asigPossibleGroupNumbers,
    asigLabGroup, setAsigLabGroup,
    asigGroupType, setAsigGroupType, asigPossibleGroupType,
    asigDuration, setAsigDuration,
    asigClass, setAsigClass, asigPossibleClasses,
    asigCourseGII_IS, setAsigCourseGII_IS,
    asigCourseGII_TI, setAsigCourseGII_TI,
    asigCourseGII_CO, setAsigCourseGII_CO,
    asigCourse_EST, setAsigCourse_EST,
    asigCourse_INDat, setAsigCourse_INDat,
    asigCourse_Master, setAsigCourse_Master,
    asigPossibleCourses,
    asigTeacher, setAsigTeacher, asigPossibleTeacherOptions,
    asigIncidences, setAsigIncidences, modifyAsig, setModifyAsig }) => {

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
            {!event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio === "" && (
                <span className="evento-calendario-grupo-aula">{event.grupo} - {event.aula}</span>
            )}
            
            {event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio !== "" && (
                <>
                <div className="evento-calendario-grupo-aula-laboratorio">
                    <strong>{event.grupoLaboratorio}</strong>
                    <span className="aula-laboratorio">{event.aula}</span>
                </div>               
                </>            
            )}
            

            {hoveredEvent && <CalendarEventPopUp event={hoveredEvent} position={popUpPosition} backgroundColor={event.color} setHoveredEvent={setHoveredEvent}/>}

            {eventClicked && (
                <div className="overlay">
                    <>
                    <ModifyCalendarEvent event={eventClicked} backgroundColor={event.color} setEventClicked={setEventClicked} setHoveredEvent={setHoveredEvent}
                    asigCode={asigCode} setAsigCode={setAsigCode} asigInitials={asigInitials}
                    setAsigInitials={setAsigInitials} asigPossibleDays={asigPossibleDays} asigDay={asigDay}
                    setAsigDay={setAsigDay} asigStartTimes={asigStartTimes} asigFullName={asigFullName} setAsigFullName={setAsigFullName}
                    asigStartTime={asigStartTime} setAsigStartTime={setAsigStartTime} asigPossibleColors={asigPossibleColors}
                    asigColor={asigColor} setAsigColor={setAsigColor}
                    asigPossibleSemesters={asigPossibleSemesters} asigSemester={asigSemester} setAsigSemester={setAsigSemester}
                    asigPossibleGroupNumbers={asigPossibleGroupNumbers} asigGroupNumber={asigGroupNumber} setAsigGroupNumber={setAsigGroupNumber}
                    asigGroupType={asigGroupType} setAsigGroupType={setAsigGroupType} asigLabGroup={asigLabGroup} setAsigLabGroup={setAsigLabGroup}
                    asigPossibleGroupType={asigPossibleGroupType} asigDuration={asigDuration} setAsigDuration={setAsigDuration} asigPossibleClasses={asigPossibleClasses}
                    asigClass={asigClass} setAsigClass={setAsigClass} asigPossibleCourses={asigPossibleCourses} asigCourseGII_IS={asigCourseGII_IS} setAsigCourseGII_IS={setAsigCourseGII_IS}
                    asigCourseGII_TI={asigCourseGII_TI} setAsigCourseGII_TI={setAsigCourseGII_TI} asigCourseGII_CO={asigCourseGII_CO}
                    setAsigCourseGII_CO={setAsigCourseGII_CO} asigCourse_EST={asigCourse_EST} setAsigCourse_EST={setAsigCourse_EST}
                    asigCourse_INDat={asigCourse_INDat} setAsigCourse_INDat={setAsigCourse_INDat} asigCourse_Master={asigCourse_Master}
                    setAsigCourse_Master={setAsigCourse_Master} asigPossibleTeacherOptions={asigPossibleTeacherOptions} asigTeacher={asigTeacher} setAsigTeacher={setAsigTeacher}
                    asigIncidences={asigIncidences} setAsigIncidences={setAsigIncidences} modifyAsig={modifyAsig} setModifyAsig={setModifyAsig}/>
                    </>   
                 </div>
            )}
        </div>            
    )
}
