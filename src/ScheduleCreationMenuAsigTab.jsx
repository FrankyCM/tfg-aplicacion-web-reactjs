import { useState, useEffect } from 'react';
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';
import './ScheduleCreationMenuAsigTab.css';
import ScheduleCreationInput from './ScheduleCreationInput';
import ScheduleCreationSelect from './ScheduleCreationSelect';
import ScheduleCreationDropdownSelect from './ScheduleCreationDropdownSelect';

const ScheduleCreationMenuAsigTab = ({asigCode, setAsigCode, asigInitials,
    setAsigInitials, asigPossibleDays,
    asigDay, setAsigDay, asigStartTimes,
    asigFullName, setAsigFullName, 
    asigStartTime, setAsigStartTime,
    asigPossibleColors,
    asigColor, setAsigColor,
    asigPossibleSemesters, asigSemester, setAsigSemester,
    asigPossibleGroupNumbers, asigGroupNumber,
    setAsigGroupNumber, asigLabGroup, setAsigLabGroup,
    asigPossibleGroupType, asigDuration, setAsigDuration,
    asigPossibleCourses, asigCourseGII_IS, setAsigCourseGII_IS,
    asigCourseGII_TI, setAsigCourseGII_TI, asigCourseGII_CO,
    setAsigCourseGII_CO, asigCourse_EST, setAsigCourse_EST,
    asigCourse_INDat, setAsigCourse_INDat, asigCourse_Master,
    setAsigCourse_Master, asigPossibleTeacherOptions, asigTeacher, setAsigTeacher,
    asigIncidences, setAsigIncidences}) => {



    return(
        <div className = "contenido-tab-crear-asignatura">
            <p className="apartado-codigo-siglas-dia-hora-color">Código - Siglas - Día - Hora de inicio - Color</p>
            <div className = "contenido-tab-crear-asignatura-codigo-siglas-dia-hora-color">
                <ScheduleCreationInput className={"codigo-asignatura"}/>
                <ScheduleCreationInput className={"siglas-asignatura"}/>
                <ScheduleCreationSelect placeholder={"Dia"} selectOptions={asigPossibleDays}/>
                <ScheduleCreationSelect placeholder={"Hora"} selectOptions={asigStartTimes}/>
                <ScheduleCreationSelect placeholder={"Color"} selectOptions={asigPossibleColors}/>
            </div>
            <div className= "contenido-tab-crear-asignatura-nombre-completo">
                <ScheduleCreationInput className={"nombre-completo"}/>
            </div>
            <div className= "contenido-tab-crear-asignatura-semestre-grupo-subgrupo-tipo-duracion">
                <p>Semestre - Grupo - Subgrupo - Tipo - Duración</p>
                <div className= "campos-semestre-grupo-subgrupo-tipo-duracion">
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleSemesters}/>
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleGroupNumbers}/>
                    <ScheduleCreationInput className={"subgrupo-laboratorio"}/>
                    <ScheduleCreationSelect placeholder={"..."} className="tipo-grupo" selectOptions={asigPossibleGroupType}/>
                    <ScheduleCreationInput className={"duracion"}/>
                </div>
            </div>
            <div className= "contenido-tab-crear-asignatura-estudios">
                <p className="apartado-estudios">Estudios donde se imparte, cursos y optatividad</p>
                <div className= "cabecera-estudios">
                    <p>GII-IS</p>
                    <p>GII-TI</p>
                    <p>GII-CO</p>
                    <p>EST</p>
                    <p>INDat</p>
                    <p>Master</p>
                </div>
                <div className= "campos-estudios">
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}/>
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}/>
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}/>
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}/>
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}/>
                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}/>
                </div>
            </div>
            <div className = "contenido-tab-crear-asignatura-profesores">
                <p className = "apartado-profesores">Profesores</p>
                <div className = "campo-primer-profesor">
                    <p>Prof. #1</p>
                    <ScheduleCreationDropdownSelect placeholder={"Profesor..."} selectOptions={asigPossibleTeacherOptions}/>
                </div>
            </div>
            <div className = "contenido-tab-crear-asignatura-incidencias">
                <p className= "apartado-incidencias">Incidencias</p>
                <ScheduleCreationMenuWarningsField/>
            </div>
        </div>
    )
}

export default ScheduleCreationMenuAsigTab;