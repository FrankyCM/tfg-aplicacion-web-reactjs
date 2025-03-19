import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import ScheduleCreationMenuCalendarTab from './ScheduleCreationMenuCalendarTab';
import './ScheduleCreationMenuTabs.css';
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

const ScheduleCreationMenuTabs = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourse, setSelectedCourse, selectedGroup, setSelectedGroup, selectedMention, setSelectedMention}) => {
  const panes = [
    {
      menuItem: { key: 'calendar outline', icon: 'calendar outline', content: 'Gestión de horarios  ' },
      children: <ScheduleCreationMenuCalendarTab selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} selectedMention={selectedMention} setSelectedMention={setSelectedMention}/>,
    },
    {
      menuItem: { key: 'add circle', icon: 'add circle', content: 'Crear asignaturas'  },
      children: <div>Contenido de Mensajes</div>,
    },
  ];

  return <Tabs panes={panes} />;
};

export default ScheduleCreationMenuTabs;
