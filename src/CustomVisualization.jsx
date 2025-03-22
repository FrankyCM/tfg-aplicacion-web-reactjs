import React, { useState, useEffect } from 'react'
import { CalendarEvent } from './CalendarEvent'
import FiltersSectionCustom from './FiltersSectionCustom'
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css'

export const CustomVisualization = ({ diasSemana, gradeMap, semesterMap, courseMap, mentionMap}) => {
    const [events, setEvents] = useState([]);
    const [asigOptions, setAsigOptions] = useState([]);     // Listado de asignaturas creada en base a filtros en FiltersSectionCustom
    const [selectedAsigs, setSelectedAsigs] = useState([]); // Asignaturas seleccionadas en FiltersSectionCustom
    const [filteredEvents, setFilteredEvents] = useState([]); // Eventos filtrados en base a las asignaturas

    const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado por el alumno
    const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado por el alumno
    const [selectedCourses, setSelectedCourses] = useState([]); // Curso/s seleccionado por el alumno para FiltersSectionCustom
    const [selectedFirstGroup, setSelectedFirstGroup] = useState(null); // Grupo de asignaturas de primer curso
    const [selectedSecondGroup, setSelectedSecondGroup] = useState(null); // Grupo de asignaturas de segundo curso
    const [selectedThirdMention, setSelectedThirdMention] = useState(null); // Mencion de asignaturas de tercer curso
    const [selectedFourthMention, setSelectedFourthMention] = useState(null); // Mencion de asignaturas de cuarto curso
    const [selectedFifthGroup, setSelectedFifthGroup] = useState(null); // Grupo de asignaturas de quinto curso (solo para I + E)

    const [asignaturas, setAsignaturas] = useState([]);

    const localizer = momentLocalizer(moment);
    moment.locale('es');

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

    // useEffect para la creación de la lista de asignaturas que se muestra en el desplegable
    // de visualización personalizada de horarios
    useEffect(() => {
        if (!selectedGrade && !selectedSemester) {
            setAsigOptions([]);
        } else {
            let eventosFiltrados;
            if(selectedGrade === "INF"){
              // Filtrar eventos según los criterios actualizados
               eventosFiltrados = events.filter((evento) => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                selectedCourses.includes(evento.curso) &&
                  (
                    (selectedCourses.includes("1º") && evento.grupo === selectedFirstGroup && evento.curso === "1º") ||
                    (selectedCourses.includes("2º") && evento.grupo === selectedSecondGroup && evento.curso === "2º") ||
                    (["3º", "4º"].includes(evento.curso) &&
                      (selectedCourses.includes("3º") && evento.mencion === selectedThirdMention && evento.curso === "3º") ||
                      (selectedCourses.includes("4º") && evento.mencion === selectedFourthMention && evento.curso === "4º"))
                  )
                );
            }
            
            if(selectedGrade === "EST"){
              // Filtrar eventos según los criterios actualizados
                eventosFiltrados = events.filter((evento) => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                selectedCourses.includes(evento.curso) &&
                  (
                    (selectedCourses.includes("1º") && evento.grupo === "T1" && evento.curso === "1º") ||
                    (selectedCourses.includes("2º") && evento.grupo === "T1" && evento.curso === "2º") ||
                    (selectedCourses.includes("3º") && evento.grupo === "T1" && evento.curso === "3º") ||
                    (selectedCourses.includes("4º") && evento.grupo === "T1" && evento.curso === "4º")
                  )
                );
            }

            if(selectedGrade === "I + E"){
                // Filtrar eventos según los criterios actualizados
                eventosFiltrados = events.filter((evento) => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                selectedCourses.includes(evento.curso) &&
                  (
                    (selectedCourses.includes("1º") && evento.grupo === "T1" && evento.curso === "1º") ||
                    (selectedCourses.includes("2º") && evento.grupo === "T1" && evento.curso === "2º") ||
                    (selectedCourses.includes("3º") && evento.grupo === "T1" && evento.curso === "3º") ||
                    (selectedCourses.includes("4º") && evento.grupo === "T1" && evento.curso === "4º") ||
                    (selectedCourses.includes("5º") && evento.grupo === "T1" && evento.curso === "5º")
                  )
                );
            }

            if(selectedGrade === "Master"){
              // Filtrar eventos según los criterios actualizados
              eventosFiltrados = events.filter((evento) => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.grupo === "T1" &&
                evento.curso === "1º");
            }
    
            // Crear la lista de opciones de asignaturas con el formato adecuado
            const asigOptions = eventosFiltrados.map(evento => {
                
                const key = ["3º", "4º"].includes(evento.curso) 
                    ? `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.mencion}`
                    : `${evento.siglas} - ${evento.nombre} - ${evento.grupo}`;
                
                const text = ["3º", "4º"].includes(evento.curso)
                    ? `${evento.siglas} - ${evento.grupo} - ${evento.mencion}`
                    : `${evento.siglas} - ${evento.grupo}`;
    
                return {
                    key,
                    value: `${evento.siglas} - ${evento.nombre} - ${evento.grupo}`,
                    text
                };
            });
    
            setAsigOptions(asigOptions);
          }
    }, [selectedGrade, selectedSemester, selectedCourses, selectedFirstGroup, selectedSecondGroup, selectedThirdMention, selectedFourthMention, selectedFifthGroup, events]);
    
      
    // useEffect para el filtrado de eventos de asignaturas que hayan sido seleccionadas en el desplegable
    // de visualizacion personalizada de horarios
    useEffect(() => {
        if (selectedAsigs.length === 0) {
            setFilteredEvents([]);
        } else {
            const eventosFiltrados = events.filter(evento => {
                const asigFormato1 = `${evento.siglas} - ${evento.nombre} - ${evento.grupo}`;
                const asigFormato2 = `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.mencion}`;
                
                return (selectedAsigs.includes(asigFormato1) && selectedGrade === evento.grado) || (selectedAsigs.includes(asigFormato2) && selectedGrade === evento.grado);
            });
    
            setFilteredEvents(eventosFiltrados);
    
            console.log("Asignaturas filtradas:");
            eventosFiltrados.forEach(evento => {
                console.log(`${evento.siglas} - ${evento.nombre} - ${evento.grupo}`);
            });
        }
    }, [selectedAsigs, selectedGrade, events]);


    const getTextoGrado = () => {
        if (!selectedGrade || !selectedSemester) return "";
        return `${gradeMap[selectedGrade]}, ${semesterMap[selectedSemester]}, Curso 2024/25`;
    };

    const getTextoCursosMencion = () => {
      let selectedCoursesText = ""; 
      let mentionText = "";
  
      if (selectedGrade === "Master") {
          console.log("Entra en máster");
          selectedCoursesText = courseMap["1º"]; // Asigna el primer curso del máster directamente
          console.log(selectedCoursesText);
      } else if (selectedCourses.length > 0) {
          selectedCoursesText = selectedCourses.map(course => courseMap[course] || "").join(", ");
      } else {
          return ""; // Si no es máster y no hay cursos seleccionados, retorna vacío
      }
  
      if (
          (selectedThirdMention || selectedFourthMention) &&
          selectedCourses.some(course => ["3º", "4º"].includes(course)) &&
          selectedGrade === "INF"
      ) {
          mentionText = mentionMap[(selectedThirdMention || selectedFourthMention)] || "";
      }
  
      return mentionText && selectedCourses.length > 0 && 
          selectedCourses.every(course => ["3º", "4º"].includes(course)) 
          ? `${selectedCoursesText}, ${mentionText}` 
          : selectedCoursesText;
    };
  



    return (
        <>
          <div className="cabeceraDocumento">
            <FiltersSectionCustom selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} selectedFirstGroup={selectedFirstGroup} setSelectedFirstGroup={setSelectedFirstGroup} selectedSecondGroup={selectedSecondGroup} setSelectedSecondGroup={setSelectedSecondGroup} selectedThirdMention={selectedThirdMention} setSelectedThirdMention={setSelectedThirdMention} selectedFourthMention={selectedFourthMention} setSelectedFourthMention={setSelectedFourthMention} selectedFifthGroup={selectedFifthGroup} setSelectedFifthGroup={setSelectedFifthGroup} selectedAsigs={selectedAsigs} setSelectedAsigs={setSelectedAsigs} asigOptions={asigOptions} setFilteredEvents={setFilteredEvents}/>
            <h2 className="textoGrado">
              {getTextoGrado()}
            </h2>
            <h2 className="textoCursoMencion">
              {getTextoCursosMencion()}
            </h2>
            <div className="horario">
              
              <div className="horasYSecciones">
                
                <div className="calendarioContainer" style={{ flexGrow: 1 }}>
                <Calendar
                    localizer={localizer}
                    events={filteredEvents}
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
    
                  />
                </div>
              </div>
    
    
              <div className="asignaturasHorario">
                {filteredEvents.length > 0 ? (
                  [...new Set(filteredEvents.map(evento => evento.siglas))].map(sigla => {
                    const asignatura = asignaturas.find(asig => asig.Siglas === sigla);
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
        </>
      );


}