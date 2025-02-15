
import { useState, useEffect } from 'react'
import './App.css'
import { CalendarEvent } from './CalendarEvent'
import FiltersTab from './FiltersTab'
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css'

const asignaturasJSON = [
  {
    "Codigo de asignatura" : "44338",
    "Asignatura": "Análisis y Diseño de Algoritmos",
    "Siglas": "ADA",
    "Grupo": "T1",
    "Clase": "02",
    "Dia": "Miercoles",
    "HoraInicio": "10:00",
    "Duracion": "1",
    "Color" : "#AFC3C4"
  },
  {
    "Codigo de asignatura" : "43618",
    "Asignatura": "Análisis y Diseño de Bases de Datos",
    "Siglas": "ADBD",
    "Grupo": "T1",
    "Clase": "103",
    "Dia": "Martes",
    "HoraInicio": "10:00",
    "Duracion": "1",
    "Color" : "#FFEFAE"
  },
  {
    "Codigo de asignatura" : "47378",
    "Asignatura": "Ingeniería del conocimiento",
    "Siglas": "ICON",
    "Grupo": "T2",
    "Clase": "07",
    "Dia": "Lunes",
    "HoraInicio": "11:00",
    "Duracion": "1",
    "Color" : "#CDD6F6"
  },
  {
    "Codigo de asignatura" : "45658",
    "Asignatura": "Modelado de Software",
    "Siglas": "MOD",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "45678",
    "Asignatura": "Seguridad de Redes y Sistemas",
    "Siglas": "SRS",
    "Grupo": "T3",
    "Clase": "03",
    "Dia": "Viernes",
    "HoraInicio": "17:00",
    "Duracion": "2",
    "Color": "#BEE9DD"
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
  const [selectedAsigs, setSelectedAsigs] = useState([]); // Asignaturas seleccionadas
  const [filteredEvents, setFilteredEvents] = useState([]); // Eventos filtrados


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
        siglas: asignatura.Siglas, // Extra info para el componente personalizado
        grupo: asignatura.Grupo,
        aula: asignatura.Clase,
        color: asignatura.Color
      };
    }).filter(Boolean);
  
    setEvents(eventos);
  }, []);


  useEffect(() => {
    if (selectedAsigs.length === 0) {
      setFilteredEvents([]);
    } else {
      setFilteredEvents(events.filter(evento => selectedAsigs.includes(evento.siglas)));
    }
  }, [selectedAsigs, events]);


  return (
    <>
      <div className="cabeceraDocumento">
        <FiltersTab selectedAsigs={selectedAsigs} setSelectedAsigs={setSelectedAsigs} />
        <h2 className="textoGrado">
          Grado en Ingeniería Informática, Primer Cuatrimestre, Curso 2024 - 25
        </h2>
        <h2 className="textoCursoMencion">
          Tercer Curso, Mención Ingeniería de Software
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
                style={{ height: 1000, width: "100%" }}
                min={new Date(2023, 0, 1, 8, 0)}
                max={new Date(2023, 0, 1, 21, 0)}
                showCurrentTimeIndicator={false}

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
                      width: "90%", // Reduce el tamaño del evento dentro de la celda
                      height: "90%", // También reduce su altura
                      marginLeft: 5, // Centra el elemento en la celda
                    }
                  };
                }}

              />
            </div>
          </div>
          <div className="asignaturasHorario">
            <p className="siglasAsignatura">ADA:</p>
            <p className="nombreCompletoAsignatura">Análisis y Diseño de Algoritmos</p>
            <p className="siglasAsignatura">ADBD:</p>
            <p className="nombreCompletoAsignatura">Análisis y Diseño de Bases de Datos</p>
            <p className="siglasAsignatura">IA:</p>
            <p className="nombreCompletoAsignatura">Inteligencia Artificial</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
