import './GenericVisualization.css';
import React, { useState, useEffect } from 'react';
import { CalendarEvent } from './CalendarEvent';
import FiltersSection from './FiltersSection';
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css';

export const GenericVisualization = ({diasSemana, gradeMap, semesterMap, courseMap, mentionMap}) => {
    const [events, setEvents] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado por el alumno
    const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado por el alumno
    const [selectedCourse, setSelectedCourse] = useState(""); // Curso seleccionado por el alumno para FiltersSection
    const [selectedGroup, setSelectedGroup] = useState(""); // Grupo seleccionado por el alumno
    const [selectedMention, setSelectedMention] = useState(""); // Mencion seleccionada por el alumno para FiltersSection
    const [filteredAsigs, setFilteredAsigs] = useState([]); // Eventos de asignaturas filtradas en FiltersSection 
    const [subjects, setSubjects] = useState([]); // Almacena las asignaturas leidas que cumplen los criterios
    const [includeLabs, setIncludeLabs] = useState(false);


    const localizer = momentLocalizer(moment);
    moment.locale('es');

    useEffect(() => {
      const cargarAsignaturas = async () => {
        try {
          const response = await fetch("/asignaturas.json");
          const data = await response.json();
  
          setSubjects(data); // Guardar asignaturas en el estado
  
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


    // useEffect para la parte de visualizacion de calendarios genericos
    useEffect(() => {
    if (!selectedGrade || !selectedSemester) {
        setFilteredAsigs([]);
    } else {
        let asignaturasFiltradas;
        console.log(includeLabs);
        if(selectedGrade === "INF"){
          if (selectedCourse === "3º" || selectedCourse === "4º") {
            if(includeLabs){
              asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse &&
                evento.mencion === selectedMention &&
                (evento.grupo.startsWith("L") ||
                evento.grupo.startsWith("W") ||
                evento.grupo.startsWith("T"))
                );
            } else {
              asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse &&
                evento.mencion === selectedMention &&
                evento.grupo.startsWith("T")
                );
            } 
            
            
          } else {

              if (!selectedGroup && !includeLabs) {
                // Caso 1: No hay selectedGroup y includeLabs === false
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo.startsWith("T")
                );
            } else if (!selectedGroup && includeLabs) {
                // Caso 2: No hay selectedGroup y includeLabs === true
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    (evento.grupo.startsWith("X") || 
                    evento.grupo.startsWith("L") || 
                    evento.grupo.startsWith("AS") || 
                    evento.grupo.startsWith("J") ||
                    evento.grupo.startsWith("K") ||
                    evento.grupo.startsWith("Y") ||
                    evento.grupo.startsWith("T"))
                );
            } else if (selectedGroup && !includeLabs) {
                // Caso 3: Hay selectedGroup y includeLabs === false
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo === selectedGroup
                );
            } else if (selectedGroup && includeLabs) {
                // Caso 4: Hay selectedGroup y includeLabs === true
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    (evento.grupo === selectedGroup || 
                    evento.grupo.startsWith("X") ||  
                    evento.grupo.startsWith("L") || 
                    evento.grupo.startsWith("AS") || 
                    evento.grupo.startsWith("J") ||
                    evento.grupo.startsWith("K") ||
                    evento.grupo.startsWith("Y") )
                );
            }

          }
        }

        if(selectedGrade === "EST"){
          if(includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo === "T1" || 
              evento.grupo.startsWith("T/L") ||
              evento.grupo.startsWith("L") ||
              evento.grupo.startsWith("X") ||
              evento.grupo.startsWith("J") ||
              evento.grupo.startsWith("TL"))
            );
          } else {
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              evento.grupo === "T1"
            );
          }
          
        }

        if(selectedGrade === "I + E"){
          if(includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo === "T1" ||
              evento.grupo.startsWith("T/L") ||
              evento.grupo.startsWith("L") ||
              evento.grupo.startsWith("AS") || 
              evento.grupo.startsWith("X") ||
              evento.grupo.startsWith("J") ||
              evento.grupo.startsWith("Y") ||
              evento.grupo.startsWith("K"))
            );
          } else {
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              evento.grupo === "T1"
            );
          }
          
        }

        if(selectedGrade === "Master"){
          if(includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              (evento.grupo === "T1" ||
              evento.grupo.startsWith("L"))
            );
          } else {
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              evento.grupo === "T1"
            );
          }
          
        }
        
        console.log("Eventos filtrados:", asignaturasFiltradas);
        setFilteredAsigs(asignaturasFiltradas);
    }
    }, [selectedGrade, selectedSemester, selectedCourse, selectedGroup, selectedMention, includeLabs, events]); 
      
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
    

    
    return (
        <>
        <div className="cabeceraDocumento">
            <FiltersSection selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} selectedMention={selectedMention} setSelectedMention={setSelectedMention} includeLabs={includeLabs} setIncludeLabs={setIncludeLabs}/>
        <h2 className="textoGrado">
          {getTextoGrado()}
        </h2>
        <h2 className="textoCursoMencion">
          {getTextoCursoMencion()}
        </h2>
        <div className="horario">
          
          <div className="horasYSecciones">
            
            <div className="calendarioContainer" style={{ flexGrow: 1 }}>
            <Calendar
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

              />
            </div>
          </div>


          <div className="asignaturasHorario">
            {filteredAsigs.length > 0 ? (
              [...new Set(filteredAsigs.map(evento => evento.siglas))].map(sigla => {
                const asignatura = subjects.find(asig => asig.Siglas === sigla);
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
    )
}