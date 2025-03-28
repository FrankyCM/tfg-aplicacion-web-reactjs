import React, { useState, useRef, useEffect } from 'react';
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
  warningMessage, setSave, setExportPDF
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [size, setSize] = useState({ width: 400, height: 350 }); // Estado del tamaño
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);

  const handleClose = () => setIsVisible(false);
  const handleSave = () => setSave(true);
  const handleExportPDF = () => setExportPDF(true);

  // Iniciar el redimensionamiento
  const handleMouseDownResize = (e) => {
    setIsResizing(true);
    resizeRef.current = { startX: e.clientX, startY: e.clientY, startWidth: size.width, startHeight: size.height };
  };

  // Ajustar tamaño en tiempo real
  const handleMouseMoveResize = (e) => {
    if (!isResizing) return;

    const { startX, startY, startWidth, startHeight } = resizeRef.current;
    const newWidth = startWidth + (e.clientX - startX);
    const newHeight = startHeight + (e.clientY - startY);

    setSize({
      width: Math.max(newWidth, 200), // Mínimo 200px
      height: Math.max(newHeight, 200),
    });
  };

  // Finalizar el redimensionamiento
  const handleMouseUpResize = () => {
    setIsResizing(false);
  };

  // Agregar y quitar eventos globales para el redimensionamiento
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMoveResize);
      document.addEventListener("mouseup", handleMouseUpResize);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveResize);
      document.removeEventListener("mouseup", handleMouseUpResize);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveResize);
      document.removeEventListener("mouseup", handleMouseUpResize);
    };
  }, [isResizing]);

  if (!isVisible) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <Draggable handle=".filter-menu-header">
        <div
          className="floating-filter-menu"
          style={{ width: size.width, height: size.height, pointerEvents: "auto" }}
        >
          {/* Cabecera arrastrable con la X bien alineada */}
          <div className="filter-menu-header">
            <div className="filter-menu-header-content">
              <button className="filter-menu-close" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="filter-menu-save-export-actions-content">
            <IconButton name="save outline" size={`big`} handleClick={handleSave} />
            <IconButton name="file pdf outline" size={`big`} handleClick={handleExportPDF} />
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

          {/* Esquinas de redimensionamiento */}
          <div className="resize-handle" onMouseDown={handleMouseDownResize} />
        </div>
      </Draggable>
    </div>,
    document.body
  );
};

export default FloatingFilterScheduleMenu;
