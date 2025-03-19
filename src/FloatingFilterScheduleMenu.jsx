import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { createPortal } from 'react-dom';
import ScheduleCreationMenuTabs from './ScheduleCreationMenuTabs';
import { X } from 'lucide-react'; // Icono de cierre
import './FloatingFilterScheduleMenu.css';

const FloatingFilterScheduleMenu = ({
  selectedGrade, setSelectedGrade,
  selectedSemester, setSelectedSemester,
  selectedCourse, setSelectedCourse,
  selectedGroup, setSelectedGroup,
  selectedMention, setSelectedMention
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return createPortal(
    <Draggable handle=".filter-menu-header">
      <div className="floating-filter-menu">
        {/* Cabecera arrastrable con la X bien alineada */}
        <div className="filter-menu-header">
          <div className="filter-menu-header-content">
            <button className="filter-menu-close" onClick={handleClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Contenido del menú */}
        <ScheduleCreationMenuTabs
          selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
          selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester}
          selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}
          selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}
          selectedMention={selectedMention} setSelectedMention={setSelectedMention}
        />
      </div>
    </Draggable>,
    document.body
  );
};

export default FloatingFilterScheduleMenu;
