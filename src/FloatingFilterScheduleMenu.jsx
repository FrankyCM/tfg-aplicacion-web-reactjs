import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { createPortal } from 'react-dom';
import ScheduleCreationMenuTabs from './ScheduleCreationMenuTabs';
import { X } from 'lucide-react'; // Icono de cierre
import './FloatingFilterScheduleMenu.css';
import IconButton from './IconButton';

const FloatingFilterScheduleMenu = ({
  selectedGrade, setSelectedGrade,
  selectedSemester, setSelectedSemester,
  selectedCourse, setSelectedCourse,
  selectedGroup, setSelectedGroup,
  selectedMention, setSelectedMention,
  warningMessage, setSave
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <Draggable handle=".filter-menu-header">
        <div className="floating-filter-menu" style={{ position: "fixed", pointerEvents: "auto" }}>
          {/* Cabecera arrastrable con la X bien alineada */}
          <div className="filter-menu-header">
            <div className="filter-menu-header-content">
              <button className="filter-menu-close" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>
          </div>
          <div>
            <IconButton name={`save outline`} setSave={setSave}/>
          </div>

          {/* Contenido del menú */}
          <ScheduleCreationMenuTabs
            selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
            selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester}
            selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}
            selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}
            selectedMention={selectedMention} setSelectedMention={setSelectedMention}
            warningMessage={warningMessage}
          />
        </div>
      </Draggable>
    </div>,
    document.body
  );
};

export default FloatingFilterScheduleMenu;
