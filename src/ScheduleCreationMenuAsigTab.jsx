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
            <div className = "contenido-tab-crear-asignatura-codigo-siglas-dia-hora-color">
                <div className="contenido-tab-crear-asignatura-codigo">
                    <p className="apartado-codigo">Código</p>
                    <ScheduleCreationInput className={"codigo-asignatura"}/>
                </div>
                <div className="contenido-tab-crear-asignatura-siglas">
                    <p className="apartado-siglas">Siglas</p>
                    <ScheduleCreationInput className={"siglas-asignatura"}/>
                </div>
                <div className="contenido-tab-crear-asignatura-dia">
                    <p className="apartado-dia">Día</p>
                    <ScheduleCreationSelect placeholder={"Dia"} selectOptions={asigPossibleDays}/>
                </div>
                <div className="contenido-tab-crear-asignatura-hora">
                    <p className="apartado-hora-inicio">Hora de inicio</p>
                    <ScheduleCreationSelect placeholder={"Hora"} selectOptions={asigStartTimes}/>
                </div>
                <div className="contenido-tab-crear-asignatura-color">
                    <p className="apartado-color">Color</p>
                    <ScheduleCreationSelect placeholder={"Color"} selectOptions={asigPossibleColors}/>
                </div> 
            </div>
            <div className= "contenido-tab-crear-asignatura-nombre-completo">
                <p>Nombre completo de asignatura</p>
                <ScheduleCreationInput className={"nombre-completo"}/>
            </div>
            <div className= "contenido-tab-crear-asignatura-semestre-grupo-subgrupo-tipo-duracion">
                <div className= "apartado-semestre">
                    <p>Semestre</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion">
                        <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleSemesters} className="numero-semestre"/>
                    </div>
                </div>
                <div className= "apartado-grupo">
                    <p>Grupo</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion">
                        <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleGroupNumbers} className="numero-grupo"/>
                    </div>
                </div>
                <div className= "apartado-subgrupo">
                    <p>Subgrupo</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion">
                        <ScheduleCreationInput className={"subgrupo-laboratorio"}/>  
                    </div>
                </div>
                <div className= "apartado-tipo">
                    <p>Tipo</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion">
                        <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleGroupType} className="tipo-grupo"/>
                    </div>
                </div>
                <div className= "apartado-duracion">
                    <p>Duración</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion">
                        <ScheduleCreationInput className={"duracion"}/>
                    </div>
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