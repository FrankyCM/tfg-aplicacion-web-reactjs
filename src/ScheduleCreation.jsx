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
import html2pdf from "html2pdf.js";

const ScheduleCreation = ({diasSemana, gradeMap, semesterMap, courseMap, mentionMap}) => {
    const [events, setEvents] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado
    const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado 
    const [selectedCourse, setSelectedCourse] = useState(""); // Curso seleccionado
    const [selectedGroup, setSelectedGroup] = useState(""); // Grupo seleccionado
    const [selectedMention, setSelectedMention] = useState(""); // Mencion seleccionada
    const [filteredAsigs, setFilteredAsigs] = useState([]); // Eventos de asignaturas filtradas
    const [warningMessage, setWarningMessage] = useState(null); // Mensaje de aviso en situaciones de incompatibilidad
    const [save, setSave] = useState(false)     // Si se decide guardar el horario modificado
    const [exportPDF, setExportPDF] = useState(false)   // Si se decide exportar a PDF
    
    const localizer = momentLocalizer(moment);
    moment.locale('es');

    const [asignaturas, setAsignaturas] = useState([]);


    const DnDCalendar = withDragAndDrop(Calendar);

    useEffect(() => {
              const cargarAsignaturas = async () => {
                try {
                  const response = await fetch("/asignaturas.json");
                  const data = await response.json();
          
                  setAsignaturas(data); // Guardar asignaturas en el estado
          
                  const eventos = data.map((asignatura) => {
                    const diaSemana = diasSemana[asignatura.Dia];
                    if (diaSemana === undefined) return null;
          
                    const [hora, minutos] = asignatura.HoraInicio.split(":").map(Number);
          
                    // Obtener el lunes de la semana actual
                    const hoy = moment();
                    const lunesSemanaActual = hoy.clone().startOf("isoWeek");
          
                    // Calcular la fecha del día de la asignatura dentro de esta semana
                    const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
                      hour: hora,
                      minute: minutos,
                      second: 0,
                    }).toDate();
          
                    const fin = moment(inicio).add(parseInt(asignatura.Duracion), "hours").toDate();
          
                    return {
                      id: `${asignatura.Dia} - ${asignatura.Siglas} - ${asignatura.Grupo} - ${asignatura.Clase} - ${asignatura.HoraInicio}`,
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
                      color: asignatura.Color,
                      dia: asignatura.Dia
                    };
                  }).filter(Boolean);
          
                  setEvents(eventos);
                } catch (error) {
                  console.error("Error cargando los datos del JSON:", error);
                }
              };
          
              cargarAsignaturas();
    }, []);
    
    useEffect(() => {
        if (!exportPDF) return; // Evita ejecutar si exportPDF es false

        const contenido = document.getElementById("creacion-horarios-horario-cabeceraDocumento");

        if (!contenido) {
            console.error("No se encontró el elemento con ID 'creacion-horarios-horario-cabeceraDocumento'");
            return;
        }

        // 🔹 Obtener valores mapeados
        const curso = courseMap[selectedCourse] || selectedCourse;
        const semestre = semesterMap[selectedSemester] || selectedSemester;
        
        // 🔹 Generar año académico en formato "2024/25"
        const añoActual = new Date().getFullYear() - 1;
        const añoSiguiente = (añoActual + 1) % 100; // Solo los dos últimos dígitos
        const anho = `${añoActual}/${añoSiguiente}`;

        let extraInfo = "";

        if (selectedGrade === "INF") {
            if (selectedCourse === "1º" || selectedCourse === "2º") {
                extraInfo = selectedGroup ? `${selectedGroup}` : "";
            } else if (selectedCourse === "3º" || selectedCourse === "4º") {
                extraInfo = selectedMention ? `${selectedMention}` : "";
            }
        }

        const filename = `Horario_${selectedGrade}_${curso}_${semestre}_${extraInfo}_${anho}.pdf`;

        const parametrosPDF = {
            margin: 10,  // Aumenta el margen si deseas más espacio alrededor
            filename: filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { 
                scale: 4, 
                scrollY: 0, 
                windowWidth: document.documentElement.scrollWidth, 
                windowHeight: document.documentElement.scrollHeight 
            },
            jsPDF: { 
                unit: "mm", 
                format: "a4",  // Cambia el formato a A3
                orientation: "landscape" 
            },
        };
        

        html2pdf().set(parametrosPDF).from(contenido).save().then(() => {
            setExportPDF(false); // Resetea el estado después de exportar
        });

    }, [exportPDF]);

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

    useEffect(() => {
        if (save === false) return;
      
        const actualizarAsignaturasJSON = async () => {
          try {
            // Obtener eventos actualizados del estado
            const eventosActualizados = events.map(evento => ({
              Dia: evento.dia, // Día ya guardado en el estado de eventos
              HoraInicio: moment(evento.start).format("HH:mm"),
              Duracion: moment(evento.end).diff(moment(evento.start), "hours"),
              Siglas: evento.siglas,
              Nombre: evento.nombre,
              Grado: evento.grado,
              Semestre: evento.semestre,
              Curso: evento.curso,
              Grupo: evento.grupo,
              Mencion: evento.mencion,
              Clase: evento.aula,
              Profesor: evento.profesor,
              Color: evento.color
            }));
      
            // Escribir el JSON actualizado en el archivo
            const response = await fetch("http://localhost:5000/asignaturas", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventosActualizados, null, 2)
            });
      
            if (!response.ok) throw new Error("Error al actualizar asignaturas.json");
      
            console.log("Asignaturas actualizadas con éxito.");
          } catch (error) {
            console.error("Error al actualizar los eventos en JSON:", error);
          }
        };
      
        actualizarAsignaturasJSON();
        setSave(false);
    }, [save]);
      

    const getTextoGrado = () => {
        if (!selectedGrade || !selectedSemester) return "";

        // 🔹 Generar año académico en formato "2024/25"
        const añoActual = new Date().getFullYear() - 1;
        const añoSiguiente = (añoActual + 1) % 100; // Solo los dos últimos dígitos
        const anho = `${añoActual}/${añoSiguiente}`;

        return `${gradeMap[selectedGrade]}, ${semesterMap[selectedSemester]}, Curso ${anho}`;
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
        const compatible = compruebaCompatibilidadEventos({ event, start, end });
        if (compatible) {
            // Obtener el nuevo día de la semana basado en 'start'
            const nuevoDiaSemana = moment(start).isoWeekday(); // 1 (Lunes) - 7 (Domingo)
            const nuevoDia = Object.keys(diasSemana).find(key => diasSemana[key] === nuevoDiaSemana);
    
            console.log("🛠 Evento desplazado:");
            console.log("🔹 Siglas:", event.siglas);
            console.log("📅 Nuevo Día:", nuevoDia);
            console.log("🕒 Nueva Hora de Inicio:", moment(start).format("YYYY-MM-DD HH:mm"));
            console.log("⏳ Nueva Hora de Fin:", moment(end).format("YYYY-MM-DD HH:mm"));
    
            // Actualizar el evento con 'start', 'end' y el nuevo día
            setEvents((prevEvents) =>
                prevEvents.map((e) =>
                    e.id === event.id ? { ...e, start, end, dia: nuevoDia } : e
                )
            );
        }
    };
      
    const compruebaCompatibilidadEventos = ({ event, start, end }) => {
        let conflictMessage = "";
        let eventosFiltrados = [];

        if (selectedGrade === "INF") {
            if (selectedCourse === "3º" || selectedCourse === "4º") {
                eventosFiltrados = events.filter(e =>
                    e.grado === selectedGrade &&
                    e.semestre === selectedSemester &&
                    e.curso === selectedCourse &&
                    e.mencion === selectedMention
                );
            } else {
                eventosFiltrados = events.filter(e =>
                    e.grado === selectedGrade &&
                    e.semestre === selectedSemester &&
                    e.curso === selectedCourse &&
                    (!selectedGroup || e.grupo === selectedGroup)
                );
            }
        } else if (selectedGrade === "EST" || selectedGrade === "I + E") {
            eventosFiltrados = events.filter(e =>
                e.grado === selectedGrade &&
                e.semestre === selectedSemester &&
                e.curso === selectedCourse
            );
        } else if (selectedGrade === "Master") {
            eventosFiltrados = events.filter(e =>
                e.grado === selectedGrade &&
                e.semestre === selectedSemester &&
                e.curso === "1º"
            );
        }

        const hasConflict = eventosFiltrados.some((e) => {
            const isSameTime = e.start < end && e.end > start; // Verifica superposición de tiempo
            
            if (isSameTime) {
                console.log("e.profesor: " + e.profesor + " y event.profesor: " + event.profesor)
                console.log("e.aula: " + e.aula + " y event.aula: " + event.aula)
                if(e.id !== event.id && e.profesor === event.profesor && e.aula === event.aula){
                    conflictMessage = `Incompatibilidad horaria, eventos distintos no pueden tener al profesor ${event.profesor} impartiendo al mismo tiempo y usando el mismo aula.`
                    console.log(conflictMessage + "primer if");
                    return true;
                }
                if (e.id !== event.id && e.profesor === event.profesor) {
                    conflictMessage = `Incompatibilidad horaria, eventos distintos no pueden tener al profesor ${event.profesor} impartiendo al mismo tiempo.`;
                    console.log(conflictMessage + "segundo if");
                    return true;
                }
                if (e.id !== event.id && e.aula === event.aula) {
                    conflictMessage = `Incompatibilidad horaria, eventos distintos no pueden emplear el aula ${event.aula} al mismo tiempo.`;
                    console.log(conflictMessage + "tercer if");
                    return true;
                }
                
            }
            return false;
        });
        
        if (hasConflict) {
            setWarningMessage(conflictMessage);
            return false;
        }
        console.log("hay comp")
        return true;
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
                    warningMessage={warningMessage} setSave={setSave} setExportPDF={setExportPDF}
                    />
                    <div className="creacion-horarios-horario" id="creacion-horarios-horario">
                        <div className="creacion-horarios-horario-cabeceraDocumento" id="creacion-horarios-horario-cabeceraDocumento">
                            <h2 className="creacion-horarios-horario-textoGrado">
                            {getTextoGrado()}
                            </h2>
                            <h2 className="creacion-horarios-horario-textoCursoMencion">
                            {getTextoCursoMencion()}
                            </h2>
                            <div className="creacion-horarios-horario-horario">                        
                                <div className="creacion-horarios-horario-calendarioContainer" style={{ flexGrow: 1 }}>
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
                                                height: exportPDF ? "1000px" : "1000px",  // Si se exporta, reducimos altura
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


                                <div className="creacion-horarios-horario-asignaturasHorario" id="creacion-horarios-horario-asignaturasHorario">
                                    {filteredAsigs.length > 0 ? (
                                    [...new Set(filteredAsigs.map(evento => evento.siglas))].map(sigla => {
                                        const asignatura = asignaturas.find(asig => asig.Siglas === sigla);
                                            return (
                                                <div key={sigla} className="creacion-horarios-asignaturaItem">
                                                    <p className="creacion-horarios-siglasAsignatura">{sigla}:</p>
                                                    <p className="creacion-horarios-nombreCompletoAsignatura">{asignatura?.Nombre || sigla}</p>
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