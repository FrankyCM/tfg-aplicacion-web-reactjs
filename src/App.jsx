import React from 'react'
import IntroSection from './IntroSection';
import './App.css'
import './Common.css'
import 'semantic-ui-css/semantic.min.css';
import { Login } from './Login'
import { GenericVisualization } from './GenericVisualization'
import { CustomVisualization } from './CustomVisualization'
import ScheduleCreation from './ScheduleCreation';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";

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
    "Profesor": "César Gonzalez",
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
    "Grupo": "L1",
    "Mencion": "IS",
    "Clase": "L103",
    "Dia": "Martes",
    "Profesor": "Manuel Barrios",
    "HoraInicio": "10:00",
    "Duracion": "2",
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
    "Profesor": "Belarmino Pulido",
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
    "Profesor": "Belarmino Pulido",
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
    "Profesor": "Belarmino Pulido",
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
    "Profesor": "Yania Crespo",
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
    "Profesor": "Yania Crespo",
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
    "Profesor": "Profesor de SRS",
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
    "Profesor": "Alfonso Población",
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
    "Profesor": "Alfonso Población",
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
    "Profesor": "Alfonso Población",
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
    "Profesor": "Alfonso Población",
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
    "Profesor": "Alfonso Población",
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
    "Profesor": "Alfonso Población",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Fundamentos de Matemáticas",
    "Siglas": "FMAT",
    "Grado": "EST",
    "Semestre": "1ºC",
    "Curso": "1º",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "Profesor": "Profesor EST",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Fundamentos de Matemáticas",
    "Siglas": "FMAT",
    "Grado": "I + E",
    "Semestre": "1ºC",
    "Curso": "1º",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "Profesor": "Profesor I + E",
    "HoraInicio": "13:00",
    "Duracion": "2",
    "Color": "#FFD4B4"
  },
  {
    "Codigo de asignatura" : "41240",
    "Nombre": "Fundamentos de Matemáticas",
    "Siglas": "FMAT",
    "Grado": "Master",
    "Semestre": "1er Semestre",
    "Curso": "1º",
    "Grupo": "T1",
    "Clase": "07",
    "Dia": "Jueves",
    "Profesor": "profesor master",
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
  "2º Semestre": "Segundo Semestre",
  "3er Semestre": "Tercer Semestre",
  "4º Semestre": "Cuarto Semestre"
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


function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<IntroSection />} />
            <Route path='/admin' element={<Login />} />
            <Route path="/horarios-genericos" element={<GenericVisualization asignaturasJSON={asignaturasJSON} diasSemana={diasSemana} gradeMap={gradeMap} semesterMap={semesterMap} courseMap={courseMap} mentionMap={mentionMap} /> } />
            <Route path="/horarios-personalizados" element={<CustomVisualization asignaturasJSON={asignaturasJSON} diasSemana={diasSemana} gradeMap={gradeMap} semesterMap={semesterMap} courseMap={courseMap} mentionMap={mentionMap} /> } />
            <Route path="/creacion-horarios" element={
                        <PrivateRoute>
                            <ScheduleCreation asignaturasJSON={asignaturasJSON} diasSemana={diasSemana} gradeMap={gradeMap} semesterMap={semesterMap} courseMap={courseMap} mentionMap={mentionMap}/>
                        </PrivateRoute>
                    } />
          </Routes>
        </AuthProvider>
      </Router>
    
      
    </>
  );
}

export default App;
