import React from 'react'
import { useState, useRef, useEffect } from 'react';
import FiltersButton from './FiltersButton';
import './FiltersSection.css';
import IncludeLabsCheckbox from './IncludeLabsCheckbox';
import Draggable from 'react-draggable';
import { createPortal } from 'react-dom';
import IconButton from './IconButton';

const FiltersSection = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourse, setSelectedCourse, selectedGroup, setSelectedGroup, selectedMention, setSelectedMention, includeLabs, setIncludeLabs, setExportPDF}) => {
  

  const [selectedGradeButton, setSelectedGradeButton] = useState(null);
  const [selectedSemesterButton, setSelectedSemesterButton] = useState(null);
  const [selectedCourseButton, setSelectedCourseButton] = useState(null);
  const [selectedGroupButton, setSelectedGroupButton] = useState(null);
  const [selectedMentionButton, setSelectedMentionButton] = useState(null);

  const [size, setSize] = useState({ width: 600, height: 200 }); 
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const containerRef = useRef(null);


  const handleGradeSelect = (grade) => {
    setSelectedGrade(selectedGrade === grade ? "" : grade);
    setSelectedSemester("");
    setSelectedCourse("");
    setSelectedGroup("");
    setSelectedMention("");
    setSelectedSemesterButton(null);
    setSelectedCourseButton(null);
    setSelectedGroupButton(null);
    setSelectedMentionButton(null);
    setIncludeLabs(false);
  };

  const handleGradeSelectButton = (grade) => {
    setSelectedGradeButton(selectedGradeButton === grade ? null : grade);
  };

  const handleSemesterSelect = (semester) => {

    setSelectedSemester(selectedSemester === semester ? "" : semester);
    setSelectedCourse("");
      setSelectedGroup("");
      setSelectedMention("");
      setSelectedCourseButton(null);
      setSelectedGroupButton(null);
      setSelectedMentionButton(null);
      setIncludeLabs(false);
  };
  

  const handleSemesterSelectButton = (semester) => {
    setSelectedSemesterButton(selectedSemesterButton === semester ? null : semester);
    //console.log(semester);
  }

  const handleCourseSelect = (course) => {

    setSelectedCourse(selectedCourse === course ? "" : course);
    setSelectedGroup("");
      setSelectedMention("");
      setSelectedGroupButton(null);
      setSelectedMentionButton(null);
      setIncludeLabs(false);
  };

  const handleCourseSelectButton = (course) => {
    setSelectedCourseButton(selectedCourseButton === course ? null : course);
  };

  useEffect(() => {
    if (selectedCourse === "3º" || selectedCourse === "4º") {
      setSelectedGroup(null);
      setSelectedGroupButton(null);
    }
  }, [selectedCourse]);


  const handleGroupSelect = (group) => {
    setSelectedGroup(selectedGroup === group ? "" : group);
    //console.log("Grupo seleccionado:", group);
  };

  const handleGroupSelectButton = (group) => {
    setSelectedGroupButton(selectedGroupButton === group ? null : group);
    //console.log("Grupo seleccionado:", group);
  }

  const handleMentionSelect = (mention) => {
    setSelectedMention(selectedMention === mention ? "" : mention);
    setIncludeLabs(false);
    //console.log("Mención seleccionada:", mention);
  };

  const handleMentionSelectButton = (mention) => {
    setSelectedMentionButton(selectedMentionButton === mention ? null : mention);
    console.log("Mención seleccionada:", mention);
  };

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
  

  const handleExportPDF = () => {
    setExportPDF(true);
  }

  const calculateNewHeight = () => {
    let newHeight = 300;
    if (selectedGradeButton) {
      newHeight += 50;
    }
  
    if (selectedSemesterButton) {
      if(selectedGradeButton !== "Master"){
        newHeight += 90;
      } else {
        newHeight += 120;
      }
      
    }
  
    if (selectedCourseButton) {
        newHeight += 180;
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
    }, [selectedGradeButton, selectedSemesterButton, selectedCourseButton, selectedGroupButton,selectedMentionButton]);

  return createPortal(
    <div ref={containerRef} style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <Draggable handle=".filter-menu-header">
      <div
          className="floating-filter-menu"
          style={{ width: size.width, height: size.height, pointerEvents: "auto" }}
        >
          <div className="filter-menu-header">
            <IconButton name={`hand paper outline`} size={`large`}></IconButton>
          </div>

          <div className="filter-menu-save-export-actions-content-generic">
            <IconButton name="file pdf outline" size={`big`} handleClick={handleExportPDF} />
          </div>

          <div>
            <div className="filters-container-section-generic">
              <div className="grade-section-generic">
                {['INF', 'EST', 'I + E', 'Master'].map((text) => (
                  <FiltersButton 
                    key={text} 
                    content={text} 
                    onClick={() => {
                      handleGradeSelect(text);
                      handleGradeSelectButton(text);
                    }
                  } 
                  isSelected={selectedGradeButton === text}
                  />
                ))}
              </div>

              {selectedGradeButton && (
                <>
                  <div className="semester-section-generic">
                    {selectedGradeButton !== "Master" && (
                      <>
                        <FiltersButton key={"1ºC"} content={"1ºC"} onClick={() => {handleSemesterSelectButton("1ºC"); handleSemesterSelect("1ºC");}} isSelected={selectedSemesterButton === "1ºC"} />
                        <FiltersButton key={"2ºC"} content={"2ºC"} onClick={() => {handleSemesterSelectButton("2ºC"); handleSemesterSelect("2ºC");}} isSelected={selectedSemesterButton === "2ºC"}/>
                      </>
                    )}
                    {selectedGradeButton === "Master" && (
                      <>
                        <FiltersButton className="first-semester-button" key={"1er Semestre"} content={"1er Semestre"} onClick={() =>{handleSemesterSelectButton("1er Semestre"); handleSemesterSelect("1er Semestre");} } isSelected={selectedSemesterButton === "1er Semestre"} />
                        <FiltersButton className="second-semester-button" key={"2º Semestre"} content={"2º Semestre"} onClick={() => {handleSemesterSelectButton("2º Semestre"); handleSemesterSelect("2º Semestre");}} isSelected={selectedSemesterButton === "2º Semestre"}/>
                        <FiltersButton className="third-semester-button" key={"3er Semestre"} content={"3er Semestre"} onClick={() =>{handleSemesterSelectButton("3er Semestre"); handleSemesterSelect("3er Semestre");} } isSelected={selectedSemesterButton === "3er Semestre"} />
                        <FiltersButton className="third-semester-button" key={"4º Semestre"} content={"4º Semestre"} onClick={() => {handleSemesterSelectButton("4º Semestre"); handleSemesterSelect("4º Semestre");}} isSelected={selectedSemesterButton === "4º Semestre"}/>
                      </>
                    )}
                  </div>
                  {selectedGradeButton === "Master" && selectedSemesterButton && (
                      <IncludeLabsCheckbox 
                        text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                        includeLabs={includeLabs} 
                        setIncludeLabs={setIncludeLabs} 
                      />
                  )}
                </>
                
              )}

              {selectedGradeButton !== "Master" && selectedSemesterButton && (
                <>
                  <div className="course-section-generic">
                    <FiltersButton key={"1º"} content={"1º"} onClick={() => {
                      handleCourseSelect("1º");
                      handleCourseSelectButton("1º");
                    }}
                    isSelected={selectedCourseButton === "1º"}
                    />
                    <FiltersButton key={"2º"} content={"2º"} onClick={() => {
                      handleCourseSelect("2º");
                      handleCourseSelectButton("2º");
                    }}
                    isSelected={selectedCourseButton === "2º"}
                    />
                    <FiltersButton key={"3º"} content={"3º"} onClick={() => {
                      handleCourseSelect("3º");
                      handleCourseSelectButton("3º");
                    }}
                    isSelected={selectedCourseButton === "3º"}
                    />
                    <FiltersButton key={"4º"} content={"4º"} onClick={() => {
                      handleCourseSelect("4º");
                      handleCourseSelectButton("4º");
                    }}
                    isSelected={selectedCourseButton === "4º"}
                    />
                    
                    {selectedGradeButton === "I + E" && (
                      
                        <FiltersButton className= "fifth-course-button" key={"5º"} content={"5º"} onClick={() => {
                          handleCourseSelect("5º");
                          handleCourseSelectButton("5º");
                        }}
                        isSelected={selectedCourseButton === "5º"}
                        />   
                    )} 
                  </div>
                </>
              )}

              {selectedGradeButton === "INF" && selectedSemesterButton && selectedCourseButton && (
                (selectedCourseButton !== "3º" && selectedCourseButton !== "4º") && (
                  <>
                    <div className="group-section-generic">
                        <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1"); handleGroupSelectButton("T1")}} isSelected={selectedGroupButton === "T1"}/>
                        {(selectedCourseButton === "1º" || selectedCourseButton === "2º") && (
                          <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2"); handleGroupSelectButton("T2")}} isSelected={selectedGroupButton === "T2"}/>
                        )}
                        {selectedCourseButton === "1º" && (
                          <FiltersButton className="third-group-button" key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3"); handleGroupSelectButton("T3")}} isSelected={selectedGroupButton === "T3"}/>
                        )}
                    </div>
                    <IncludeLabsCheckbox 
                      text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                      includeLabs={includeLabs} 
                      setIncludeLabs={setIncludeLabs} 
                    />
                  </>
                )
              )}
              
              {selectedGradeButton === "INF" && selectedSemesterButton && (selectedCourseButton === "3º" || selectedCourseButton === "4º") && (
                  <>
                    <div className="mention-section-generic">
                      <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleMentionSelect("IS"); handleMentionSelectButton("IS")}} isSelected={selectedMentionButton === "IS"}/>
                      <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleMentionSelect("CO"); handleMentionSelectButton("CO")}} isSelected={selectedMentionButton === "CO"}/>
                      <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleMentionSelect("TI"); handleMentionSelectButton("TI")}} isSelected={selectedMentionButton === "TI"}/>
                    </div>
                      <IncludeLabsCheckbox 
                        text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                        includeLabs={includeLabs} 
                        setIncludeLabs={setIncludeLabs} 
                      />
                  </>
                  
                )
              }

              {(selectedGradeButton === "EST" || selectedGradeButton === "I + E") && selectedSemesterButton && selectedCourseButton && (
                <>
                  <div className="group-section-generic">
                    <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1"); handleGroupSelectButton("T1")}} isSelected={selectedGroupButton === "T1"}/>
                    <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2"); handleGroupSelectButton("T2")}} isSelected={selectedGroupButton === "T2"}/>
                    <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3"); handleGroupSelectButton("T3")}} isSelected={selectedGroupButton === "T3"}/>
                  </div>
                  <IncludeLabsCheckbox 
                    text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                    includeLabs={includeLabs} 
                    setIncludeLabs={setIncludeLabs} 
                  />
                </>
              )}
              

            </div>

          </div>

          <div className="resize-handle" onMouseDown={handleMouseDownResize} />
        </div>
      </Draggable>
    </div>,
    document.body
    
  );
};

export default FiltersSection;