import './CalendarEvent.css'
import CalendarEventPopUp from './CalendarEventPopUp';
import ModifyCalendarEvent from './ModifyCalendarEvent';
import { useState } from 'react';


export const AdminCalendarEvent = ({
    event, asigCodeMod, setAsigCodeMod,
    asigInitialsMod, setAsigInitialsMod,
    asigDayMod, setAsigDayMod, asigPossibleDays,
    asigStartTimeMod, setAsigStartTimeMod, asigStartTimes,
    asigColorMod, setAsigColorMod, asigPossibleColors,
    asigFullNameMod, setAsigFullNameMod,
    asigSemesterMod, setAsigSemesterMod, asigPossibleSemesters,
    asigGroupNumberMod, setAsigGroupNumberMod, asigPossibleGroupNumbers,
    asigLabGroupMod, setAsigLabGroupMod,
    asigGroupTypeMod, setAsigGroupTypeMod, asigPossibleGroupType,
    asigDurationMod, setAsigDurationMod,
    asigClassMod, setAsigClassMod, asigPossibleClasses,
    asigCourseGII_ISMod, setAsigCourseGII_ISMod,
    asigCourseGII_TIMod, setAsigCourseGII_TIMod,
    asigCourseGII_COMod, setAsigCourseGII_COMod,
    asigCourse_ESTMod, setAsigCourse_ESTMod,
    asigCourse_INDatMod, setAsigCourse_INDatMod,
    asigCourse_MasterMod, setAsigCourse_MasterMod,
    asigPossibleCourses,
    asigTeacherMod, setAsigTeacherMod, asigPossibleTeacherOptions,
    asigIncidencesMod, setAsigIncidencesMod, modifyAsig, setModifyAsig, eventClicked, setEventClicked,
    selectedEventData, setSelectedEventData }) => {

    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
    

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
        setEventClicked(true); // Solo booleano
        setSelectedEventData(event); // Guardamos los datos base

        setAsigCodeMod(event.codigo);
        setAsigInitialsMod(event.siglas);
        setAsigDayMod(event.dia);

        const startTime = new Date(event.start);
        // Obtener la hora y los minutos locales
        const hours = startTime.getHours();
        const minutes = startTime.getMinutes();

        // Formatear la hora en H:mm o HH:mm según corresponda
        const formattedTime = hours < 10 
        ? `${hours}:${minutes < 10 ? '0' + minutes : minutes}`  // Formato H:mm si la hora es menor a 10
        : `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;  // Formato HH:mm si la hora es 10 o mayor

        // Establecer el tiempo en el estado
        setAsigStartTimeMod(formattedTime);
        console.log("tiempo formateado", formattedTime);
        setAsigColorMod(event.color);
        setAsigFullNameMod(event.nombre);
        setAsigSemesterMod(event.semestre);
        setAsigClassMod(event.aula);
        setAsigTeacherMod(event.profesor);

        // Obtener número del grupo (por ejemplo, "1" de "T1")
        const groupMatch = event.grupo.match(/\d+/);
        setAsigGroupNumberMod(groupMatch ? groupMatch[0] : "");

        // Obtener tipo de grupo (por ejemplo, "T" de "T1")
        const typeMatch = event.grupo.match(/[A-Z]+/);
        setAsigGroupTypeMod(typeMatch ? typeMatch[0] : "");

        // Grupo de laboratorio
        setAsigLabGroupMod(event.grupoLaboratorio);

        // Duración (en horas enteras)
        const start = new Date(event.start);
        const end = new Date(event.end);
        const durationHours = Math.round((end - start) / (1000 * 60 * 60));
        setAsigDurationMod(durationHours);

        // Cursos por grado y mención
        const grado = event.grado;
        const mencion = event.mencion;
        const curso = event.curso;

        if (grado === "INF") {
            if (mencion === "IS") setAsigCourseGII_ISMod(curso);
            if (mencion === "TI") setAsigCourseGII_TIMod(curso);
            if (mencion === "CO") setAsigCourseGII_COMod(curso);
        }

        if (grado === "EST") setAsigCourse_ESTMod(curso);
        if (grado === "I + E") setAsigCourse_INDatMod(curso);
        if (grado === "Master") setAsigCourse_MasterMod(curso);
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
        </div>            
    )
}
