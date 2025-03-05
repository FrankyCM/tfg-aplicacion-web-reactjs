import React from 'react'
import { useState,useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import FiltersButton from './FiltersButton';
import FiltersSelect from './FiltersSelect';
import './FiltersSectionCustom.css';
import { Label } from 'semantic-ui-react/dist/commonjs';


const classOptions = [
  { key: '01', value: '01', text: '01' },
  { key: '02', value: '02', text: '02' },
  { key: '03', value: '03', text: '03' },
  { key: '04', value: '04', text: '04' },
  { key: '05', value: '05', text: '05' },
  { key: '06', value: '06', text: '06' },
  { key: '07', value: '07', text: '07' },
  { key: 'L101', value: 'L101', text: 'L101' },
  { key: 'L102', value: 'L102', text: 'L102' },
  { key: 'L103', value: 'L103', text: 'L103' },
  { key: 'L104', value: 'L104', text: 'L104' }
];

const asigOptionssss = [
  { key: 'ADA', value: 'Análisis y Diseño de Algoritmos', text: 'ADA - Análisis y Diseño de Algoritmos' },
  { key: 'ADBD', value: 'Análisis y Diseño de Bases de Datos', text: 'ADBD - Análisis y Diseño de Bases de Datos' },
  { key: 'ICON', value: 'Ingeniería del conocimiento', text: 'ICON - Ingeniería del conocimiento' },
  { key: 'MOD', value: 'Modelado de Software', text: 'MOD - Modelado de Software' },
  { key: 'SRS', value: 'Seguridad de Redes y Sistemas', text: 'SRS - Seguridad de Redes y Sistemas'},
  { key: 'AMAT', value: 'Ampliación de Matemáticas', text: 'AMAT - Ampliación de Matemáticas'},
  { key: 'FMAT', value: 'Fundamentos de Matemáticas', text: 'FMAT - Fundamentos de Matemáticas'}
];




const FiltersSectionCustom = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourses, setSelectedCourses, selectedFirstGroup, setSelectedFirstGroup, selectedSecondGroup, setSelectedSecondGroup, selectedThirdMention, setSelectedThirdMention, selectedFourthMention, setSelectedFourthMention, selectedFifthGroup, setSelectedFifthGroup, selectedAsigs, setSelectedAsigs, asigOptions}) => {
  
  const [selectedAsigValue, setSelectedAsigValue] = useState("");



  const [selectedGradeButton, setSelectedGradeButton] = useState(null);
  const [selectedSemesterButton, setSelectedSemesterButton] = useState(null);
  const [selectedCoursesButton, setSelectedCoursesButton] = useState([]);

  const [selectedFirstGroupButton, setSelectedFirstGroupButton] = useState(null);
  const [selectedSecondGroupButton, setSelectedSecondGroupButton] = useState(null);
  const [selectedThirdMentionButton, setSelectedThirdMentionButton] = useState(null);
  const [selectedFourthMentionButton, setSelectedFourthMentionButton] = useState(null);
  const [selectedFifthGroupButton, setSelectedFifthGroupButton] = useState(null);

  const handleGradeSelect = (grade) => {
    if(selectedGrade === grade){
        setSelectedSemester("");
        setSelectedCourses([]);
        setSelectedFirstGroup("");
        setSelectedSecondGroup("");
        setSelectedThirdMention("");
        setSelectedFourthMention("");
        setSelectedFifthGroup("");
        setSelectedSemesterButton(null);
        setSelectedCoursesButton([]);
        setSelectedFirstGroupButton(null);
        setSelectedSecondGroupButton(null);
        setSelectedThirdMentionButton(null);
        setSelectedFourthMentionButton(null);
        setSelectedFifthGroupButton(null);
    }
    setSelectedGrade(selectedGrade === grade ? "" : grade);
  };

  const handleGradeSelectButton = (grade) => {
    setSelectedGradeButton(selectedGradeButton === grade ? null : grade);
  };

  const handleSemesterSelect = (semester) => {
    if(selectedSemester === semester){
        setSelectedCourses([]);
        setSelectedFirstGroup("");
        setSelectedSecondGroup("");
        setSelectedThirdMention("");
        setSelectedFourthMention("");
        setSelectedFifthGroup("");
        setSelectedCoursesButton([]);
        setSelectedFirstGroupButton(null);
        setSelectedSecondGroupButton(null);
        setSelectedThirdMentionButton(null);
        setSelectedFourthMentionButton(null);
        setSelectedFifthGroupButton(null);
    }
    
    setSelectedSemester(selectedSemester === semester ? "" : semester);
  };
  

  const handleSemesterSelectButton = (semester) => {
    setSelectedSemesterButton(selectedSemesterButton === semester ? null : semester);
    //console.log(semester);
  }

  const handleCoursesSelect = (course) => {
    
    const updatedCourses = selectedCourses.includes(course)
    ? selectedCourses.filter(c => c !== course) // Si ya está seleccionado, lo elimina
    : [...selectedCourses, course] // Si no está seleccionado, lo agrega
    
    setSelectedCourses(updatedCourses);

    if(selectedCourses.includes(course)){
        switch (course) {
            case "1º":
              setSelectedFirstGroup("");
              setSelectedFirstGroupButton(null);
              break;
            case "2º":
              setSelectedSecondGroup("");
              setSelectedSecondGroupButton(null);
              break;
            case "3º":
              setSelectedThirdMention("");
              setSelectedThirdMentionButton(null);
              break;
            case "4º":
              setSelectedFourthMention("");
              setSelectedFourthMentionButton(null);
              break;
            case "5º":
              setSelectedFifthGroup("");
              setSelectedFifthGroupButton(null);
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

  const handleCoursesSelectButton = (course) => {
    if (selectedCoursesButton.includes(course)) {
      setSelectedCoursesButton(selectedCoursesButton.filter(c => c !== course)); // Deseleccionar si ya estaba seleccionado
    } else {
      setSelectedCoursesButton([...selectedCoursesButton, course]); // Agregar si no estaba seleccionado
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
  
  const handleFirstGroupSelectButton = (group) => {
    setSelectedFirstGroupButton(selectedFirstGroupButton === group ? null : group);
  };
  
  const handleSecondGroupSelectButton = (group) => {
    setSelectedSecondGroupButton(selectedSecondGroupButton === group ? null : group);
  };
  
  const handleThirdMentionSelectButton = (mention) => {
    setSelectedThirdMentionButton(selectedThirdMentionButton === mention ? null : mention);
  };
  
  const handleFourthMentionSelectButton = (mention) => {
    setSelectedFourthMentionButton(selectedFourthMentionButton === mention ? null : mention);
  };

  const handleFifthGroupSelectButton = (group) => {
    setSelectedFifthGroupButton(selectedFifthGroupButton === group ? null : group);
  };

  const handleAsigSelect = (_, data) => {  
    const selectedKey = data.options.find(option => option.value === data.value)?.key;
    console.log(selectedKey);
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



  return (
    <Container>

      <div className="filters-container-section">
        <div className="grade-section">
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
          <div className="semester-section">
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
              </>
            )}
          </div>
        )}

        {selectedGradeButton && selectedSemesterButton && (
          <div className="course-section">
            <FiltersButton key={"1º"} content={"1º"} onClick={() => {
              handleCoursesSelect("1º");
              handleCoursesSelectButton("1º");
            }}
            isSelected={selectedCoursesButton.includes("1º")}
            />
            <FiltersButton key={"2º"} content={"2º"} onClick={() => {
              handleCoursesSelect("2º");
              handleCoursesSelectButton("2º");
            }}
            isSelected={selectedCoursesButton.includes("2º")}
            />
            {selectedGradeButton !== "Master" && (
              <>
                <FiltersButton key={"3º"} content={"3º"} onClick={() => {
                    handleCoursesSelect("3º");
                    handleCoursesSelectButton("3º");
                  }}
                  isSelected={selectedCoursesButton.includes("3º")}
                  />
                <FiltersButton key={"4º"} content={"4º"} onClick={() => {
                    handleCoursesSelect("4º");
                    handleCoursesSelectButton("4º");
                  }}
                  isSelected={selectedCoursesButton.includes("4º")}
                  />
              </>
              )


            }
            
            {selectedGradeButton === "I + E" && (
              <>
                <FiltersButton className= "fifth-course-button" key={"5º"} content={"5º"} onClick={() => {
                  handleCoursesSelect("5º");
                  handleCoursesSelectButton("5º");
                }}
                isSelected={selectedCoursesButton.includes("5º")}
                />
              </>
            )
            }
            
          </div>
        )}

        {selectedGradeButton && selectedSemesterButton && selectedCoursesButton.length !== 0 && (
        <div className="group-or-mention-section">
            {selectedCoursesButton.includes("1º") && (
            <div className="group-container">
                <p>Grupos de primer curso</p>
                <div className="group-buttons">
                <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleFirstGroupSelectButton("T1"); handleFirstGroupSelect("T1");}} isSelected={selectedFirstGroupButton === "T1"}/>
                <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleFirstGroupSelectButton("T2"); handleFirstGroupSelect("T2");}} isSelected={selectedFirstGroupButton === "T2"}/>
                <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleFirstGroupSelectButton("T3"); handleFirstGroupSelect("T3");}} isSelected={selectedFirstGroupButton === "T3"}/>
                </div>
            </div>
            )}

            {selectedCoursesButton.includes("2º") && (
            <div className="group-container">
                <p>Grupos de segundo curso</p>
                <div className="group-buttons">
                <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleSecondGroupSelectButton("T1"); handleSecondGroupSelect("T1");}} isSelected={selectedSecondGroupButton === "T1"}/>
                <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleSecondGroupSelectButton("T2"); handleSecondGroupSelect("T2");}} isSelected={selectedSecondGroupButton === "T2"}/>
                </div>
            </div>
            )}

            {selectedCoursesButton.includes("3º") && (
            <div className="group-container">
                <p>Menciones de tercer curso</p>
                <div className="group-buttons">
                <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleThirdMentionSelectButton("IS"); handleThirdMentionSelect("IS");}} isSelected={selectedThirdMentionButton === "IS"}/>
                <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleThirdMentionSelectButton("CO"); handleThirdMentionSelect("CO");}} isSelected={selectedThirdMentionButton === "CO"}/>
                <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleThirdMentionSelectButton("TI"); handleThirdMentionSelect("TI");}} isSelected={selectedThirdMentionButton === "TI"}/>
                </div>
            </div>
            )}

            {selectedCoursesButton.includes("4º") && (
            <div className="group-container">
                <p>Menciones de cuarto curso</p>
                <div className="group-buttons">
                <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleFourthMentionSelectButton("IS"); handleFourthMentionSelect("IS");}} isSelected={selectedFourthMentionButton === "IS"}/>
                <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleFourthMentionSelectButton("CO"); handleFourthMentionSelect("CO");}} isSelected={selectedFourthMentionButton === "CO"}/>
                <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleFourthMentionSelectButton("TI"); handleFourthMentionSelect("TI");}} isSelected={selectedFourthMentionButton === "TI"}/>
                </div>
            </div>
            )}

            {selectedCoursesButton.includes("5º") && (
            <div className="group-container">
                <p>Grupos de quinto curso</p>
                <div className="group-buttons">
                <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleFifthGroupSelectButton("T1"); handleFifthGroupSelect("T1");}} isSelected={selectedFifthGroupButton === "T1"}/>
                </div>
            </div>
            )}
        </div>
        )}
        
        
        {selectedGradeButton && selectedSemesterButton && (selectedCoursesButton.length !== 0) && selectedCoursesButton.every((course) =>
        (course.includes("1º") && selectedFirstGroupButton !== null) ||
        (course.includes("2º") && selectedSecondGroupButton !== null) ||
        (course.includes("3º") && selectedThirdMentionButton !== null) ||
        (course.includes("4º") && selectedFourthMentionButton !== null) ||
        (course.includes("5º") && selectedFifthGroupButton !== null)
        ) && (
            <>
              <div className="filters-select-container">
                <FiltersSelect text={"Escoge tu asignatura"} options={asigOptions} onChange={handleAsigSelect} value={selectedAsigValue} />
              </div>
              <div className="selected-asigs-container">
                {selectedAsigs.length > 0 ? (
                  selectedAsigs.map((asig) => (
                    <Label key={asig} onClick={() => handleRemoveAsig(asig)} className="filters-select-asig-label">
                      {asig}
                      <Label.Detail className="filters-select-container-label-detail">X</Label.Detail>
                    </Label>
                  ))
                  ) : (
                    <p className="filters-select-default-text">No hay asignaturas seleccionadas</p>
                  )}
              </div>
            </>
        )}
        

      </div>

    </Container>
  );
};

export default FiltersSectionCustom;