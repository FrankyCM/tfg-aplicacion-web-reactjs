import React, { useState, useEffect } from 'react'
import { CalendarEvent } from './CalendarEvent'
import FiltersSectionCustom from './FiltersSectionCustom'
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css';
import './CustomVisualization.css';
import html2pdf from "html2pdf.js";

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

    const [includeLabs, setIncludeLabs] = useState(false); // Opcion del usuario sobre mostrar o no las clases de lab
    const [exportPDF, setExportPDF] = useState(false); // Opcion -> si se decide exportar a PDF
    
   /* const asigColors = {
      "ADA": "#FFD4B4", 
      "DIS": "#EFC3C4", 
      "ADBD": "#FFEFAE", 
      "TDS": "#F1EFA5", 
      "ATG": "#AFC3C4", 
      "MOD": "#F7E3BE",
      "TAA": "#F7E3BE",
      "SMUL": "#F7E3BE",
      "DESI": "#F7E3BE",
      "SAII": "#F7E3BE",
      "ESI": "#F1EFA4",
      "LP": "#F1EFA4",
      "MTD": "#F1EFA4",
      "IFOR": "#E8CAA4",
      "FOE": "#00E0FC",
      "PAR": "#00E0FC",
      "POO": "#00E0FC",
      "ESO": "#00E0FC",
      "CPAR": "#00E0FC",
      "TDBD": "#00E0FC",
      "PAG": "#00E0FC",
      "SMOV": "#00E0FC",
      "RANO": "#00E0FC",
      "MDIS": "#F1EFA5",
      "FCOM": "#F1EFA5",
      "FMAT": "#F1F2EC",
      "AMAT": "#F1F2EC",
      "IPC": "#F1F2EC",
      "ICON": "#F1F2EC",
      "ASO": "#F1F2EC",
      "DIAS": "#F1F2EC",
      "PGP": "#F1F2EC",
      "PGPI": "#F1F2EC",
      "ESTD": "#F1F2EC",
      "FPROG": "#FECEA8",
      "SRS": "#FECEA8",
      "ACA": "#FECEA8",
      "CRIP": "#FECEA8",
      "PYS": "#FECEA8",
      "SDIG": "#FAD088",
      "SDIS": "#FAD088",
      "GSI": "#FAD088",
      "FRED": "#E0F6C3",
      "SSW": "#E0F6C3",
      "PDSC": "#E0F6C3",
      "MIO": "#E0F6C3",
      "PHI": "#FFCEA8",
      "EST": "#F9D423",
      "ARS": "#F9D423",
      "SEMP": "#F9D423",
      "INFE1": "#F9D423",
      "ABD": "#F9D423",
      "SIDO": "#F9D423",
      "MIND": "#F9D423",
      "FSO": "#F0B494",
      "AOC": "#F0B494",
      "FIS": "#F0B494",
      "ERSS": "#F0B494",
      "DASR": "#F0B494",
      "ALGC": "#F0B494",
      "GLF": "#F0B494",
      "EDA": "#F7E4BE",
      "FIA": "#F3EEA8"
    };*/

    moment.locale('es');
    const localizer = momentLocalizer(moment);

    const [asigColors, setAsigColors] = useState({});

    useEffect(() => {
          const cargarAsignaturas = async () => {
            try {
              const response = await fetch("/asignaturas.json");
              const data = await response.json();
      
              const asigColorObject = {};
              data.forEach((asig) => {
                const sigla = asig.Siglas;
                const color = asig.Color;
                if (sigla && color && !asigColorObject[sigla]) {
                  asigColorObject[sigla] = color;
                }
              });

              setAsigColors(asigColorObject);

              console.log("asigColors:", asigColorObject);

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
      if(exportPDF && selectedAsigs.length === 0){
        alert("El horario está vacío".trim());
        setExportPDF(false);
        return;
      }

      if (!exportPDF || !filteredEvents){
        return;
      } 
  
      // Verificar si faltan grupos o menciones
      const missingGroups = [];
      const missingMentions = [];
  
      if (selectedCourses.includes("1º") && !selectedFirstGroup) missingGroups.push("1º");
      if (selectedCourses.includes("2º") && !selectedSecondGroup) missingGroups.push("2º");
      if (selectedCourses.includes("3º") && !selectedThirdMention) missingMentions.push("3º");
      if (selectedCourses.includes("4º") && !selectedFourthMention) missingMentions.push("4º");
      if (selectedCourses.includes("5º") && !selectedFifthGroup) missingGroups.push("5º");
  
      if (missingGroups.length > 0 || missingMentions.length > 0) {
          let alertMessage = "";
          if (missingGroups.length > 0) {
              alertMessage += `Seleccione los grupos de los siguientes cursos: ${missingGroups.join(", ")}.\n`;
          }
          if (missingMentions.length > 0) {
              alertMessage += `Seleccione la mención de los siguientes cursos: ${missingMentions.join(" y ")}.`;
          }
          alert(alertMessage.trim());
          setExportPDF(false);
          return;
      }
  
      const contenido = document.getElementById("cabecera-documento-custom");
  
      if (!contenido) {
          console.error("No se encontró el elemento con ID 'cabecera-documento-custom'");
          return;
      }

      const semestre = semesterMap[selectedSemester] || selectedSemester;
  
      // Generar variable cursosYGrupos con los valores correspondientes
      const cursosYGrupos = [
          selectedFirstGroup ? `1º_${selectedFirstGroup}` : "",
          selectedSecondGroup ? `2º_${selectedSecondGroup}` : "",
          selectedThirdMention ? `3º_${selectedThirdMention}` : "",
          selectedFourthMention ? `4º_${selectedFourthMention}` : "",
          selectedFifthGroup ? `5º_${selectedFifthGroup}` : ""
      ].filter(Boolean).join("_");
  
      // 🔹 Generar año académico en formato "2024/25"
      const añoActual = new Date().getFullYear() - 1;
      const añoSiguiente = (añoActual + 1) % 100; // Solo los dos últimos dígitos
      const anho = `${añoActual}/${añoSiguiente}`;
  
      const filename = `Horario_${selectedGrade}_${semestre}_${cursosYGrupos}_${anho}.pdf`;
  
      const parametrosPDF = {
          margin: 10,
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
              format: "a4",
              orientation: "landscape"
          },
      };
  
      html2pdf().set(parametrosPDF).from(contenido).save().then(() => {
          setExportPDF(false); // Resetea el estado después de exportar
      });
  }, [exportPDF, filteredEvents, selectedCourses, selectedFirstGroup, selectedSecondGroup, selectedThirdMention, selectedFourthMention, selectedFifthGroup]);

    // useEffect para la creación de la lista de asignaturas que se muestra en el desplegable
    // de visualización personalizada de horarios
    useEffect(() => {
        if (!selectedGrade && !selectedSemester) {
            setAsigOptions([]);
        } else {
            let eventosFiltrados;
            if(selectedGrade === "INF"){
              if(includeLabs){
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  selectedCourses.includes(evento.curso) &&
                  (
                    (selectedCourses.includes("1º") && (evento.grupo === selectedFirstGroup && (evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("J") || evento.grupo.startsWith("K") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio === "")) && evento.curso === "1º") ||
                    (selectedCourses.includes("2º") && (evento.grupo === selectedSecondGroup && (evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("K") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio === "")) && evento.curso === "2º") ||
                    (["3º", "4º"].includes(evento.curso) &&
                      (selectedCourses.includes("3º") && (evento.mencion === selectedThirdMention && (evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("W") || evento.grupoLaboratorio === "") && evento.curso === "3º")) ||
                      (selectedCourses.includes("4º") && (evento.mencion === selectedFourthMention && (evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("W") || evento.grupoLaboratorio === "") && evento.curso === "4º"))
                  ))
                );
              } else {
                // Filtrar eventos según los criterios actualizados
                eventosFiltrados = events.filter((evento) => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                selectedCourses.includes(evento.curso) &&
                  (
                    (selectedCourses.includes("1º") && evento.grupo === selectedFirstGroup && evento.grupoLaboratorio === "" && evento.curso === "1º") ||
                    (selectedCourses.includes("2º") && evento.grupo === selectedSecondGroup && evento.grupoLaboratorio === "" && evento.curso === "2º") ||
                    (["3º", "4º"].includes(evento.curso) &&
                      (selectedCourses.includes("3º") && evento.mencion === selectedThirdMention && evento.grupo.startsWith("T") && evento.grupoLaboratorio === "" && evento.curso === "3º") ||
                      (selectedCourses.includes("4º") && evento.mencion === selectedFourthMention && evento.grupo.startsWith("T") && evento.grupoLaboratorio === "" && evento.curso === "4º"))
                  )
                );
              }
              
            }
            
            if(selectedGrade === "EST"){
              if(includeLabs){
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  selectedCourses.includes(evento.curso) &&
                    (
                      (selectedCourses.includes("1º") && (evento.grupo === selectedFirstGroup && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("TL") || evento.grupoLaboratorio === "")) && evento.curso === "1º") ||
                      (selectedCourses.includes("2º") && (evento.grupo === selectedSecondGroup && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("TL") || evento.grupoLaboratorio === "")) && evento.curso === "2º") ||
                      (selectedCourses.includes("3º") && (evento.grupo === selectedThirdMention && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("TL") || evento.grupoLaboratorio === "")) && evento.curso === "3º") ||
                      (selectedCourses.includes("4º") && (evento.grupo === selectedFourthMention && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("TL") || evento.grupoLaboratorio === "")) && evento.curso === "4º")
                    )
                  );
              } else {
                // Filtrar eventos según los criterios actualizados
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  selectedCourses.includes(evento.curso) &&
                    (
                      (selectedCourses.includes("1º") && evento.grupo === selectedFirstGroup && evento.grupoLaboratorio === "" && evento.curso === "1º") ||
                      (selectedCourses.includes("2º") && evento.grupo === selectedSecondGroup && evento.grupoLaboratorio === "" && evento.curso === "2º") ||
                      (selectedCourses.includes("3º") && evento.grupo === selectedThirdMention && evento.grupoLaboratorio === "" && evento.curso === "3º") ||
                      (selectedCourses.includes("4º") && evento.grupo === selectedFourthMention && evento.grupoLaboratorio === "" && evento.curso === "4º")
                    )
                  );
              }
              
            }

            if(selectedGrade === "I + E"){
              if(includeLabs){
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  selectedCourses.includes(evento.curso) &&
                    (
                      (selectedCourses.includes("1º") && (evento.grupo === selectedFirstGroup && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio.startsWith("K") || evento.grupoLaboratorio === "")) && evento.curso === "1º") ||
                      (selectedCourses.includes("2º") && (evento.grupo === selectedSecondGroup && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio.startsWith("K") || evento.grupoLaboratorio === "")) && evento.curso === "2º") ||
                      (selectedCourses.includes("3º") && (evento.grupo === selectedThirdMention && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio.startsWith("K") || evento.grupoLaboratorio === "")) && evento.curso === "3º") ||
                      (selectedCourses.includes("4º") && (evento.grupo === selectedFourthMention && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio.startsWith("K") || evento.grupoLaboratorio === "")) && evento.curso === "4º") ||
                      (selectedCourses.includes("5º") && (evento.grupo === selectedFifthGroup && (evento.grupoLaboratorio.startsWith("T/L") || evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio.startsWith("AS") || evento.grupoLaboratorio.startsWith("X") || evento.grupoLaboratorio.startsWith("J") || evento.grupoLaboratorio.startsWith("Y") || evento.grupoLaboratorio.startsWith("K") || evento.grupoLaboratorio === "")) && evento.curso === "5º")
                    )
                  );
              } else {
                // Filtrar eventos según los criterios actualizados
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  selectedCourses.includes(evento.curso) &&
                    (
                      (selectedCourses.includes("1º") && evento.grupo === selectedFirstGroup && evento.grupoLaboratorio === "" && evento.curso === "1º") ||
                      (selectedCourses.includes("2º") && evento.grupo === selectedSecondGroup && evento.grupoLaboratorio === "" && evento.curso === "2º") ||
                      (selectedCourses.includes("3º") && evento.grupo === selectedThirdMention && evento.grupoLaboratorio === "" && evento.curso === "3º") ||
                      (selectedCourses.includes("4º") && evento.grupo === selectedFourthMention && evento.grupoLaboratorio === "" && evento.curso === "4º") ||
                      (selectedCourses.includes("5º") && evento.grupo === selectedFifthGroup && evento.grupoLaboratorio === "" && evento.curso === "5º")
                    )
                  );
              }
                
            }

            if(selectedGrade === "Master"){
              if(includeLabs){
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  (evento.grupo === "T1" & (evento.grupoLaboratorio.startsWith("L") || evento.grupoLaboratorio === "") &&
                  evento.curso === "1º"));
              } else {
                // Filtrar eventos según los criterios actualizados
                eventosFiltrados = events.filter((evento) => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.grupo === "T1" &&
                  evento.grupoLaboratorio === "" &&
                  evento.curso === "1º");
              }
              
            }
            console.log(eventosFiltrados);
            // Crear la lista de opciones de asignaturas con el formato adecuado
            const asigOptions = eventosFiltrados.map(evento => {
                
              const key = ["3º", "4º"].includes(evento.curso) 
              ? evento.grupoLaboratorio === ""
                  ? `${evento.siglas} - ${evento.nombre} - ${evento.grupo}${["EST", "I + E", "Master"].includes(evento.grado) ? "" :  ` - ${evento.mencion}`}`
                  : `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.grupoLaboratorio}${["EST", "I + E", "Master"].includes(evento.grado) ? "" :  ` - ${evento.mencion}`}`
              : evento.grupoLaboratorio === ""
                  ? `${evento.siglas} - ${evento.nombre} - ${evento.grupo}`
                  : `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.grupoLaboratorio}`;
          
              const text = ["3º", "4º"].includes(evento.curso)
              ? evento.grupoLaboratorio === ""
                  ? `${evento.siglas} - ${evento.grupo}${["EST", "I + E", "Master"].includes(evento.grado) ? "" :  ` - ${evento.mencion}`}`
                  : `${evento.siglas} - ${evento.grupo} - ${evento.grupoLaboratorio}${["EST", "I + E", "Master"].includes(evento.grado) ? "" :  ` - ${evento.mencion}`}`
              : evento.grupoLaboratorio === ""
                  ? `${evento.siglas} - ${evento.grupo}`
                  : `${evento.siglas} - ${evento.grupo} - ${evento.grupoLaboratorio}`;
    
                return {
                    key,
                    value: `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.grupoLaboratorio}`,
                    text,
                    style: { backgroundColor: evento.color }
                };
            });
    
            setAsigOptions(asigOptions);
          }
    }, [selectedGrade, selectedSemester, selectedCourses, selectedFirstGroup, selectedSecondGroup, selectedThirdMention, selectedFourthMention, selectedFifthGroup, includeLabs, events]);
    
      
    // useEffect para el filtrado de eventos de asignaturas que hayan sido seleccionadas en el desplegable
    // de visualizacion personalizada de horarios
    useEffect(() => {
        if (selectedAsigs.length === 0) {
            setFilteredEvents([]);
        } else {
            const eventosFiltrados = events.filter(evento => {
                const asigFormato1 = `${evento.siglas} - ${evento.nombre} - ${evento.grupo}`;
                const asigFormato2 = `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.grupoLaboratorio}`;
                const asigFormato3 = `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.mencion}`;
                const asigFormato4 = `${evento.siglas} - ${evento.nombre} - ${evento.grupo} - ${evento.grupoLaboratorio} - ${evento.mencion}`;
                
                return (selectedAsigs.includes(asigFormato1) && selectedGrade === evento.grado && evento.grupoLaboratorio === "") || (selectedAsigs.includes(asigFormato2) && selectedGrade === evento.grado && evento.grupoLaboratorio !== "")
                || (selectedAsigs.includes(asigFormato3) && selectedGrade === evento.grado && evento.grupoLaboratorio === "") || (selectedAsigs.includes(asigFormato4) && selectedGrade === evento.grado && evento.grupoLaboratorio !== "");
            });
    
            setFilteredEvents(eventosFiltrados);
            console.log("selectedAsigs", selectedAsigs);
            //console.log("Asignaturas filtradas:");
            eventosFiltrados.forEach(evento => {
                //console.log(`${evento.siglas} - ${evento.nombre} - ${evento.grupo}`);
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
    
      const courseOrder = ["1º", "2º", "3º", "4º", "5º"];
    
      if (selectedGrade === "Master") {
        selectedCoursesText = courseMap["1º"];
      } else if (selectedCourses.length > 0) {
        // Ordenar los cursos según prioridad 1º → 4º
        const orderedCourses = courseOrder.filter(c => selectedCourses.includes(c));
        selectedCoursesText = orderedCourses.map(course => courseMap[course] || "").join(", ");
      } else {
        return ""; // Si no es máster y no hay cursos seleccionados, retorna vacío
      }
    
      if (
        (selectedThirdMention || selectedFourthMention) &&
        selectedCourses.some(course => ["3º", "4º"].includes(course)) &&
        selectedGrade === "INF"
      ) {
        mentionText = mentionMap[selectedThirdMention || selectedFourthMention] || "";
      }
    
      return mentionText && selectedCourses.length > 0 &&
        selectedCourses.every(course => ["3º", "4º"].includes(course))
        ? `${selectedCoursesText}, ${mentionText}`
        : selectedCoursesText;
    };
  



    return (
        <>
          <div className="cabeceraDocumento" id = "cabecera-documento-custom">
            <FiltersSectionCustom selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} selectedFirstGroup={selectedFirstGroup} setSelectedFirstGroup={setSelectedFirstGroup} selectedSecondGroup={selectedSecondGroup} setSelectedSecondGroup={setSelectedSecondGroup} selectedThirdMention={selectedThirdMention} setSelectedThirdMention={setSelectedThirdMention} selectedFourthMention={selectedFourthMention} setSelectedFourthMention={setSelectedFourthMention} selectedFifthGroup={selectedFifthGroup} setSelectedFifthGroup={setSelectedFifthGroup} selectedAsigs={selectedAsigs} setSelectedAsigs={setSelectedAsigs} asigOptions={asigOptions} setFilteredEvents={setFilteredEvents} includeLabs={includeLabs} setIncludeLabs={setIncludeLabs} setExportPDF={setExportPDF} asigColors={asigColors}/>
            <h2 className="textoGrado-custom">
              {getTextoGrado()}
            </h2>
            <h2 className="textoCursoMencion-custom">
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
                {filteredEvents.length > 0 ? (
                  // Obtener pares únicos de siglas y nombre
                  [...new Map(
                    events
                    .filter(evento => filteredEvents.some(f => f.siglas === evento.siglas && f.nombre === evento.nombre))
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
      );


}