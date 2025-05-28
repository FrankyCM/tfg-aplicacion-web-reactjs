import './ModifyCalendarEvent.css';
import './ScheduleCreationMenuAsigTab.css'
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';
import ScheduleCreationInput from './ScheduleCreationInput';
import ScheduleCreationSelect from './ScheduleCreationSelect';
import ScheduleCreationDropdownSelect from './ScheduleCreationDropdownSelect';
import ScheduleCreationAsigActionsButton from './ScheduleCreationAsigActionsButton';

const ModifyCalendarEvent = ({event, backgroundColor, setEventClicked, 
    asigCodeMod, setAsigCodeMod,
    asigInitialsMod, setAsigInitialsMod,
    asigDayMod, setAsigDayMod, asigPossibleDays,
    asigStartTimeMod, setAsigStartTimeMod, asigStartTimes,
    asigColorMod, setAsigColorMod, asigPossibleColors,
    asigFullNameMod, setAsigFullNameMod,
    asigSemesterMod, setAsigSemesterMod, asigPossibleSemesters,
    asigGroupNumberMod, setAsigGroupNumberMod, asigPossibleGroupNumbers,
    asigLabGroupMod, setAsigLabGroupMod,
    asigGroupTypeMod, setAsigGroupTypeMod, asigPossibleGroupType,
    asigDurationMod, setAsigDurationMod,
    asigClassMod, setAsigClassMod, asigPossibleClasses,
    asigCourseGII_ISMod, setAsigCourseGII_ISMod,
    asigCourseGII_TIMod, setAsigCourseGII_TIMod,
    asigCourseGII_COMod, setAsigCourseGII_COMod,
    asigCourse_ESTMod, setAsigCourse_ESTMod,
    asigCourse_INDatMod, setAsigCourse_INDatMod,
    asigCourse_MasterMod, setAsigCourse_MasterMod,
    asigPossibleCourses,
    asigTeacherMod, setAsigTeacherMod, asigPossibleTeacherOptions,
    asigIncidencesMod, setAsigIncidencesMod, setModifyAsig, setDeleteAsig}) => {


    const handleCloseClick = () => {
        setTimeout(() => {
            setEventClicked(false);
            setAsigCodeMod("");
            setAsigInitialsMod("");
            setAsigFullNameMod("");
            setAsigDayMod("");
            setAsigStartTimeMod("");
            setAsigColorMod("");
            setAsigSemesterMod("");
            setAsigGroupNumberMod("");
            setAsigLabGroupMod("");
            setAsigGroupTypeMod("");
            setAsigDurationMod("");
            setAsigClassMod("");
            setAsigCourseGII_ISMod("");
            setAsigCourseGII_TIMod("");
            setAsigCourseGII_COMod("");
            setAsigCourse_ESTMod("");
            setAsigCourse_INDatMod("");
            setAsigCourse_MasterMod("");
            setAsigTeacherMod("");
        }, 0);
    }

    const handleIncidenceRemoval = () => {
        setAsigIncidencesMod((prev) => {
            const newIncidences = { ...prev };
            delete newIncidences[event.id];
            return newIncidences;
        });
    };

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
                <div className = "contenido-tab-crear-asignatura-codigo-siglas-dia-hora-color-mod">
                    <div className="contenido-tab-crear-asignatura-codigo-siglas-nombre-completo-mod">
                        <div className="contenido-tab-crear-asignatura-codigo">
                            <p className="apartado-codigo">Código</p>
                            <ScheduleCreationInput className={"codigo-asignatura"} setStatusOnChange={setAsigCodeMod} value={asigCodeMod} type={`number`}/>
                        </div>
                        <div className="contenido-tab-crear-asignatura-siglas">
                            <p className="apartado-siglas">Siglas</p>
                            <ScheduleCreationInput className={"siglas-asignatura"} setStatusOnChange={setAsigInitialsMod} value={asigInitialsMod} type={`text`}/>
                        </div>
                        <div className= "contenido-tab-crear-asignatura-nombre-completo">
                            <p>Nombre completo</p>
                            <ScheduleCreationInput className={"nombre-completo"} setStatusOnChange={setAsigFullNameMod} value={asigFullNameMod} type={`text`}/>
                        </div>
                    </div>
                    <div className="contenido-tab-crear-asignatura-dia-hora-color">
                        <div className="contenido-tab-crear-asignatura-dia">
                            <p className="apartado-dia">Día</p>
                            <ScheduleCreationSelect placeholder={"Dia"} selectOptions={asigPossibleDays} setStatusOnChange={setAsigDayMod} value={asigDayMod}/>
                        </div>
                        <div className="contenido-tab-crear-asignatura-hora">
                            <p className="apartado-hora-inicio">Hora de inicio</p>
                            <ScheduleCreationSelect placeholder={"Hora"} selectOptions={asigStartTimes} setStatusOnChange={setAsigStartTimeMod} value={asigStartTimeMod}/>
                        </div>
                        <div className="contenido-tab-crear-asignatura-color">
                            <p className="apartado-color">Color</p>
                            <ScheduleCreationSelect placeholder={"Color"} className={`select-color`} selectOptions={asigPossibleColors} setStatusOnChange={setAsigColorMod} value={asigColorMod}/>
                        </div> 
                    </div>
                    
                </div>
                
                <div className= "contenido-tab-crear-asignatura-semestre-grupo-subgrupo-tipo-duracion-aula-mod">
                    <div className= "apartado-semestre">
                        <p>Semestre</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationSelect placeholder={"Semestre"} selectOptions={asigPossibleSemesters} className="numero-semestre" setStatusOnChange={setAsigSemesterMod} value={asigSemesterMod}/>
                        </div>
                    </div>
                    <div className= "apartado-grupo">
                        <p>Grupo</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationSelect placeholder={"Número"} selectOptions={asigPossibleGroupNumbers} className="numero-grupo" setStatusOnChange={setAsigGroupNumberMod} value={asigGroupNumberMod}/>
                        </div>
                    </div>
                    <div className= "apartado-subgrupo">
                        <p>Subgrupo</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationInput className={"subgrupo-laboratorio"} setStatusOnChange={setAsigLabGroupMod} value={asigLabGroupMod}/>  
                        </div>
                    </div>
                    <div className= "apartado-tipo">
                        <p>Tipo</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationSelect placeholder={"Tipo"} selectOptions={asigPossibleGroupType} className="tipo-grupo" setStatusOnChange={setAsigGroupTypeMod} value={asigGroupTypeMod}/>
                        </div>
                    </div>
                    <div className= "apartado-duracion">
                        <p>Duración</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                            <ScheduleCreationInput className={"duracion"} setStatusOnChange={setAsigDurationMod} value={asigDurationMod} type={`number`}/>
                        </div>
                    </div>
                    <div className= "apartado-aula">
                        <p>Aula</p>
                        <div className= "campos-semestre-grupo-subgrupo-tipo-duracion-aula">
                        <ScheduleCreationSelect placeholder={"Aula"} selectOptions={asigPossibleClasses} className="aula" setStatusOnChange={setAsigClassMod} value={asigClassMod}/>
                        </div>
                    </div>
                </div>
                <div className="contenido-tab-crear-asignatura-estudios-profesores-mod">
                    <div className= "contenido-tab-crear-asignatura-estudios">
                        <p className="apartado-estudios">Estudios donde se imparte, cursos y optatividad</p>
                        <div className= "cabecera-estudios-mod">
                            <div className= "cabecera-estudios-IS">
                                <p>GII-IS</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses} setStatusOnChange={setAsigCourseGII_ISMod} value={asigCourseGII_ISMod}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-TI">
                                <p>GII-TI</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourseGII_TIMod} value={asigCourseGII_TIMod}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-CO">
                                <p>GII-CO</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourseGII_COMod} value={asigCourseGII_COMod}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-EST">
                                <p>EST</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_ESTMod} value={asigCourse_ESTMod}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-INDat">
                                <p>INDat</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_INDatMod} value={asigCourse_INDatMod}/>
                                </div>
                            </div>
                            <div className= "cabecera-estudios-Master">
                                <p>Master</p>
                                <div className= "campos-estudios">
                                    <ScheduleCreationSelect placeholder={"..."} selectOptions={asigPossibleCourses}  setStatusOnChange={setAsigCourse_MasterMod} value={asigCourse_MasterMod}/>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className = "contenido-tab-crear-asignatura-profesores-mod">
                        <p className = "apartado-profesores-mod">Profesores</p>
                        <div className = "campo-primer-profesor-mod">
                            <p>Docente asignado</p>
                            <ScheduleCreationDropdownSelect placeholder={"Profesor..."} selectOptions={asigPossibleTeacherOptions}  setStatusOnChange={setAsigTeacherMod} value={asigTeacherMod}/>
                        </div>
                    </div>
                </div>
                {event.id in asigIncidencesMod && (
                    <div className = "contenido-tab-crear-asignatura-incidencias-mod">
                        <p className= "apartado-incidencias">Incidencias</p>
                        <ScheduleCreationMenuWarningsField text={asigIncidencesMod[event.id]}/>
                    </div>  
                )}
                
                <div className="contenido-tab-crear-asignatura-botones-mod">
                    {event.id in asigIncidencesMod && (
                        <ScheduleCreationAsigActionsButton text={`Borrar incidencia`} color={`#edbeba`} iconName={`delete`} setStatusOnClick={handleIncidenceRemoval}/>
                    )}
                    <ScheduleCreationAsigActionsButton text={`Borrar asignatura`} setStatusOnClick={setDeleteAsig} color={`#edbeba`} iconName={`delete`}/>
                    <ScheduleCreationAsigActionsButton text={`Modificar asignatura`} setStatusOnClick={setModifyAsig} color={`#edbeba`} iconName={`arrow circle up`}/>
                </div>
            </div>
      

        </div>
    );
};

export default ModifyCalendarEvent;
