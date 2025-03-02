
import React, { useState, useEffect } from 'react'
import './App.css'
import { CalendarEvent } from './CalendarEvent'
import FiltersSection from './FiltersSection'
import FiltersSectionCustom from './FiltersSectionCustom'
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css'


const asignaturasJSON = [
  {
    "Codigo de asignatura": "44338",
    "Nombre": "Análisis y Diseño de Algoritmos",
    "Siglas": "ADA",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "3º",
    "Grupo": "T1",
    "Mencion": "IS",
    "Clase": "02",
    "Dia": "Miercoles",
    "HoraInicio": "10:00",
    "Duracion": "1",
    "Color" : "#AFC3C4"
  },
  {
    "Codigo de asignatura" : "43618",
    "Nombre": "Análisis y Diseño de Bases de Datos",
    "Siglas": "ADBD",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "3º",
    "Grupo": "T2",
    "Mencion": "IS",
    "Clase": "103",
    "Dia": "Martes",
    "HoraInicio": "10:00",
    "Duracion": "1",
    "Color" : "#FFEFAE"
  },
  {
    "Codigo de asignatura" : "47378",
    "Nombre": "Ingeniería del conocimiento",
    "Siglas": "ICON",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "3º",
    "Grupo": "T1",
    "Mencion": "IS",
    "Clase": "07",
    "Dia": "Lunes",
    "HoraInicio": "11:00",
    "Duracion": "1",
    "Color" : "#CDD6F6"
  },
  {
    "Codigo de asignatura" : "47378",
    "Nombre": "Ingeniería del conocimiento",
    "Siglas": "ICON",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "3º",
    "Grupo": "T1",
    "Mencion": "CO",
    "Clase": "07",
    "Dia": "Lunes",
    "HoraInicio": "11:00",
    "Duracion": "1",
    "Color" : "#CDD6F6"
  },
  {
    "Codigo de asignatura" : "47378",
    "Nombre": "Ingeniería del conocimiento",
    "Siglas": "ICON",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "3º",
    "Grupo": "T1",
    "Mencion": "TI",
    "Clase": "07",
    "Dia": "Lunes",
    "HoraInicio": "11:00",
    "Duracion": "1",
    "Color" : "#CDD6F6"
  },
  {
    "Codigo de asignatura" : "45658",
    "Nombre": "Modelado de Software",
    "Siglas": "MOD",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "2º",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "45658",
    "Nombre": "Modelado de Software",
    "Siglas": "MOD",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "2º",
    "Grupo": "T2",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "45678",
    "Nombre": "Seguridad de Redes y Sistemas",
    "Siglas": "SRS",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "3º",
    "Grupo": "T1",
    "Mencion": "IS",
    "Clase": "03",
    "Dia": "Viernes",
    "HoraInicio": "17:00",
    "Duracion": "2",
    "Color": "#BEE9DD"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Ampliación de matemáticas",
    "Siglas": "AMAT",
    "Grado": "INF",
    "Semestre": "2ºC",
    "Curso": "1º",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Ampliación de matemáticas",
    "Siglas": "AMAT",
    "Grado": "INF",
    "Semestre": "2ºC",
    "Curso": "1º",
    "Grupo": "T2",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Ampliación de matemáticas",
    "Siglas": "AMAT",
    "Grado": "INF",
    "Semestre": "2ºC",
    "Curso": "1º",
    "Grupo": "T3",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Fundamentos de Matemáticas",
    "Siglas": "FMAT",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "1º",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Fundamentos de Matemáticas",
    "Siglas": "FMAT",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "1º",
    "Grupo": "T2",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Fundamentos de Matemáticas",
    "Siglas": "FMAT",
    "Grado": "INF",
    "Semestre": "1ºC",
    "Curso": "1º",
    "Grupo": "T3",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  }
]

const diasSemana = {
  "Lunes": 1,
  "Martes": 2,
  "Miercoles": 3,
  "Jueves": 4,
  "Viernes": 5
};

const localizer = momentLocalizer(moment);
moment.locale('es');

