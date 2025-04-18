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
  warningMessage, setSave, setExportPDF,
  asigCode, setAsigCode, asigInitials,
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
  setAsigCourse_Master, asigPossibleTeacherOptions, asigTeacher, setAsigTeacher,
  asigIncidences, setAsigIncidences, createAsig, setCreateAsig, 
  clearFormulary, setClearFormulary, setOpenFile
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [size, setSize] = useState({ width: 550, height: 300 }); // Estado del tamaño
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const containerRef = useRef(null);

  const handleClose = () => setIsVisible(false);
  const handleSave = () => setSave(true);
  const handleExportPDF = () => setExportPDF(true);
  const handleOpenFile = () => setOpenFile(true);

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
  
    useEffect(() => {
        if (containerRef.current) {
          const newHeight = calculateNewHeight(); 
          setSize((prevSize) => {
            return {
              ...prevSize,
              height: Math.max(prevSize.height, newHeight),
            };
          });
        }
      }, [selectedGrade, selectedSemester, selectedCourse, selectedGroup, selectedMention, warningMessage]);

  return createPortal(
    <div ref={containerRef} style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
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
            <IconButton name="folder open outline" size={`big`} handleClick={handleOpenFile}/>
          </div>

          {/* Contenido del menú */}
          <ScheduleCreationMenuTabs
            selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
            selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester}
            selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}
            selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}
            selectedMention={selectedMention} setSelectedMention={setSelectedMention}
            warningMessage={warningMessage} asigCode={asigCode} setAsigCode={setAsigCode} asigInitials={asigInitials}
            setAsigInitials={setAsigInitials} asigPossibleDays={asigPossibleDays} asigDay={asigDay}
            setAsigDay={setAsigDay} asigStartTimes={asigStartTimes} asigFullName={asigFullName} setAsigFullName={setAsigFullName}
            asigStartTime={asigStartTime} setAsigStartTime={setAsigStartTime} asigPossibleColors={asigPossibleColors}
            asigColor={asigColor} setAsigColor={setAsigColor}
            asigPossibleSemesters={asigPossibleSemesters} asigSemester={asigSemester} setAsigSemester={setAsigSemester}
            asigPossibleGroupNumbers={asigPossibleGroupNumbers} asigGroupNumber={asigGroupNumber} setAsigGroupNumber={setAsigGroupNumber}
            asigGroupType={asigGroupType} setAsigGroupType={setAsigGroupType} asigLabGroup={asigLabGroup} setAsigLabGroup={setAsigLabGroup}
            asigPossibleGroupType={asigPossibleGroupType} asigDuration={asigDuration} setAsigDuration={setAsigDuration} asigPossibleClasses={asigPossibleClasses}
            asigClass={asigClass} setAsigClass={setAsigClass} asigPossibleCourses={asigPossibleCourses} asigCourseGII_IS={asigCourseGII_IS} setAsigCourseGII_IS={setAsigCourseGII_IS}
            asigCourseGII_TI={asigCourseGII_TI} setAsigCourseGII_TI={setAsigCourseGII_TI} asigCourseGII_CO={asigCourseGII_CO}
            setAsigCourseGII_CO={setAsigCourseGII_CO} asigCourse_EST={asigCourse_EST} setAsigCourse_EST={setAsigCourse_EST}
            asigCourse_INDat={asigCourse_INDat} setAsigCourse_INDat={setAsigCourse_INDat} asigCourse_Master={asigCourse_Master}
            setAsigCourse_Master={setAsigCourse_Master} asigPossibleTeacherOptions={asigPossibleTeacherOptions} asigTeacher={asigTeacher} setAsigTeacher={setAsigTeacher}
            asigIncidences={asigIncidences} setAsigIncidences={setAsigIncidences} createAsig={createAsig} setCreateAsig={setCreateAsig}
            clearFormulary={clearFormulary} setClearFormulary={setClearFormulary}
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
