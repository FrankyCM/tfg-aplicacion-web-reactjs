import './ScheduleCreationMenuCalendarTab.css';
import FiltersButton from './FiltersButton';
import { useState, useEffect } from 'react';
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';
import React from 'react';

const ScheduleCreationMenuCalendarTab = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourse, setSelectedCourse, selectedGroup, setSelectedGroup, selectedMention, setSelectedMention, warningMessage}) => {




    
    const handleGradeSelect = (grade) => {
        setSelectedGrade(selectedGrade === grade ? "" : grade);
        setSelectedSemester("");
        setSelectedCourse("");
        setSelectedGroup("");
        setSelectedMention("");
    };
    
   
    const handleSemesterSelect = (semester) => {
        setSelectedSemester(selectedSemester === semester ? "" : semester);
        setSelectedCourse("");
        setSelectedGroup("");
        setSelectedMention("");
    };
      
    
   
    
    const handleCourseSelect = (course) => {
        setSelectedCourse(selectedCourse === course ? "" : course);
        setSelectedGroup("");
        setSelectedMention("");
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
        //console.log("Mención seleccionada:", mention);
    };
    
    


    return(
        <div className="contenido-tab-modificar-horario">
            
            <div className="contenido-tab-modificar-horario-seccion-grado">
                <p>Grado de estudios</p>
                <div className="contenido-tab-modificar-horario-seccion-grado-botones">
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
            </div>
            
            {selectedGrade && (
                <div className="contenido-tab-modificar-horario-seccion-semestre">
                <p>Semestres</p>
                <div className="contenido-tab-modificar-horario-seccion-semestre-botones">
                    {selectedGrade !== "Master" && (
                        <>
                            <FiltersButton key={"1ºC"} content={"1ºC"} onClick={() => {handleSemesterSelect("1ºC");}} isSelected={selectedSemester === "1ºC"} />
                            <FiltersButton key={"2ºC"} content={"2ºC"} onClick={() => {handleSemesterSelect("2ºC");}} isSelected={selectedSemester === "2ºC"} />
                        </> 
                    )}
                    {selectedGrade === "Master" && (
                        <>
                            <FiltersButton className="first-semester-button" key={"1er Semestre"} content={"1er Semestre"} onClick={() =>{handleSemesterSelect("1er Semestre");}} isSelected={selectedSemester === "1er Semestre"} />
                            <FiltersButton className="second-semester-button" key={"2º Semestre"} content={"2º Semestre"} onClick={() => {handleSemesterSelect("2º Semestre");}} isSelected={selectedSemester === "2º Semestre"} />
                            <FiltersButton className="third-semester-button" key={"3er Semestre"} content={"3er Semestre"} onClick={() =>{handleSemesterSelect("3er Semestre");}} isSelected={selectedSemester === "3er Semestre"} />
                            <FiltersButton className="third-semester-button" key={"4º Semestre"} content={"4º Semestre"} onClick={() => {handleSemesterSelect("4º Semestre");}} isSelected={selectedSemester === "4º Semestre"} />
                        </>
                    )}
                    
                </div>
            </div>
            )}
            
            {selectedGrade !== "Master" && selectedSemester && (
                <div className="contenido-tab-modificar-horario-seccion-curso">
                    <p>Cursos</p>
                    <div className="contenido-tab-modificar-horario-seccion-curso-botones">
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
                        {selectedGrade === "I + E" && (
                            <FiltersButton key={"5º"} content={"5º"} onClick={() => {
                            handleCourseSelect("5º");
                            }}
                            isSelected={selectedCourse === "5º"}
                            />
                        )}
                        
                    </div>
                </div>
            )}

            {(selectedGrade === "EST" || selectedGrade === "I + E") && selectedSemester && selectedCourse && (
                <>
                    <div className="contenido-tab-modificar-horario-seccion-grupo">
                        <p>Grupos</p>  
                        <div className="contenido-tab-modificar-horario-seccion-grupo-botones">
                            <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1");}} isSelected={selectedGroup === "T1"} />
                            <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2");}} isSelected={selectedGroup === "T2"} />
                            <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3");}} isSelected={selectedGroup === "T3"} />       
                        </div>      
                    </div> 
                </>
            )}
            
            {(selectedGrade === "EST" || selectedGrade === "I + E") && selectedSemester && selectedCourse && warningMessage !== null && (
                <div>
                    <ScheduleCreationMenuWarningsField text={warningMessage}/> 
                </div> 
            )}

            {selectedGrade === "Master" && selectedSemester && warningMessage !== null && (
                <div>
                    <ScheduleCreationMenuWarningsField text={`Hola`}/> 
                </div> 
            )}

            {selectedGrade === "INF" && selectedSemester && selectedCourse && (
            (selectedCourse !== "3º" && selectedCourse !== "4º") &&  (
                <>
                    <div className="contenido-tab-modificar-horario-seccion-grupo">
                        <p>Grupos</p>  
                        <div className="contenido-tab-modificar-horario-seccion-grupo-botones">
                            <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1");}} isSelected={selectedGroup === "T1"} />
                            <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2");}} isSelected={selectedGroup === "T2"} />
                            <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3");}} isSelected={selectedGroup === "T3"} />      
                        </div>      
                    </div> 
                    {warningMessage !== null && (
                        <div>
                            <ScheduleCreationMenuWarningsField text={warningMessage}/> 
                        </div>
                    )}  
                </>
            ))}
            
            {selectedGrade === "INF" && selectedSemester && selectedCourse && 
            (selectedCourse === "3º" || selectedCourse === "4º")  && (
                <>
                    <div className="contenido-tab-modificar-horario-seccion-mencion">
                        <p>Menciones</p>
                        <div className="contenido-tab-modificar-horario-seccion-mencion-botones">
                            <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleMentionSelect("IS");}} isSelected={selectedMention === "IS"} />
                            <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleMentionSelect("CO");}} isSelected={selectedMention === "CO"} />
                            <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleMentionSelect("TI");}} isSelected={selectedMention === "TI"} />
                        </div>
                    </div>
                    {selectedMention && warningMessage !== null && (
                        <div>
                            <ScheduleCreationMenuWarningsField text={warningMessage}/> 
                        </div>
                    )}
                    
                </>
                
            )}

            
            

        </div>
    )
};

export default ScheduleCreationMenuCalendarTab;