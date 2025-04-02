import { useState, useEffect } from 'react';
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';
import './ScheduleCreationMenuAsigTab.css';
import ScheduleCreationInput from './ScheduleCreationInput';
import ScheduleCreationSelect from './ScheduleCreationSelect';

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
    setAsigCourse_Master, asigTeacher, setAsigTeacher,
    asigIncidences, setAsigIncidences}) => {



    return(
        <div className = "contenido-tab-crear-asignatura">
            <div className = "contenido-tab-crear-asignatura-codigo-siglas-dia-hora-color">
                <ScheduleCreationInput className={"codigo-asignatura"}/>
                <ScheduleCreationInput className={"siglas-asignatura"}/>
                <ScheduleCreationSelect placeholder={"Dia"} selectOptions={asigPossibleDays}/>
                <ScheduleCreationSelect placeholder={"Hora"} selectOptions={asigStartTimes}/>
                <ScheduleCreationSelect placeholder={"Color"} selectOptions={asigPossibleColors}/>
            </div>
        </div>
    )
}

export default ScheduleCreationMenuAsigTab;