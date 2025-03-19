import './Common.css';
import LogoutButton from './LogoutButton';
import './ScheduleCreation.css';
import { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css';
import { CalendarEvent } from './CalendarEvent';
import FloatingFilterScheduleMenu from './FloatingFilterScheduleMenu';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ScheduleCreation = ({asignaturasJSON, diasSemana, gradeMap, semesterMap, courseMap, mentionMap}) => {
    const [events, setEvents] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado
    const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado 
    const [selectedCourse, setSelectedCourse] = useState(""); // Curso seleccionado
    const [selectedGroup, setSelectedGroup] = useState(""); // Grupo seleccionado
    const [selectedMention, setSelectedMention] = useState(""); // Mencion seleccionada
    const [filteredAsigs, setFilteredAsigs] = useState([]); // Eventos de asignaturas filtradas

    const localizer = momentLocalizer(moment);
    moment.locale('es');
    const DnDCalendar = withDragAndDrop(Calendar);

    useEffect(() => {
        const eventos = asignaturasJSON.map((asignatura) => {
            const diaSemana = diasSemana[asignatura.Dia];
            if (diaSemana === undefined) return null;
          
              const [hora, minutos] = asignatura.HoraInicio.split(":").map(Number);
          
              // Obtener el lunes de la semana actual
              const hoy = moment();
              const lunesSemanaActual = hoy.clone().startOf('isoWeek'); // Lunes de la semana actual
          
              // Calcular la fecha del día de la asignatura dentro de esta semana
              const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
                hour: hora,
                minute: minutos,
                second: 0
              }).toDate();
          
              const fin = moment(inicio).add(parseInt(asignatura.Duracion), "hours").toDate();
          
              return {
                title: `${asignatura.Siglas} \n \n ${asignatura.Grupo} - ${asignatura.Clase}`,
                start: inicio,
                end: fin,
                nombre: asignatura.Nombre,
                siglas: asignatura.Siglas, 
                grado: asignatura.Grado,
                semestre: asignatura.Semestre,
                curso: asignatura.Curso,
                grupo: asignatura.Grupo,
                mencion: asignatura.Mencion,
                aula: asignatura.Clase,
                profesor: asignatura.Profesor,
                color: asignatura.Color
              };
            }).filter(Boolean);
          
            setEvents(eventos);
    }, []);

    // useEffect para la parte de visualizacion de calendarios genericos
    useEffect(() => {
        if (!selectedGrade || !selectedSemester) {
            setFilteredAsigs([]);
        } else {
            let asignaturasFiltradas;
    
            if(selectedGrade === "INF"){
              if (selectedCourse === "3º" || selectedCourse === "4º") {
                asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse &&
                evento.mencion === selectedMention
                );
              } else {
                asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso ===  selectedCourse &&
                (!selectedGroup || evento.grupo === selectedGroup)
                );
              }
            }
    
            if(selectedGrade === "EST" || selectedGrade === "I + E"){
              asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse);
            }
    
            if(selectedGrade === "Master"){
              asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === "1º");
            }
            
            console.log("Eventos filtrados:", asignaturasFiltradas);
            setFilteredAsigs(asignaturasFiltradas);
        }
    }, [selectedGrade, selectedSemester, selectedCourse, selectedGroup, selectedMention, events]);

    const getTextoGrado = () => {
        if (!selectedGrade || !selectedSemester) return "";
        return `${gradeMap[selectedGrade]}, ${semesterMap[selectedSemester]}, Curso 2024/25`;
    };
    
    const getTextoCursoMencion = () => {
      let selectedCourseText = ""; 
      let mentionText = "";
  
      if (selectedGrade === "Master" && selectedSemester) {
          selectedCourseText = courseMap["1º"]; // Asignar el primer curso del máster directamente
      } else if (selectedCourse) {
          selectedCourseText = courseMap[selectedCourse] || ""; // Solo buscar si hay un curso seleccionado
      } else {
          return ""; // Si no es master y no hay curso, retornar vacío
      }
  
      if (
          selectedMention &&
          ["3º", "4º"].includes(selectedCourse) &&
          selectedGrade === "INF"
      ) {
          mentionText = mentionMap[selectedMention] || "";
      }
  
      return mentionText ? `${selectedCourseText}, ${mentionText}` : selectedCourseText;
    };

    const onEventDrop = ({ event, start, end }) => {
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.id === event.id ? { ...e, start, end } : e
          )
        );
      };

    return(
        <>
            <div className="creacion-horarios">
                <div className="creacion-horarios-cerrar-sesion">
                    <LogoutButton color={`#edbeba`} text={`Cerrar sesión`}/>
                </div>
                <div className="creacion-horarios-menu-y-horario">
                    <FloatingFilterScheduleMenu
                    selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
                    selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester}
                    selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}
                    selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}
                    selectedMention={selectedMention} setSelectedMention={setSelectedMention}
                    />
                    <div className="creacion-horarios-horario">
                        <div className="creacion-horarios-horario-cabeceraDocumento">
                            <h2 className="creacion-horarios-horario-textoGrado">
                            {getTextoGrado()}
                            </h2>
                            <h2 className="creacion-horarios-horario-textoCursoMencion">
                            {getTextoCursoMencion()}
                            </h2>
                            <div className="creacion-horarios-horario-horario">                        
                                <div className="calendarioContainer" style={{ flexGrow: 1 }}>
                                    <DndProvider backend={HTML5Backend}>
                                        <DnDCalendar
                                            localizer={localizer}
                                            events={filteredAsigs}
                                            startAccessor="start"
                                            endAccessor="end"
                                            views={{ week: true }}
                                            defaultView={Views.WEEK}
                                            toolbar={false}
                                            style={{ 
                                            height: 1000, // Se adapta mejor a la pantalla
                                            width: "100%",
                                            backgroundColor: "#f8f9fa", // Un gris claro para suavizar la interfaz
                                            borderRadius: "12px", // Bordes más redondeados
                                            padding: "10px", // Espaciado interno
                                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Sombra ligera para destacar
                                            }}
                                            defaultDate={(() => {     // Por alguna razon esto es necesario porque si es 
                                                                    // domingo no se muestran los eventos en el calendario (?)
                                            const today = new Date();
                                            const dayOfWeek = today.getDay();
                                            if (dayOfWeek === 0) {
                                                // Si hoy es domingo, mover la vista al lunes pasado
                                                return new Date(today.setDate(today.getDate() - 6));
                                            } else if (dayOfWeek === 6) {
                                                // Si hoy es sábado, mover la vista al lunes pasado
                                                return new Date(today.setDate(today.getDate() - 5));
                                            }
                                            return today;
                                            })()}
                                            min={new Date(2023, 0, 1, 8, 0)}
                                            max={new Date(2023, 0, 1, 21, 0)}
                                            showCurrentTimeIndicator={false}
                                            dayLayoutAlgorithm="no-overlap"

                                            formats={{
                                            dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture),
                                            weekdayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture)
                                            }}

                                            components={{
                                            event: CalendarEvent,
                                            }}

                                            // Utiliza la propiedad `eventPropGetter` para controlar qué días mostrar
                                            dayPropGetter={(date) => {
                                            const dayOfWeek = date.getDay();
                                            // Devuelve un estilo especial para los días no deseados (sábado o domingo)
                                            if (dayOfWeek === 0 || dayOfWeek === 6) {
                                                return {
                                                style: {
                                                    display: 'none',

                                                },
                                                };
                                            }
                                            return {}; // Deja los días lunes a viernes como están
                                            }}

                                            eventPropGetter={(event) => {
                                            return {
                                                style: {
                                                backgroundColor: event.color, // Color del JSON
                                                color: "#000", // Ajusta el color del texto si es necesario
                                                borderRadius: "8px", // Bordes redondeados
                                                border: "1px solid rgba(0, 0, 0, 0.2)", // Borde ligero para contraste
                                                marginLeft: 5, // Centra el elemento en la celda
                                                }
                                            };
                                            }}

                                            onEventDrop={onEventDrop}

                                        />
                                    </DndProvider>
                                    
                                    </div>
                                </div>


                                <div className="creacion-horarios-horario-asignaturasHorario">
                                    {filteredAsigs.length > 0 ? (
                                    [...new Set(filteredAsigs.map(evento => evento.siglas))].map(sigla => {
                                        const asignatura = asignaturasJSON.find(asig => asig.Siglas === sigla);
                                            return (
                                                <div key={sigla} className="asignaturaItem">
                                                    <p className="siglasAsignatura">{sigla}:</p>
                                                    <p className="nombreCompletoAsignatura">{asignatura?.Nombre || sigla}</p>
                                                </div>
                                            );
                                    })
                                    ) : null}
                                </div>


                            </div>
                        </div> 
                    </div>
            </div>
        </>
    )
}

export default ScheduleCreation;