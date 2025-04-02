import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import ScheduleCreationMenuCalendarTab from './ScheduleCreationMenuCalendarTab';
import './ScheduleCreationMenuTabs.css';
import ScheduleCreationMenuAsigTab from './ScheduleCreationMenuAsigTab';

const Tabs = ({ panes }) => {
    return (
      <Tab
        menu={{ className: "custom-tabs-menu" }} // Aplica la clase personalizada
        panes={panes.map(({ menuItem, children }) => ({
          menuItem,
          render: () => <TabPane>{children}</TabPane>,
        }))}
      />
    );
  };

const ScheduleCreationMenuTabs = ({selectedGrade, setSelectedGrade, 
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
  setAsigGroupNumber, asigLabGroup, setAsigLabGroup,
  asigPossibleGroupType, asigDuration, setAsigDuration,
  asigPossibleCourses, asigCourseGII_IS, setAsigCourseGII_IS,
  asigCourseGII_TI, setAsigCourseGII_TI, asigCourseGII_CO,
  setAsigCourseGII_CO, asigCourse_EST, setAsigCourse_EST,
  asigCourse_INDat, setAsigCourse_INDat, asigCourse_Master,
  setAsigCourse_Master, asigTeacher, setAsigTeacher,
  asigIncidences, setAsigIncidences}) => {
  const panes = [
    {
      menuItem: { key: 'calendar outline', icon: 'calendar outline', content: 'Gestión de horarios  ' },
      children: <ScheduleCreationMenuCalendarTab selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} selectedMention={selectedMention} setSelectedMention={setSelectedMention} warningMessage={warningMessage}/>,
    },
    {
      menuItem: { key: 'add circle', icon: 'add circle', content: 'Crear asignaturas'  },
      children: <ScheduleCreationMenuAsigTab asigCode={asigCode} setAsigCode={setAsigCode} asigInitials={asigInitials}
      setAsigInitials={setAsigInitials} asigPossibleDays={asigPossibleDays} asigDay={asigDay}
      setAsigDay={setAsigDay} asigStartTimes={asigStartTimes} asigFullName={asigFullName} setAsigFullName={setAsigFullName}
      asigStartTime={asigStartTime} setAsigStartTime={setAsigStartTime} asigPossibleColors={asigPossibleColors}
      asigColor={asigColor} setAsigColor={setAsigColor}
      asigPossibleSemesters={asigPossibleSemesters} asigSemester={asigSemester} setAsigSemester={setAsigSemester}
      asigPossibleGroupNumber={asigPossibleGroupNumbers} asigGroupNumber={asigGroupNumber} setAsigGroupNumber={setAsigGroupNumber}
      asigLabGroup={asigLabGroup} setAsigLabGroup={setAsigLabGroup}
      asigPossibleGroupType={asigPossibleGroupType} asigDuration={asigDuration} setAsigDuration={setAsigDuration}
      asigPossibleCourses={asigPossibleCourses} asigCourseGII_IS={asigCourseGII_IS} setAsigCourseGII_IS={setAsigCourseGII_IS}
      asigCourseGII_TI={asigCourseGII_TI} setAsigCourseGII_TI={setAsigCourseGII_TI} asigCourseGII_CO={asigCourseGII_CO}
      setAsigCourseGII_CO={setAsigCourseGII_CO} asigCourse_EST={asigCourse_EST} setAsigCourse_EST={setAsigCourse_EST}
      asigCourse_INDat={asigCourse_INDat} setAsigCourse_INDat={setAsigCourse_INDat} asigCourse_Master={asigCourse_Master}
      setAsigCourse_Master={setAsigCourse_Master} asigTeacher={asigTeacher} setAsigTeacher={setAsigTeacher}
      asigIncidences={asigIncidences} setAsigIncidences={setAsigIncidences} />,
    },
  ];

  return <Tabs panes={panes} />;
};

export default ScheduleCreationMenuTabs;
