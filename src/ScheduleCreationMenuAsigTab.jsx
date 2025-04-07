import { useState, useEffect } from 'react';
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';
import './ScheduleCreationMenuAsigTab.css';
import ScheduleCreationInput from './ScheduleCreationInput';
import ScheduleCreationSelect from './ScheduleCreationSelect';
import ScheduleCreationDropdownSelect from './ScheduleCreationDropdownSelect';
import ScheduleCreationAsigActionsButton from './ScheduleCreationAsigActionsButton';

const ScheduleCreationMenuAsigTab = ({asigCode, setAsigCode, asigInitials,
    setAsigInitials, asigPossibleDays,
    asigDay, setAsigDay, asigStartTimes,
    asigFullName, setAsigFullName, 
    asigStartTime, setAsigStartTime,
    asigPossibleColors,
    asigColor, setAsigColor,
    asigPossibleSemesters, asigSemester, setAsigSemester,
    asigPossibleGroupNumbers, asigGroupNumber,
    setAsigGroupNumber, asigGroupType, setAsigGroupType, asigLabGroup, setAsigLabGroup,
    asigPossibleGroupType, asigDuration, setAsigDuration, asigPossibleClasses,
    asigClass, setAsigClass, asigPossibleCourses, asigCourseGII_IS, setAsigCourseGII_IS,
    asigCourseGII_TI, setAsigCourseGII_TI, asigCourseGII_CO,
    setAsigCourseGII_CO, asigCourse_EST, setAsigCourse_EST,
    asigCourse_INDat, setAsigCourse_INDat, asigCourse_Master,
    setAsigCourse_Master, asigPossibleTeacherOptions, asigTeacher, setAsigTeacher,
    asigIncidences, setAsigIncidences, createAsig, setCreateAsig, clearFormulary, 
    setClearFormulary}) => {



    return(
        <div className = "contenido-tab-crear-asignatura">
            <div className = "contenido-tab-crear-asignatura-codigo-siglas-dia-hora-color">
                <div className="contenido-tab-crear-asignatura-codigo-siglas-nombre-completo">
                    <div className="contenido-tab-crear-asignatura-codigo">
                        <p className="apartado-codigo">Código</p>
                        <ScheduleCreationInput className={"codigo-asignatura"} setStatusOnChange={setAsigCode}/>
                    </div>
                    <div className="contenido-tab-crear-asignatura-siglas">
                        <p className="apartado-siglas">Siglas</p>
                        <ScheduleCreationInput className={"siglas-asignatura"} setStatusOnChange={setAsigInitials}/>
                    </div>
                    <div className= "contenido-tab-crear-asignatura-nombre-completo">
                        <p>Nombre completo</p>
                        <ScheduleCreationInput className={"nombre-completo"} setStatusOnChange={setAsigFullName}/>
                    </div>
                </div>
                <div className="contenido-tab-crear-asignatura-dia-hora-color">
                    <div className="contenido-tab-crear-asignatura-dia">
                        <p className="apartado-dia">Día</p>
                        <ScheduleCreationSelect placeholder={"Dia"} selectOptions={asigPossibleDays} setStatusOnChange={setAsigDay}/>
                    </div>
                    <div className="contenido-tab-crear-asignatura-hora">
                        <p className="apartado-hora-inicio">Hora de inicio</p>
                        <ScheduleCreationSelect placeholder={"Hora"} selectOptions={asigStartTimes} setStatusOnChange={setAsigStartTime}/>
                    </div>
                    <div className="contenido-tab-crear-asignatura-color">
                        <p className="apartado-color">Color</p>
                        <ScheduleCreationSelect placeholder={"Color"} selectOptions={asigPossibleColors} setStatusOnChange={setAsigColor}/>
                    </div> 
                </div>
                
            </div>
            
            <div className= "contenido-tab-crear-asignatura-semestre-grupo-subgrupo-tipo-duracion-aula">
                <div className= "apartado-semestre">
                    <p>Semestre</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationSelect placeholder={"Semestre"} selectOptions={asigPossibleSemesters} className="numero-semestre" setStatusOnChange={setAsigSemester}/>
                    </div>
                </div>
                <div className= "apartado-grupo">
                    <p>Grupo</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationSelect placeholder={"Número"} selectOptions={asigPossibleGroupNumbers} className="numero-grupo" setStatusOnChange={setAsigGroupNumber}/>
                    </div>
                </div>
                <div className= "apartado-subgrupo">
                    <p>Subgrupo</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationInput className={"subgrupo-laboratorio"} setStatusOnChange={setAsigLabGroup}/>  
                    </div>
                </div>
                <div className= "apartado-tipo">
                    <p>Tipo</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationSelect placeholder={"Tipo"} selectOptions={asigPossibleGroupType} className="tipo-grupo" setStatusOnChange={setAsigGroupType}/>
                    </div>
                </div>
                <div className= "apartado-duracion">
                    <p>Duración</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationInput className={"duracion"} setStatusOnChange={setAsigDuration}/>
                    </div>
                </div>
                <div className= "apartado-aula">
                    <p>Aula</p>
                    <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                    <ScheduleCreationSelect placeholder={"Aula"} selectOptions={asigPossibleClasses} className="aula" setStatusOnChange={setAsigClass}/>
                    </div>
                </div>
            </div>
            <div className="contenido-tab-crear-asignatura-estudios-profesores">
                <div className= "contenido-tab-crear-asignatura-estudios">
                    <p className="apartado-estudios">Estudios donde se imparte, cursos y optatividad</p>
                    <div className= "cabecera-estudios">
                        <div className= "cabecera-estudios-IS">
                            <p>GII-IS</p>
                            <div className= "campos-estudios">
                                <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses} setStatusOnChange={setAsigCourseGII_IS}/>
                            </div>
                        </div>
                        <div className= "cabecera-estudios-TI">
                            <p>GII-TI</p>
                            <div className= "campos-estudios">
                                <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourseGII_TI}/>
                            </div>
                        </div>
                        <div className= "cabecera-estudios-CO">
                            <p>GII-CO</p>
                            <div className= "campos-estudios">
                                <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourseGII_CO}/>
                            </div>
                        </div>
                        <div className= "cabecera-estudios-EST">
                            <p>EST</p>
                            <div className= "campos-estudios">
                                <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_EST}/>
                            </div>
                        </div>
                        <div className= "cabecera-estudios-INDat">
                            <p>INDat</p>
                            <div className= "campos-estudios">
                                <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_INDat}/>
                            </div>
                        </div>
                        <div className= "cabecera-estudios-Master">
                            <p>Master</p>
                            <div className= "campos-estudios">
                                <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_Master}/>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className = "contenido-tab-crear-asignatura-profesores">
                    <p className = "apartado-profesores">Profesores</p>
                    <div className = "campo-primer-profesor">
                        <p>Prof. #1</p>
                        <ScheduleCreationDropdownSelect placeholder={"Profesor..."} selectOptions={asigPossibleTeacherOptions}  setStatusOnChange={setAsigTeacher}/>
                    </div>
                </div>
            </div>
            <div className = "contenido-tab-crear-asignatura-incidencias">
                <p className= "apartado-incidencias">Incidencias</p>
                <ScheduleCreationMenuWarningsField text={asigIncidences}/>
            </div>
            <div className="contenido-tab-crear-asignatura-botones">
                <ScheduleCreationAsigActionsButton text={`Limpiar formulario`} setStatusOnClick={setClearFormulary} color={`#edbeba`}/>
                <ScheduleCreationAsigActionsButton text={`Crear asignaturas`} setStatusOnClick={setCreateAsig} color={`#edbeba`}/>
            </div>
        </div>
    )
}

export default ScheduleCreationMenuAsigTab;