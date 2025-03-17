import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import ScheduleCreationMenuCalendarTab from './ScheduleCreationMenuCalendarTab';

const Tabs = ({ panes }) => {
  return (
    <Tab
      panes={panes.map(({ menuItem, children }) => ({
        menuItem,
        render: () => <TabPane>{children}</TabPane>,
      }))}
    />
  );
};

const ScheduleCreationMenuTabs = () => {
  const panes = [
    {
      menuItem: { key: 'calendar outline', icon: 'calendar outline', content: 'Gestión de horarios  ' },
      children: <ScheduleCreationMenuCalendarTab />,
    },
    {
      menuItem: { key: 'add circle', icon: 'add circle', content: 'Crear asignaturas'  },
      children: <div>Contenido de Mensajes</div>,
    },
  ];

  return <Tabs panes={panes} />;
};

export default ScheduleCreationMenuTabs;
