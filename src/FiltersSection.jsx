import React from 'react'
import { useState,useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import FiltersButton from './FiltersButton';
import FiltersSelect from './FiltersSelect';
import './FiltersSection.css';
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




const FiltersSection = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourse, setSelectedCourse, selectedGroup, setSelectedGroup, selectedMention, setSelectedMention, selectedAsigs, setSelectedAsigs, asigOptions}) => {
  
  const [selectedAsigValue, setSelectedAsigValue] = useState("");



  const [selectedGradeButton, setSelectedGradeButton] = useState(null);
  const [selectedSemesterButton, setSelectedSemesterButton] = useState(null);
  const [selectedCourseButton, setSelectedCourseButton] = useState([]);
  const [selectedGroupButton, setSelectedGroupButton] = useState(null);
  const [selectedMentionButton, setSelectedMentionButton] = useState(null);


  const handleGradeSelect = (grade) => {
    setSelectedGrade(selectedGrade === grade ? "" : grade);
  };

  const handleGradeSelectButton = (grade) => {
    setSelectedGradeButton(selectedGradeButton === grade ? null : grade);
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(selectedSemester === semester ? "" : semester);
  };
  

  const handleSemesterSelectButton = (semester) => {
    setSelectedSemesterButton(selectedSemesterButton === semester ? null : semester);
    //console.log(semester);
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(
      selectedCourse.includes(course)
        ? selectedCourse.filter(c => c !== course) // Si ya está seleccionado, lo elimina
        : [...selectedCourse, course] // Si no está seleccionado, lo agrega
    );
  };

  const handleCourseSelectButton = (course) => {
    if (selectedCourseButton.includes(course)) {
      setSelectedCourseButton(selectedCourseButton.filter(c => c !== course)); // Deseleccionar si ya estaba seleccionado
    } else {
      setSelectedCourseButton([...selectedCourseButton, course]); // Agregar si no estaba seleccionado
    }
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(selectedGroup === group ? "" : group);
    //console.log("Grupo seleccionado:", group);
  };

  const handleGroupSelectButton = (group) => {
    setSelectedGroupButton(selectedGroupButton === group ? null : group);
    //console.log("Grupo seleccionado:", group);
  }

  const handleMentionSelect = (mention) => {
    setSelectedGroup(selectedMention === mention ? "" : mention);
    //console.log("Mención seleccionada:", mention);
  };

  const handleMentionSelectButton = (mention) => {
    setSelectedMentionButton(setSelectedMentionButton === mention ? null : mention);
    console.log("Mención seleccionada:", mention);
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
              handleCourseSelect("1º");
              handleCourseSelectButton("1º");
            }}
            isSelected={selectedCourseButton.includes("1º")}
            />
            <FiltersButton key={"2º"} content={"2º"} onClick={() => {
              handleCourseSelect("2º");
              handleCourseSelectButton("2º");
            }}
            isSelected={selectedCourseButton.includes("2º")}
            />
            {selectedGradeButton !== "Master" && (
              <>
                <FiltersButton key={"3º"} content={"3º"} onClick={() => {
                    handleCourseSelect("3º");
                    handleCourseSelectButton("3º");
                  }}
                  isSelected={selectedCourseButton.includes("3º")}
                  />
                <FiltersButton key={"4º"} content={"4º"} onClick={() => {
                    handleCourseSelect("4º");
                    handleCourseSelectButton("4º");
                  }}
                  isSelected={selectedCourseButton.includes("4º")}
                  />
              </>
              )


            }
            
            {selectedGradeButton === "I + E" && (
              <>
                <FiltersButton className= "fifth-course-button" key={"5º"} content={"5º"} onClick={() => {
                  handleCourseSelect("5º");
                  handleCourseSelectButton("5º");
                }}
                isSelected={selectedCourseButton.includes("5º")}
                />
              </>
            )
            }
            
          </div>
        )}

        {selectedGradeButton && selectedSemesterButton && selectedCourseButton && (
          <div className="group-section">
              <>
              <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1"); handleGroupSelectButton("T1")}} isSelected={selectedGroupButton === "T1"}/>
            {(selectedCourseButton !== "3º" && selectedCourseButton !== "4º" && selectedCourseButton !== "5º") && selectedGradeButton === "INF" && (
              <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2"); handleGroupSelectButton("T2")}} isSelected={selectedGroupButton === "T2"}/>
            )}
            {selectedCourseButton === "1º" && selectedGradeButton === "INF" && (
                <FiltersButton className = "third-group-button" key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3"); handleGroupSelectButton("T3")}} isSelected={selectedGroupButton === "T3"}/>
            )}
              </>    
          </div>
        )}
        
        {selectedGradeButton === "INF" && selectedSemesterButton && (selectedCourseButton === "3º" || selectedCourseButton === "4º") && selectedGroupButton && (
            <div className="mention-section">
              <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleMentionSelect("IS"); handleMentionSelectButton("IS")}} isSelected={selectedMentionButton === "IS"}/>
              <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleMentionSelect("CO"); handleMentionSelectButton("CO")}} isSelected={selectedMentionButton === "CO"}/>
              <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleMentionSelect("TI"); handleMentionSelectButton("TI")}} isSelected={selectedMentionButton === "TI"}/>
            </div>
          )
        }
        
        {selectedGradeButton && selectedSemesterButton && selectedCourseButton  && selectedGroupButton && (
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

export default FiltersSection;