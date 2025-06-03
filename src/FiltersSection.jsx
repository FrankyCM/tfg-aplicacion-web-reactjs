import React from 'react';
import { useState, useRef, useEffect } from 'react';
import FiltersButton from './FiltersButton';
import './FiltersSection.css';
import IncludeLabsCheckbox from './IncludeLabsCheckbox';
import Draggable from 'react-draggable';
import { createPortal } from 'react-dom';
import IconButton from './IconButton';

const FiltersSection = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourse, setSelectedCourse, selectedGroup, setSelectedGroup, selectedMention, setSelectedMention, includeLabs, setIncludeLabs, setExportPDF}) => {
  



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
    setIncludeLabs(false);
  };


  const handleSemesterSelect = (semester) => {
    setSelectedSemester(selectedSemester === semester ? "" : semester);
    setSelectedCourse("");
    setSelectedGroup("");
    setSelectedMention("");
    setIncludeLabs(false);
  };
  

  const handleCourseSelect = (course) => {
    setSelectedCourse(selectedCourse === course ? "" : course);
    setSelectedGroup("");
    setSelectedMention("");
    setIncludeLabs(false);
  };

  useEffect(() => {
    if (selectedCourse === "3º" || selectedCourse === "4º") {
      setSelectedGroup(null);
    }
  }, [selectedCourse]);


  const handleGroupSelect = (group) => {
    setSelectedGroup(selectedGroup === group ? "" : group);
    //console.log("Grupo seleccionado:", group);
  };

  const handleMentionSelect = (mention) => {
    setSelectedMention(selectedMention === mention ? "" : mention);
    setIncludeLabs(false);
    //console.log("Mención seleccionada:", mention);
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
      
    if (selectedGrade) {
      newHeight += 50;
    }
  
    if (selectedSemester) {
      if(selectedGrade !== "Master"){
        newHeight += 90;
      } else {
        newHeight += 120;
      }
    }
  
    if (selectedCourse) {
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
    }, [selectedGrade, selectedSemester, selectedCourse, selectedGroup,selectedMention]);

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
                    }
                  } 
                  isSelected={selectedGrade === text}
                  />
                ))}
              </div>

              {selectedGrade && (
                <>
                  <div className="semester-section-generic">
                    {selectedGrade !== "Master" && (
                      <>
                        <FiltersButton key={"1ºC"} content={"1ºC"} onClick={() => {handleSemesterSelect("1ºC");}} isSelected={selectedSemester === "1ºC"} />
                        <FiltersButton key={"2ºC"} content={"2ºC"} onClick={() => {handleSemesterSelect("2ºC");}} isSelected={selectedSemester === "2ºC"}/>
                      </>
                    )}
                    {selectedGrade === "Master" && (
                      <>
                        <FiltersButton className="first-semester-button" key={"1er Semestre"} content={"1er Semestre"} onClick={() =>{handleSemesterSelect("1er Semestre");} } isSelected={selectedSemester === "1er Semestre"} />
                        <FiltersButton className="second-semester-button" key={"2º Semestre"} content={"2º Semestre"} onClick={() => {handleSemesterSelect("2º Semestre");}} isSelected={selectedSemester === "2º Semestre"}/>
                        <FiltersButton className="third-semester-button" key={"3er Semestre"} content={"3er Semestre"} onClick={() =>{handleSemesterSelect("3er Semestre");} } isSelected={selectedSemester === "3er Semestre"} />
                        <FiltersButton className="third-semester-button" key={"4º Semestre"} content={"4º Semestre"} onClick={() => {handleSemesterSelect("4º Semestre");}} isSelected={selectedSemester === "4º Semestre"}/>
                      </>
                    )}
                  </div>
                  {selectedGrade === "Master" && selectedSemester && (
                      <IncludeLabsCheckbox 
                        text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                        includeLabs={includeLabs} 
                        setIncludeLabs={setIncludeLabs} 
                      />
                  )}
                </>
                
              )}

              {selectedGrade !== "Master" && selectedSemester && (
                <>
                  <div className="course-section-generic">
                    <FiltersButton key={"1º"} content={"1º"} onClick={() => {
                      handleCourseSelect("1º");
                    }}
                    isSelected={selectedCourse === "1º"}
                    />
                    <FiltersButton key={"2º"} content={"2º"} onClick={() => {
                      handleCourseSelect("2º");
                    }}
                    isSelected={selectedCourse === "2º"}
                    />
                    <FiltersButton key={"3º"} content={"3º"} onClick={() => {
                      handleCourseSelect("3º");
                    }}
                    isSelected={selectedCourse === "3º"}
                    />
                    <FiltersButton key={"4º"} content={"4º"} onClick={() => {
                      handleCourseSelect("4º");
                    }}
                    isSelected={selectedCourse === "4º"}
                    />
                    
                    {selectedGrade=== "I + E" && (
                      
                        <FiltersButton className= "fifth-course-button" key={"5º"} content={"5º"} onClick={() => {
                          handleCourseSelect("5º");
                        }}
                        isSelected={selectedCourse === "5º"}
                        />   
                    )} 
                  </div>
                </>
              )}

              {selectedGrade === "INF" && selectedSemester && selectedCourse && (
                (selectedCourse !== "3º" && selectedCourse !== "4º") && (
                  <>
                    <div className="group-section-generic">
                        <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1");}} isSelected={selectedGroup === "T1"}/>
                        <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2");}} isSelected={selectedGroup === "T2"}/>
                        <FiltersButton className="third-group-button" key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3");}} isSelected={selectedGroup === "T3"}/>

                    </div>
                    <IncludeLabsCheckbox 
                      text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                      includeLabs={includeLabs} 
                      setIncludeLabs={setIncludeLabs} 
                    />
                  </>
                )
              )}
              
              {selectedGrade === "INF" && selectedSemester && (selectedCourse === "3º" || selectedCourse === "4º") && (
                  <>
                    <div className="mention-section-generic">
                      <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleMentionSelect("IS");}} isSelected={selectedMention === "IS"}/>
                      <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleMentionSelect("CO");}} isSelected={selectedMention === "CO"}/>
                      <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleMentionSelect("TI");}} isSelected={selectedMention === "TI"}/>
                    </div>
                      <IncludeLabsCheckbox 
                        text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                        includeLabs={includeLabs} 
                        setIncludeLabs={setIncludeLabs} 
                      />
                  </>
                  
                )
              }

              {(selectedGrade === "EST" || selectedGrade === "I + E") && selectedSemester && selectedCourse && (
                <>
                  <div className="group-section-generic">
                    <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1");}} isSelected={selectedGroup === "T1"}/>
                    <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2");}} isSelected={selectedGroup === "T2"}/>
                    <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3");}} isSelected={selectedGroup === "T3"}/>
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