function App() {
  const [events, setEvents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado por el alumno
  const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado por el alumno
  const [selectedCourse, setSelectedCourse] = useState(""); // Curso/s seleccionado por el alumno para FiltersSection
  const [selectedGroup, setSelectedGroup] = useState(""); // Grupo seleccionado por el alumno
  const [selectedMention, setSelectedMention] = useState(""); // Mencion seleccionada por el alumno para FiltersSection
  
  const [asigOptions, setAsigOptions] = useState([]);     // Listado de asignaturas creada en base a filtros
  
  const [selectedAsigs, setSelectedAsigs] = useState([]); // Asignaturas seleccionadas en FiltersSection

  const [selectedClass, setSelectedClass] = useState(""); // Aulas seleccionadas en FiltersTab
  
  
  
  const [filteredEvents, setFilteredEvents] = useState([]); // Eventos filtrados 
  const [filteredAsigs, setFilteredAsigs] = useState([]); // Eventos de asignaturas filtradas en FiltersSection



  const [selectedCourses, setSelectedCourses] = useState([]); // Curso/s seleccionado por el alumno para FiltersSectionCustom
  const [selectedFirstGroup, setSelectedFirstGroup] = useState(null); // Grupo de asignaturas de primer curso
  const [selectedSecondGroup, setSelectedSecondGroup] = useState(null); // Grupo de asignaturas de segundo curso
  const [selectedThirdMention, setSelectedThirdMention] = useState(null); // Mencion de asignaturas de tercer curso
  const [selectedFourthMention, setSelectedFourthMention] = useState(null); // Mencion de asignaturas de cuarto curso
  const [selectedFifthGroup, setSelectedFifthGroup] = useState(null); // Grupo de asignaturas de quinto curso (solo para I + E)


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
        siglas: asignatura.Siglas, // Extra info para el componente personalizado
        grado: asignatura.Grado,
        semestre: asignatura.Semestre,
        curso: asignatura.Curso,
        grupo: asignatura.Grupo,
        mencion: asignatura.Mencion,
        aula: asignatura.Clase,
        color: asignatura.Color
      };
    }).filter(Boolean);
  
    setEvents(eventos);
  }, []);

  // useEffect para la creación de la lista de asignaturas que se muestra en el desplegable
  // de visualización personalizada de horarios
  useEffect(() => {
    if (!selectedGrade && !selectedSemester && selectedCourses.length === 0 && !selectedFirstGroup && !selectedSecondGroup && !selectedThirdMention && !selectedFourthMention && !selectedFifthGroup) {
        setAsigOptions([]);
    } else {
        // Filtrar eventos según los criterios actualizados
        const eventosFiltrados = events.filter((evento) => 
        evento.grado === selectedGrade &&
        evento.semestre === selectedSemester &&
        selectedCourses.includes(evento.curso) &&
        (
          (selectedCourses.includes("1º") && evento.grupo === selectedFirstGroup && evento.curso === "1º") ||
          (selectedCourses.includes("2º") && evento.grupo === selectedSecondGroup && evento.curso === "2º") ||
          (selectedCourses.includes("5º") && evento.grupo === selectedFifthGroup && evento.curso === "5º") ||
          (["3º", "4º"].includes(evento.curso) &&
            (selectedCourses.includes("3º") && evento.mencion === selectedThirdMention && evento.curso === "3º") ||
            (selectedCourses.includes("4º") && evento.mencion === selectedFourthMention && evento.curso === "4º"))
        )
    );

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
            
            return selectedAsigs.includes(asigFormato1) || selectedAsigs.includes(asigFormato2);
        });

        setFilteredEvents(eventosFiltrados);

        console.log("Asignaturas filtradas:");
        eventosFiltrados.forEach(evento => {
            console.log(`${evento.siglas} - ${evento.nombre} - ${evento.grupo}`);
        });
    }
  }, [selectedAsigs, events]);

  // useEffect para la parte de visualizacion de calendarios genericos
  useEffect(() => {
    if (!selectedGrade || !selectedSemester || !selectedCourse) {
      setFilteredAsigs([]);
    } else {
        let asignaturasFiltradas;

        if (selectedCourse === "3º" || selectedCourse === "4º") {
          asignaturasFiltradas = events.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            selectedCourse === evento.curso &&
            evento.mencion === selectedMention
          );
        } else {
          asignaturasFiltradas = events.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            selectedCourse === evento.curso &&
            (!selectedGroup || evento.grupo === selectedGroup)
          );
        }
        console.log("Eventos filtrados:", asignaturasFiltradas);
      setFilteredAsigs(asignaturasFiltradas);
    }
  }, [selectedGrade, selectedSemester, selectedCourse, selectedGroup, selectedMention, events]);






  const gradeMap = {
    "INF": "Grado en Ingeniería Informática",
    "EST": "Grado en Estadística",
    "I + E": "Grado en Indat",
    "Master": "Master en Ingeniería Informática"
  };

  const semesterMap = {
    "1ºC": "Primer Cuatrimestre",
    "2ºC": "Segundo Cuatrimestre",
    "1er Semestre": "Primer Semestre",
    "2º Semestre": "Segundo Semestre"
  };

  const courseMap = {
    "1º": "Primer Curso",
    "2º": "Segundo Curso",
    "3º": "Tercer Curso",
    "4º": "Cuarto Curso",
    "5º": "Quinto Curso"
  };

  const mentionMap = {
    "IS": "Mención Ingeniería de Software",
    "CO": "Mención Computación",
    "TI": "Mención Tecnologías de la Información"
  };

  const getTextoGrado = () => {
    if (!selectedGrade || !selectedSemester) return "";
    return `${gradeMap[selectedGrade]}, ${semesterMap[selectedSemester]}, Curso 2024/25`;
  };

  const getTextoCursoMencion = () => {
    if (!selectedCourse) return ""; // Si no hay curso seleccionado, devuelve vacío

    const selectedCourseText = courseMap[selectedCourse] || ""; // Obtener el texto del curso seleccionado
    let mentionText = "";

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
        <FiltersSection selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} selectedMention={selectedMention} setSelectedMention={setSelectedMention}/>
        <FiltersSectionCustom selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} selectedFirstGroup={selectedFirstGroup} setSelectedFirstGroup={setSelectedFirstGroup} selectedSecondGroup={selectedSecondGroup} setSelectedSecondGroup={setSelectedSecondGroup} selectedThirdMention={selectedThirdMention} setSelectedThirdMention={setSelectedThirdMention} selectedFourthMention={selectedFourthMention} setSelectedFourthMention={setSelectedFourthMention} selectedFifthGroup={selectedFifthGroup} setSelectedFifthGroup={setSelectedFifthGroup} selectedAsigs={selectedAsigs} setSelectedAsigs={setSelectedAsigs} asigOptions={asigOptions}/>
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
                events={selectedAsigs.length === 0 ? filteredAsigs : filteredEvents}
                startAccessor="start"
                endAccessor="end"
                views={{ week: true }}
                defaultView={Views.WEEK}
                toolbar={false}
                style={{ height: 1000, width: "100%" }}
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
                  evento: CalendarEvent,
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
    </>
  );
}

export default App;
