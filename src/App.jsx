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


const diasSemana = {
  "Lunes": 1,
  "Martes": 2,
  "Miércoles": 3,
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
            <Route path="/horarios-genericos" element={<GenericVisualization diasSemana={diasSemana} gradeMap={gradeMap} semesterMap={semesterMap} courseMap={courseMap} mentionMap={mentionMap} /> } />
            <Route path="/horarios-personalizados" element={<CustomVisualization diasSemana={diasSemana} gradeMap={gradeMap} semesterMap={semesterMap} courseMap={courseMap} mentionMap={mentionMap} /> } />
            <Route path="/creacion-horarios" element={
                        <PrivateRoute>
                            <ScheduleCreation diasSemana={diasSemana} gradeMap={gradeMap} semesterMap={semesterMap} courseMap={courseMap} mentionMap={mentionMap}/>
                        </PrivateRoute>
                    } />
          </Routes>
        </AuthProvider>
      </Router>
    
      
    </>
  );
}

export default App;
