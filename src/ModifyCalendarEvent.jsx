import './ModifyCalendarEvent.css';
import './ScheduleCreationMenuAsigTab.css'
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';
import ScheduleCreationInput from './ScheduleCreationInput';
import ScheduleCreationSelect from './ScheduleCreationSelect';
import ScheduleCreationDropdownSelect from './ScheduleCreationDropdownSelect';
import ScheduleCreationAsigActionsButton from './ScheduleCreationAsigActionsButton';

const ModifyCalendarEvent = ({event, backgroundColor, setEventClicked, setHoveredEvent, 
    asigCode, setAsigCode, asigInitials, setAsigInitials,
    asigDay, setAsigDay, asigPossibleDays,
    asigStartTime, setAsigStartTime, asigStartTimes,
    asigColor, setAsigColor, asigPossibleColors,
    asigFullName, setAsigFullName,
    asigSemester, setAsigSemester, asigPossibleSemesters,
    asigGroupNumber, setAsigGroupNumber, asigPossibleGroupNumbers,
    asigLabGroup, setAsigLabGroup,
    asigGroupType, setAsigGroupType, asigPossibleGroupType,
    asigDuration, setAsigDuration,
    asigClass, setAsigClass, asigPossibleClasses,
    asigCourseGII_IS, setAsigCourseGII_IS,
    asigCourseGII_TI, setAsigCourseGII_TI,
    asigCourseGII_CO, setAsigCourseGII_CO,
    asigCourse_EST, setAsigCourse_EST,
    asigCourse_INDat, setAsigCourse_INDat,
    asigCourse_Master, setAsigCourse_Master,
    asigPossibleCourses,
    asigTeacher, setAsigTeacher, asigPossibleTeacherOptions,
    asigIncidences, setAsigIncidences, modifyAsig, setModifyAsig}) => {


    const handleCloseClick = () => {
        setTimeout(() => {
        setEventClicked(null);
        setHoveredEvent(null);
        setAsigCode("");
        setAsigInitials("");
        setAsigFullName("");
        setAsigDay("");
        setAsigStartTime("");
        setAsigColor("");
        setAsigSemester("");
        setAsigGroupNumber("");
        setAsigLabGroup("");
        setAsigGroupType("");
        setAsigDuration("");
        setAsigClass("");
        setAsigCourseGII_IS("");
        setAsigCourseGII_TI("");
        setAsigCourseGII_CO("");
        setAsigCourse_EST("");
        setAsigCourse_INDat("");
        setAsigCourse_Master("");
        setAsigTeacher("");
        setAsigIncidences("");
    }, 0);
    }

    return(
        <div className="cuadro-evento-asignatura-mod" style = {{backgroundColor: backgroundColor}}>
            <div className="cuadro-evento-informacion-asignatura-mod">
                <div className="cuadro-evento-cabecera-mod">
                    <p className="cuadro-evento-informacion-nombre-siglas-mod">{event.nombre} - {event.siglas}</p>
                    <div className="cuadro-evento-boton-cerrar-mod" onClick={handleCloseClick}>
                        ✖
                    </div>
                </div>
            </div>

            <div className = "contenido-tab-crear-asignatura">
                <div className = "contenido-tab-crear-asignatura-codigo-siglas-dia-hora-color">
                    <div className="contenido-tab-crear-asignatura-codigo-siglas-nombre-completo">
                        <div className="contenido-tab-crear-asignatura-codigo">
                            <p className="apartado-codigo">Código</p>
                            <ScheduleCreationInput className={"codigo-asignatura"} setStatusOnChange={setAsigCode} value={asigCode} type={`number`}/>
                        </div>
                        <div className="contenido-tab-crear-asignatura-siglas">
                            <p className="apartado-siglas">Siglas</p>
                            <ScheduleCreationInput className={"siglas-asignatura"} setStatusOnChange={setAsigInitials} value={asigInitials} type={`text`}/>
                        </div>
                        <div className= "contenido-tab-crear-asignatura-nombre-completo">
                            <p>Nombre completo</p>
                            <ScheduleCreationInput className={"nombre-completo"} setStatusOnChange={setAsigFullName} value={asigFullName} type={`text`}/>
                        </div>
                    </div>
                    <div className="contenido-tab-crear-asignatura-dia-hora-color">
                        <div className="contenido-tab-crear-asignatura-dia">
                            <p className="apartado-dia">Día</p>
                            <ScheduleCreationSelect placeholder={"Dia"} selectOptions={asigPossibleDays} setStatusOnChange={setAsigDay} value={asigDay}/>
                        </div>
                        <div className="contenido-tab-crear-asignatura-hora">
                            <p className="apartado-hora-inicio">Hora de inicio</p>
                            <ScheduleCreationSelect placeholder={"Hora"} selectOptions={asigStartTimes} setStatusOnChange={setAsigStartTime} value={asigStartTime}/>
                        </div>
                        <div className="contenido-tab-crear-asignatura-color">
                            <p className="apartado-color">Color</p>
                            <ScheduleCreationSelect placeholder={"Color"} selectOptions={asigPossibleColors} setStatusOnChange={setAsigColor} value={asigColor}/>
                        </div> 
                    </div>
                    
                </div>
                
                <div className= "contenido-tab-crear-asignatura-semestre-grupo-subgrupo-tipo-duracion-aula">
                    <div className= "apartado-semestre">
                        <p>Semestre</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationSelect placeholder={"Semestre"} selectOptions={asigPossibleSemesters} className="numero-semestre" setStatusOnChange={setAsigSemester} value={asigSemester}/>
                        </div>
                    </div>
                    <div className= "apartado-grupo">
                        <p>Grupo</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationSelect placeholder={"Número"} selectOptions={asigPossibleGroupNumbers} className="numero-grupo" setStatusOnChange={setAsigGroupNumber} value={asigGroupNumber}/>
                        </div>
                    </div>
                    <div className= "apartado-subgrupo">
                        <p>Subgrupo</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationInput className={"subgrupo-laboratorio"} setStatusOnChange={setAsigLabGroup} value={asigLabGroup}/>  
                        </div>
                    </div>
                    <div className= "apartado-tipo">
                        <p>Tipo</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationSelect placeholder={"Tipo"} selectOptions={asigPossibleGroupType} className="tipo-grupo" setStatusOnChange={setAsigGroupType} value={asigGroupType}/>
                        </div>
                    </div>
                    <div className= "apartado-duracion">
                        <p>Duración</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationInput className={"duracion"} setStatusOnChange={setAsigDuration} value={asigDuration} type={`number`}/>
                        </div>
                    </div>
                    <div className= "apartado-aula">
                        <p>Aula</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationSelect placeholder={"Aula"} selectOptions={asigPossibleClasses} className="aula" setStatusOnChange={setAsigClass} value={asigClass}/>
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
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses} setStatusOnChange={setAsigCourseGII_IS} value={asigCourseGII_IS}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-TI">
                                <p>GII-TI</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourseGII_TI} value={asigCourseGII_TI}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-CO">
                                <p>GII-CO</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourseGII_CO} value={asigCourseGII_CO}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-EST">
                                <p>EST</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_EST} value={asigCourse_EST}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-INDat">
                                <p>INDat</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_INDat} value={asigCourse_INDat}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-Master">
                                <p>Master</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_Master} value={asigCourse_Master}/>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className = "contenido-tab-crear-asignatura-profesores">
                        <p className = "apartado-profesores">Profesores</p>
                        <div className = "campo-primer-profesor">
                            <p>Prof. #1</p>
                            <ScheduleCreationDropdownSelect placeholder={"Profesor..."} selectOptions={asigPossibleTeacherOptions}  setStatusOnChange={setAsigTeacher} value={asigTeacher}/>
                        </div>
                    </div>
                </div>
                <div className = "contenido-tab-crear-asignatura-incidencias">
                    <p className= "apartado-incidencias">Incidencias</p>
                    <ScheduleCreationMenuWarningsField text={asigIncidences}/>
                </div>
                <div className="contenido-tab-crear-asignatura-botones">
                    <ScheduleCreationAsigActionsButton text={`Modificar asignatura`} setStatusOnClick={setModifyAsig} color={`#edbeba`}/>
                </div>
            </div>
      

        </div>
    );
};

export default ModifyCalendarEvent;
