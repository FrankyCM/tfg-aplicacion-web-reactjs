import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Label } from 'semantic-ui-react'
import FiltersButton from './FiltersButton';
import FiltersSelect from './FiltersSelect';
import './FiltersSectionCustom.css';
import IncludeLabsCheckbox from './IncludeLabsCheckbox';
import Draggable from 'react-draggable';
import { createPortal } from 'react-dom';
import IconButton from './IconButton';

const FiltersSectionCustom = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourses, setSelectedCourses, selectedFirstGroup, setSelectedFirstGroup, selectedSecondGroup, setSelectedSecondGroup, selectedThirdMention, setSelectedThirdMention, selectedFourthMention, setSelectedFourthMention, selectedFifthGroup, setSelectedFifthGroup, selectedAsigs, setSelectedAsigs, asigOptions, setFilteredEvents, includeLabs, setIncludeLabs, setExportPDF, asigColors}) => {
  
  const [selectedAsigValue, setSelectedAsigValue] = useState("");



  const [size, setSize] = useState({ width: 600, height: 200 }); 
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const containerRef = useRef(null);

  const handleGradeSelect = (grade) => {
    setFilteredEvents([]);  // Reset de eventos del horario de asig seleccionadas
    setSelectedAsigs([]); // Reset de asignaturas seleccionadas para que no aparezcan sus eventos en el horario
    setSelectedGrade(selectedGrade === grade ? "" : grade);
    setSelectedSemester("");
    setSelectedCourses([]);
    setSelectedFirstGroup("");
    setSelectedSecondGroup("");
    setSelectedThirdMention("");
    setSelectedFourthMention("");
    setSelectedFifthGroup("");
    setIncludeLabs(false);
  };


  const handleSemesterSelect = (semester) => {
    setSelectedSemester(selectedSemester === semester ? "" : semester);
    setFilteredEvents([]);  // Reset de eventos del horario de asig seleccionadas
    setSelectedAsigs([]); // Reset de asignaturas seleccionadas para que no aparezcan sus eventos en el horario
    setSelectedCourses([]);
    setSelectedFirstGroup("");
    setSelectedSecondGroup("");
    setSelectedThirdMention("");
    setSelectedFourthMention("");
    setSelectedFifthGroup("");
    setIncludeLabs(false);
  };


  const handleCoursesSelect = (course) => {
    
    const updatedCourses = selectedCourses.includes(course)
    ? selectedCourses.filter(c => c !== course) // Si ya está seleccionado, lo elimina
    : [...selectedCourses, course] // Si no está seleccionado, lo agrega
    
    setSelectedCourses(updatedCourses);

    if(selectedCourses.includes(course)){
        switch (course) {
            case "1º":
              setSelectedFirstGroup("");
              break;
            case "2º":
              setSelectedSecondGroup("");
              break;
            case "3º":
              setSelectedThirdMention("");
              break;
            case "4º":
              setSelectedFourthMention("");
              break;
            case "5º":
              setSelectedFifthGroup("");
              break;
            default:
              break;
          }
    }

    if(updatedCourses.length === 0){
        setSelectedAsigs([]);
        setSelectedAsigValue("");
    }
  };


  const handleFirstGroupSelect = (group) => {
    setSelectedFirstGroup(selectedFirstGroup === group ? "" : group);
    if(selectedFirstGroup === group && checkNoSelectedGroups()){
        console.log("no grupos select");
        setSelectedAsigs([]);
        setSelectedAsigValue("");
    }
    //console.log("Grupo seleccionado:", group);
  };

  const handleSecondGroupSelect = (group) => {
    setSelectedSecondGroup(selectedSecondGroup === group ? "" : group);
    if(selectedSecondGroup === group && checkNoSelectedGroups()){
        console.log("no grupos select");
        setSelectedAsigs([]);
        setSelectedAsigValue("");
    }  
    //console.log("Grupo seleccionado:", group);
  };

  const handleThirdMentionSelect = (mention) => {
    setSelectedThirdMention(selectedThirdMention === mention ? "" : mention);
    if(selectedThirdMention === mention && checkNoSelectedGroups()){
        console.log("no grupos select");
        setSelectedAsigs([]);
        setSelectedAsigValue("");
    }
    //console.log("Grupo seleccionado:", group);
  };

  const handleFourthMentionSelect = (mention) => {
    setSelectedFourthMention(selectedFourthMention === mention ? "" : mention);
    if(selectedFourthMention === mention && checkNoSelectedGroups()){
        console.log("no grupos select");
        setSelectedAsigs([]);
        setSelectedAsigValue("");
    }
    //console.log("Grupo seleccionado:", group);
  };

  /*
  useEffect(() => {
    if (selectedCourses.includes("3º") && selectedCourses.includes("4º")) {
        if (selectedThirdMention !== selectedFourthMention) {
            if (selectedThirdMention && selectedThirdMention !== selectedFourthMention) {
                setSelectedFourthMention(selectedThirdMention);
                setSelectedFourthMentionButton(selectedThirdMention);
            } else if (selectedFourthMention && selectedFourthMention !== selectedThirdMention) {
                setSelectedThirdMention(selectedFourthMention);
                setSelectedThirdMentionButton(selectedFourthMention);
            }
        }
    }
}, [selectedThirdMention, selectedFourthMention, selectedCourses]); */


  const handleFifthGroupSelect = (group) => {
    setSelectedFifthGroup(selectedFifthGroup === group ? "" : group);
    if(selectedFifthGroup === group && checkNoSelectedGroups()){
        console.log("no grupos select");
        setSelectedAsigs([]);
        setSelectedAsigValue("");
    } // convertir actualizacion de estado en actualizacion sincrona
    //console.log("Grupo seleccionado:", group);
  };

  // Funcion que devuelve true en caso de que todos los cursos no tengan su grupo o mencion 
  // seleccionados
  // Esta funcion sirve para borrar las asignaturas seleccionadas en el select en caso de
  // deseleccionarse todos los grupos

  const checkNoSelectedGroups = () => {
    return (
      (selectedFirstGroup === null && 
        selectedSecondGroup === null &&
        selectedThirdMention === null &&
        selectedFourthMention === null &&
        selectedFifthGroup === null) 
    );
  };

  const handleAsigSelect = (_, data) => {  
    const selectedKey = data.options.find(option => option.value === data.value)?.key;
    console.log("asignatura anadida", selectedKey);
    if (selectedKey && !selectedAsigs.includes(selectedKey)) {
      setSelectedAsigs([...selectedAsigs, selectedKey]);
      setSelectedAsigValue(data.value);
    }
  };

  const handleRemoveAsig = (asig) => {
    const newAsigs = selectedAsigs.filter((item) => item !== asig);
    setSelectedAsigs(newAsigs);
    console.log("asignatura: " + asig + " borrada");
    if (newAsigs.length === 0) {
      setSelectedAsigValue("");
    }
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
      newHeight += 90;
    }
  
    if (selectedCourses.length !== 0) {
      newHeight += 110 * selectedCourses.length;
      if (selectedFirstGroup || selectedSecondGroup || selectedThirdMention || selectedFourthMention) {
          newHeight += 150;
      }
    }
    

    if (selectedAsigs.length > 0) {
      newHeight += 40 * selectedAsigs.length;
    }
  
    if (includeLabs) {
      newHeight += 40;
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
  }, [selectedGrade, selectedSemester, selectedCourses, selectedFirstGroup, selectedSecondGroup, selectedThirdMention, selectedFourthMention, selectedFifthGroup, selectedAsigs]);

  
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
          

          <div className="filter-menu-save-export-actions-content-custom">
            <IconButton name="file pdf outline" size={`big`} handleClick={handleExportPDF} />
          </div>


          <div>
            <div className="filters-container-section-custom">
              <div className="grade-section-custom">
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
                  <div className="semester-section-custom">
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
                </>
                
              )}

              {selectedGrade !== "Master" && selectedSemester && (
                <>
                  <div className="course-section-custom">
                    <FiltersButton key={"1º"} content={"1º"} onClick={() => {
                      handleCoursesSelect("1º");
                    }}
                    isSelected={selectedCourses.includes("1º")}
                    />
                    <FiltersButton key={"2º"} content={"2º"} onClick={() => {
                      handleCoursesSelect("2º");
                      }}
                      isSelected={selectedCourses.includes("2º")}
                    />
                    <FiltersButton key={"3º"} content={"3º"} onClick={() => {
                      handleCoursesSelect("3º");
                    }}
                    isSelected={selectedCourses.includes("3º")}
                    />
                    <FiltersButton key={"4º"} content={"4º"} onClick={() => {
                    handleCoursesSelect("4º");
                    }}
                    isSelected={selectedCourses.includes("4º")}
                    />
                    
                    {selectedGrade === "I + E" && (
                      <>
                        <FiltersButton className= "fifth-course-button" key={"5º"} content={"5º"} onClick={() => {
                          handleCoursesSelect("5º");
                        }}
                        isSelected={selectedCourses.includes("5º")}
                        />
                      </>
                    )}
                  </div>
                </>
                
              )}

              {selectedGrade !== "Master" && selectedSemester && selectedCourses.length !== 0 && (
                <>
                  <div className="group-or-mention-section-custom">
                    {selectedCourses.includes("1º") && (
                    <div className="group-container-custom">
                        <p>Grupos de primer curso</p>
                        <div className="group-buttons-custom">
                            <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleFirstGroupSelect("T1");}} isSelected={selectedFirstGroup === "T1"}/>           
                            <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleFirstGroupSelect("T2");}} isSelected={selectedFirstGroup === "T2"}/>
                            <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleFirstGroupSelect("T3");}} isSelected={selectedFirstGroup === "T3"}/>
                        </div>
                    </div>
                    )}

                    {selectedCourses.includes("2º") && (
                    <div className="group-container-custom">
                        <p>Grupos de segundo curso</p>
                        <div className="group-buttons-custom">
                          <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleSecondGroupSelect("T1");}} isSelected={selectedSecondGroup === "T1"}/>
                          <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleSecondGroupSelect("T2");}} isSelected={selectedSecondGroup === "T2"}/>
                          <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleSecondGroupSelect("T3");}} isSelected={selectedSecondGroup === "T3"}/>
                        </div>
                    </div>
                    )}

                    {selectedCourses.includes("3º") && (
                    <div className="group-container-custom">
                      {selectedGrade === "INF" && (
                        <>
                          <p>Menciones de tercer curso</p>
                          <div className="group-buttons-custom">
                            <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleThirdMentionSelect("IS");}} isSelected={selectedThirdMention === "IS"}/>
                            <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleThirdMentionSelect("CO");}} isSelected={selectedThirdMention === "CO"}/>
                            <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleThirdMentionSelect("TI");}} isSelected={selectedThirdMention === "TI"}/>
                          </div>
                        </>
                      )}
                      {(selectedGrade === "EST" || selectedGrade === "I + E") && (
                        <div className="group-container-custom">
                          <p>Grupos de tercer curso</p>
                          <div className="group-buttons-custom">
                            <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleThirdMentionSelect("T1");}} isSelected={selectedThirdMention === "T1"}/>
                            <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleThirdMentionSelect("T2");}} isSelected={selectedThirdMention === "T2"}/>
                            <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleThirdMentionSelect("T3");}} isSelected={selectedThirdMention === "T3"}/>
                          </div>
                        </div>
                      )}
                        
                    </div>
                    )}

                    {selectedCourses.includes("4º") && (
                    <div className="group-container-custom">
                      {selectedGrade === "INF" && (
                        <>
                          <p>Menciones de cuarto curso</p>
                          <div className="group-buttons-custom">
                            <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleFourthMentionSelect("IS");}} isSelected={selectedFourthMention === "IS"}/>
                            <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleFourthMentionSelect("CO");}} isSelected={selectedFourthMention === "CO"}/>
                            <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleFourthMentionSelect("TI");}} isSelected={selectedFourthMention === "TI"}/>
                          </div>
                        </>
                      )}
                      {(selectedGrade === "EST" || selectedGrade === "I + E") && (
                        <>
                          <div className="group-container-custom">
                            <p>Grupos de cuarto curso</p>
                            <div className="group-buttons-custom">
                              <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleFourthMentionSelect("T1");}} isSelected={selectedFourthMention === "T1"}/>
                              <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleFourthMentionSelect("T2");}} isSelected={selectedFourthMention === "T2"}/>
                              <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleFourthMentionSelect("T3");}} isSelected={selectedFourthMention === "T3"}/>
                            </div>
                          </div>
                        </>
                      )}
                        
                    </div>
                    )}

                    {selectedGrade === "I + E" && selectedCourses.includes("5º") && (
                       <div className="group-container-custom">
                          <p>Grupos de quinto curso</p>
                            <div className="group-buttons-custom">
                              <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleFifthGroupSelect("T1");}} isSelected={selectedFifthGroup === "T1"}/>
                              <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleFifthGroupSelect("T2");}} isSelected={selectedFifthGroup === "T2"}/>
                              <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleFifthGroupSelect("T3");}} isSelected={selectedFifthGroup === "T3"}/>
                            </div>
                       </div>
                    )}

                  </div>
                </>
                
              )}
              
              
              {selectedGrade === "INF" && selectedSemester && (selectedCourses.length !== 0) && selectedCourses.every((course) =>
              (course.includes("1º") && selectedFirstGroup !== null) ||
              (course.includes("2º") && selectedSecondGroup !== null) ||
              (course.includes("3º") && selectedThirdMention !== null) ||
              (course.includes("4º") && selectedFourthMention !== null)
              ) && (
                  <>
                    <div className="filters-select-container">
                      <FiltersSelect text={"Escoge tu asignatura"} options={asigOptions} onChange={handleAsigSelect} value={selectedAsigValue} />
                    </div>
                    <div className="selected-asigs-container">
                      {selectedAsigs.length > 0 ? (
                        selectedAsigs.map((asig) => {
                          const siglas = asig.split(" - ")[0].trim().toUpperCase();
                          let backgroundColor = asigColors[siglas] || "#ccc"; // color por defecto
                          const labelClass = `filters-select-asig-label filters-select-asig-label-${siglas}`;

                          return (
                            <Label
                              key={asig}
                              onClick={() => handleRemoveAsig(asig)}
                              className={labelClass}
                              style={{ backgroundColor }}
                            >
                              {asig}
                              <Label.Detail className="filters-select-container-label-detail">X</Label.Detail>
                            </Label>
                          );
                        })
                      ) : (
                        <p className="filters-select-default-text">No hay asignaturas seleccionadas</p>
                      )}
                    </div>
                    {selectedAsigs.length !== 0 && (
                      <IncludeLabsCheckbox 
                        text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                        includeLabs={includeLabs} 
                        setIncludeLabs={setIncludeLabs} 
                      />
                    )}
                  </>
              )}

              {(selectedGrade === "EST" || selectedGrade === "I + E") && selectedSemester && (selectedCourses.length !== 0) && selectedCourses.every((course) =>
              (course.includes("1º") && selectedFirstGroup !== null) ||
              (course.includes("2º") && selectedSecondGroup !== null) ||
              (course.includes("3º") && selectedThirdMention !== null) ||
              (course.includes("4º") && selectedFourthMention !== null) ||
              (course.includes("5º") && selectedFifthGroup !== null)
              ) && (
                    <>
                      <div className="filters-select-container">
                        <FiltersSelect text={"Escoge tu asignatura"} options={asigOptions} className={`select-asig-custom`} onChange={handleAsigSelect} value={selectedAsigValue} />
                      </div>
                      <div className="selected-asigs-container">
                        {selectedAsigs.length > 0 ? (
                          selectedAsigs.map((asig) => {
                            const siglas = asig.split(" - ")[0].trim().toUpperCase();
                            let backgroundColor = asigColors[siglas] || "#ccc"; // color por defecto
                            const labelClass = `filters-select-asig-label filters-select-asig-label-${siglas}`;
                            return (
                              <Label
                                key={asig}
                                onClick={() => handleRemoveAsig(asig)}
                                className={labelClass}
                                style={{ backgroundColor }}
                              >
                                {asig}
                                <Label.Detail className="filters-select-container-label-detail">X</Label.Detail>
                              </Label>
                            );
                          })
                        ) : (
                          <p className="filters-select-default-text">No hay asignaturas seleccionadas</p>
                        )}
                      </div>
                      {selectedAsigs.length !== 0 && (
                        <IncludeLabsCheckbox 
                          text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                          includeLabs={includeLabs} 
                          setIncludeLabs={setIncludeLabs} 
                        />
                      )}
                    </>
              )}

              {selectedGrade === "Master" && selectedSemester && (
                    <>
                      <div className="filters-select-container">
                        <FiltersSelect text={"Escoge tu asignatura"} options={asigOptions} onChange={handleAsigSelect} value={selectedAsigValue} />
                      </div>
                      <div className="selected-asigs-container">
                        {selectedAsigs.length > 0 ? (
                          selectedAsigs.map((asig) => {
                            const siglas = asig.split(" - ")[0].trim().toUpperCase();
                            const backgroundColor = asigColors[siglas] || "#ccc"; // color por defecto
                            const labelClass = `filters-select-asig-label filters-select-asig-label-${siglas}`;

                            return (
                              <Label
                                key={asig}
                                onClick={() => handleRemoveAsig(asig)}
                                className={labelClass}
                                style={{ backgroundColor }}
                              >
                                {asig}
                                <Label.Detail className="filters-select-container-label-detail">X</Label.Detail>
                              </Label>
                            );
                          })
                        ) : (
                          <p className="filters-select-default-text">No hay asignaturas seleccionadas</p>
                        )}
                      </div>
                      {selectedAsigs.length !== 0 && (
                        <IncludeLabsCheckbox 
                          text={includeLabs ? "Ocultar laboratorios" : "Mostrar Laboratorios"} 
                          includeLabs={includeLabs} 
                          setIncludeLabs={setIncludeLabs} 
                        />
                      )}
                      
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

export default FiltersSectionCustom;