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
import html2pdf from "html2pdf.js";

export const GenericVisualization = ({diasSemana, gradeMap, semesterMap, courseMap, mentionMap}) => {
    const [events, setEvents] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado por el alumno
    const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado por el alumno
    const [selectedCourse, setSelectedCourse] = useState(""); // Curso seleccionado por el alumno para FiltersSection
    const [selectedGroup, setSelectedGroup] = useState(""); // Grupo seleccionado por el alumno
    const [selectedMention, setSelectedMention] = useState(""); // Mencion seleccionada por el alumno para FiltersSection
    const [filteredAsigs, setFilteredAsigs] = useState([]); // Eventos de asignaturas filtradas en FiltersSection 
    const [includeLabs, setIncludeLabs] = useState(false); // Opcion del usuario sobre mostrar o no las clases de lab
    const [exportPDF, setExportPDF] = useState(false); // Opcion -> si se decide exportar a PDF

    
    moment.locale('es');
    const localizer = momentLocalizer(moment);
    console.log(moment().format('dddd'))
    const messages = {
      week: 'Semana',
      work_week: 'Semana laboral',
      day: 'Día',
      month: 'Mes',
      previous: 'Anterior',
      next: 'Siguiente',
      today: 'Hoy',
      agenda: 'Agenda',
      date: 'Fecha',
      time: 'Hora',
      event: 'Evento',
      showMore: (total) => `+${total} más`,
    }

    useEffect(() => {
      const cargarAsignaturas = async () => {
        try {
          const response = await fetch("/asignaturas.json");
          const data = await response.json();

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
              id: `${asignatura.Dia} - ${asignatura.Siglas} - ${asignatura.Grupo} - ${asignatura.GrupoLaboratorio} - ${asignatura.Clase} - ${asignatura.HoraInicio}`,
              title: `${asignatura.Siglas} \n \n ${asignatura.Grupo} - ${asignatura.Clase}`,
              start: inicio,
              end: fin,
              nombre: asignatura.Nombre,
              siglas: asignatura.Siglas,
              grado: asignatura.Grado,
              semestre: asignatura.Semestre,
              curso: asignatura.Curso,
              grupo: asignatura.Grupo,
              grupoLaboratorio: asignatura.GrupoLaboratorio,
              mencion: asignatura.Mencion,
              aula: asignatura.Clase,
              profesor: asignatura.Profesor,
              color: asignatura.Color,
              dia: asignatura.Dia,
              codigo: asignatura.Codigo
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
      if (exportPDF) {
        if (selectedGrade && selectedSemester) {
            if (!selectedCourse) {
                alert("El horario está vacío".trim());
                setExportPDF(false);
                return;
            }
            if ((selectedCourse === "3º" || selectedCourse === "4º") && !selectedMention) {
                alert("El horario está vacío".trim());
                setExportPDF(false);
                return;
            }
        } else if (!selectedGrade && !selectedSemester) {
            alert("El horario está vacío".trim());
            setExportPDF(false);
            return;
        }
      }

      if (!exportPDF || !filteredAsigs) return; // Evita ejecutar si no se quiere exportar a pdf o si el horario está vacio
    
            const contenido = document.getElementById("cabecera-documento-generic");
    
            if (!contenido) {
                console.error("No se encontró el elemento con ID 'cabecera-documento-generic'");
                return;
            }
    
            // 🔹 Obtener valores mapeados
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
    
            const filename = `Horario_${selectedGrade}_${semestre}_${selectedCourse}_${extraInfo}_${anho}.pdf`;
    
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
    
    }, [exportPDF, filteredAsigs]);


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
                evento.grupo.startsWith("T") &&
                (evento.grupoLaboratorio.startsWith("L") ||
                evento.grupoLaboratorio.startsWith("W") ||
                evento.grupoLaboratorio === "")
                );
            } else {
              asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse &&
                evento.mencion === selectedMention &&
                evento.grupo.startsWith("T") &&
                evento.grupoLaboratorio === ""
                );
            } 
            
            
          } else {

              if (!selectedGroup && !includeLabs) {
                // Caso 1: No hay selectedGroup y includeLabs === false
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo.startsWith("T") && 
                    evento.grupoLaboratorio === ""
                );
            } else if (!selectedGroup && includeLabs) {
                // Caso 2: No hay selectedGroup y includeLabs === true
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo.startsWith("T") &&
                    (evento.grupoLaboratorio.startsWith("X") || 
                    evento.grupoLaboratorio.startsWith("L") || 
                    evento.grupoLaboratorio.startsWith("AS") || 
                    evento.grupoLaboratorio.startsWith("J") ||
                    evento.grupoLaboratorio.startsWith("K") ||
                    evento.grupoLaboratorio.startsWith("Y") ||
                    evento.grupoLaboratorio === "")
                );
            } else if (selectedGroup && !includeLabs) {
                // Caso 3: Hay selectedGroup y includeLabs === false
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo === selectedGroup &&
                    evento.grupoLaboratorio === ""
                );
            } else if (selectedGroup && includeLabs) {
                // Caso 4: Hay selectedGroup y includeLabs === true
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    (evento.grupo === selectedGroup && 
                    (evento.grupoLaboratorio.startsWith("X") ||  
                    evento.grupoLaboratorio.startsWith("L")  || 
                    evento.grupoLaboratorio.startsWith("AS") || 
                    evento.grupoLaboratorio.startsWith("J")  ||
                    evento.grupoLaboratorio.startsWith("K")  ||
                    evento.grupoLaboratorio.startsWith("Y")  ||
                    evento.grupoLaboratorio === ""))
                );
            }

          }
        }

        if(selectedGrade === "EST"){
          if(!selectedGroup && includeLabs) {
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo.startsWith("T") && 
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("TL") ||
              evento.grupoLaboratorio === ""))
            );
          }
          if(selectedGroup && includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo === selectedGroup && 
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("TL") ||
              evento.grupoLaboratorio === ""))
            );
          } 
          
          if(selectedGroup && !includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              evento.grupo === selectedGroup &&
              evento.grupoLaboratorio === ""
            );
          }

          if(!selectedGroup && !includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              evento.grupo.startsWith("T") &&
              evento.grupoLaboratorio === ""
            );
          }
          
        }

        if(selectedGrade === "I + E"){
          if(!selectedGroup && includeLabs) {
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo.startsWith("T") &&
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("AS") || 
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("Y") ||
              evento.grupoLaboratorio.startsWith("K") ||
              evento.grupoLaboratorio === ""))
            );
          }
          if(selectedGroup && includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo === selectedGroup &&
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("AS") || 
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("Y") ||
              evento.grupoLaboratorio.startsWith("K") ||
              evento.grupoLaboratorio === ""))
            );
          }
           
          if(selectedGroup && !includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              evento.grupo === selectedGroup &&
              evento.grupoLaboratorio === ""
            );
          }

          if(!selectedGroup && !includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              evento.grupo.startsWith("T") &&
              evento.grupoLaboratorio === ""
            );
          }
          
        }

        if(selectedGrade === "Master"){
          if(includeLabs){
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              (evento.grupo === "T1" &&
              (evento.grupoLaboratorio.startsWith("L") || 
              evento.grupoLaboratorio === ""))
            );
          } else {
            asignaturasFiltradas = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              evento.grupo === "T1" &&
              evento.grupoLaboratorio === ""
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
        <div className="cabeceraDocumento" id="cabecera-documento-generic">
            <FiltersSection selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} selectedMention={selectedMention} setSelectedMention={setSelectedMention} includeLabs={includeLabs} setIncludeLabs={setIncludeLabs} setExportPDF={setExportPDF}/>
        <h2 className="textoGrado-generic">
          {getTextoGrado()}
        </h2>
        <h2 className="textoCursoMencion-generic">
          {getTextoCursoMencion()}
        </h2>
        <div className="horario">
          
          <div className="horasYSecciones">
            
            <div className="calendarioContainer" style={{ flexGrow: 1 }}>
            <Calendar
                localizer={localizer}
                culture="es"
                messages={messages}
                events={filteredAsigs}
                startAccessor="start"
                endAccessor="end"
                views={{ week: true }}
                defaultView={Views.WEEK}
                toolbar={false}
                style={{ 
                  height: 1000, // Se adapta mejor a la pantalla
                  width: "100%",
                  backgroundColor: "#ffffff", // Un gris claro para suavizar la interfaz
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

                
          <div className = "asignaturasHorario" style={{ paddingBottom: exportPDF ? "400px" : "40px" }}>        
            {filteredAsigs.length > 0 ? (
              // Obtener pares únicos de siglas y nombre
              [...new Map(
                events
                .filter(evento => filteredAsigs.some(f => f.siglas === evento.siglas && f.nombre === evento.nombre))
                .map(evento => [evento.siglas, evento.nombre])
                  )].map(([sigla, nombre]) => (
                    <div key={sigla} className="asignaturaItem">
                      <p className="siglasAsignatura">{sigla}:</p>
                      <p className="nombreCompletoAsignatura">{nombre}</p>
                    </div>
                  ))
                ) : null}
          </div>


        </div>
      </div>
    </>
    )
}