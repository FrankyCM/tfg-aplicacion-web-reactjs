import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import ScheduleCreationMenuCalendarTab from './ScheduleCreationMenuCalendarTab';
import './ScheduleCreationMenuTabs.css';
import ScheduleCreationMenuAsigTab from './ScheduleCreationMenuAsigTab';

const ScheduleCreationMenuTabs = ({
  selectedGrade, setSelectedGrade,
  selectedSemester, setSelectedSemester,
  selectedCourse, setSelectedCourse,
  selectedGroup, setSelectedGroup,
  selectedMention, setSelectedMention,
  warningMessage, asigCode, setAsigCode, asigInitials,
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
  setAsigCourse_Master, asigPossibleTeacherOptions, asigTeacher,
  setAsigTeacher, asigIncidences, setAsigIncidences, incidenceOnCreatedAsig, setIncidenceOnCreatedAsig,
   createAsig, setCreateAsig, clearFormulary, setClearFormulary, setSize
}) => {


  const calculateNewHeight = () => {
    let newHeight = 400;
    if (selectedGrade) {
      newHeight += 120;
    }
  
    if (selectedSemester) {
      newHeight += 140;
    }
  
    if (selectedCourse) {
      if(selectedGrade !== "INF"){
        newHeight += 110;
      } else {
        newHeight += 145;
      }
    }

    if(warningMessage){
      newHeight += 100;
    }

    return newHeight;
  };

  // ✅ Esta función ahora está dentro del componente y puede acceder a las props
  const handleTabChange = (e, { activeIndex }) => {
    if (activeIndex === 0) {
      /*console.log("selectedGrade:", selectedGrade);
      console.log("selectedSemester:", selectedSemester);
      console.log("selectedCourse:", selectedCourse);
      console.log("selectedGroup:", selectedGroup);
      console.log("selectedMention:", selectedMention);
      console.log("warningMessage:", warningMessage);*/
      setSize(() => ({
        width: 550,
        height: calculateNewHeight(),
      }));
    } else {
      setSize({ width: 1956, height: 864 });
    }
  };

  const panes = [
    {
      menuItem: { key: 'calendar outline', icon: 'calendar outline', content: 'Gestión de horarios' },
      children: <ScheduleCreationMenuCalendarTab
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        selectedMention={selectedMention}
        setSelectedMention={setSelectedMention}
        warningMessage={warningMessage}
      />,
    },
    {
      menuItem: { key: 'add circle', icon: 'add circle', content: 'Crear asignaturas' },
      children: <ScheduleCreationMenuAsigTab
        asigCode={asigCode} setAsigCode={setAsigCode}
        asigInitials={asigInitials} setAsigInitials={setAsigInitials}
        asigPossibleDays={asigPossibleDays} asigDay={asigDay} setAsigDay={setAsigDay}
        asigStartTimes={asigStartTimes}
        asigFullName={asigFullName} setAsigFullName={setAsigFullName}
        asigStartTime={asigStartTime} setAsigStartTime={setAsigStartTime}
        asigPossibleColors={asigPossibleColors}
        asigColor={asigColor} setAsigColor={setAsigColor}
        asigPossibleSemesters={asigPossibleSemesters} asigSemester={asigSemester} setAsigSemester={setAsigSemester}
        asigPossibleGroupNumbers={asigPossibleGroupNumbers} asigGroupNumber={asigGroupNumber} setAsigGroupNumber={setAsigGroupNumber}
        asigGroupType={asigGroupType} setAsigGroupType={setAsigGroupType}
        asigLabGroup={asigLabGroup} setAsigLabGroup={setAsigLabGroup}
        asigPossibleGroupType={asigPossibleGroupType}
        asigDuration={asigDuration} setAsigDuration={setAsigDuration}
        asigPossibleClasses={asigPossibleClasses}
        asigClass={asigClass} setAsigClass={setAsigClass}
        asigPossibleCourses={asigPossibleCourses}
        asigCourseGII_IS={asigCourseGII_IS} setAsigCourseGII_IS={setAsigCourseGII_IS}
        asigCourseGII_TI={asigCourseGII_TI} setAsigCourseGII_TI={setAsigCourseGII_TI}
        asigCourseGII_CO={asigCourseGII_CO} setAsigCourseGII_CO={setAsigCourseGII_CO}
        asigCourse_EST={asigCourse_EST} setAsigCourse_EST={setAsigCourse_EST}
        asigCourse_INDat={asigCourse_INDat} setAsigCourse_INDat={setAsigCourse_INDat}
        asigCourse_Master={asigCourse_Master} setAsigCourse_Master={setAsigCourse_Master}
        asigPossibleTeacherOptions={asigPossibleTeacherOptions}
        asigTeacher={asigTeacher} setAsigTeacher={setAsigTeacher}
        asigIncidences={asigIncidences} setAsigIncidences={setAsigIncidences} 
        incidenceOnCreatedAsig={incidenceOnCreatedAsig} setIncidenceOnCreatedAsig={setIncidenceOnCreatedAsig}
        createAsig={createAsig} setCreateAsig={setCreateAsig}
        clearFormulary={clearFormulary} setClearFormulary={setClearFormulary}
      />,
    },
  ];

  return (
    <Tab
      menu={{ className: "custom-tabs-menu" }}
      panes={panes.map(({ menuItem, children }) => ({
        menuItem,
        render: () => <TabPane>{children}</TabPane>,
      }))}
      onTabChange={handleTabChange}
    />
  );
};

export default ScheduleCreationMenuTabs;
