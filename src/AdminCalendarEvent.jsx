import './CalendarEvent.css'
import CalendarEventPopUp from './CalendarEventPopUp';
import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import React from 'react';

export const AdminCalendarEvent = ({
    event, setAsigCodeMod, setAsigInitialsMod,
    setAsigDayMod, setAsigStartTimeMod,
    setAsigColorMod, setAsigFullNameMod,
    setAsigSemesterMod, setAsigGroupNumberMod,
    setAsigLabGroupMod, setAsigGroupTypeMod,
    setAsigDurationMod, setAsigClassMod,
    setAsigCourseGII_ISMod, setAsigCourseGII_TIMod,
    setAsigCourseGII_COMod, setAsigCourse_ESTMod,
    setAsigCourse_INDatMod, setAsigCourse_MasterMod,
    setAsigTeacherMod, setEventClicked, asigIncompatibilitiesIds}) => {

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
        //console.log("tiempo formateado", formattedTime);
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
            //if (mencion === null || mencion === undefined || mencion === "") setAsigCourseGII_COMod(curso);
        }

        if (grado === "EST") setAsigCourse_ESTMod(curso);
        if (grado === "I + E") setAsigCourse_INDatMod(curso);
        if (grado === "Master") setAsigCourse_MasterMod(curso);
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

    /*useEffect(() => {
        console.log("IDs de incompatibilidad actualizados:", asigIncompatibilitiesIds);
        // Aquí puedes forzar una lógica o acción
      }, [asigIncompatibilitiesIds]);*/

      //console.log("id de ev:", event.id);
    return (
        <div className="evento-calendario" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} title="" onClick={handleEventClick}>
            <strong className="evento-calendario-siglas">
                {event.siglas}
                {event.id in asigIncompatibilitiesIds && (
                    <Icon
                        name="exclamation triangle"
                        color="red"
                        style={{ marginLeft: '6px' }}
                        title={asigIncompatibilitiesIds[event.id]}
                    />
                )}
            </strong>
            {!event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio === "" && (
                <span className="evento-calendario-grupo-aula">{event.grupo} - {event.aula}</span>
            )}
            
            {event.aula.startsWith("L") && event.grupo.startsWith("T") && event.grupoLaboratorio !== "" && calculateEventDuration(event)}
            

            {hoveredEvent && <CalendarEventPopUp event={hoveredEvent} position={popUpPosition} backgroundColor={event.color} setHoveredEvent={setHoveredEvent}/>}
        </div>            
    )
}
