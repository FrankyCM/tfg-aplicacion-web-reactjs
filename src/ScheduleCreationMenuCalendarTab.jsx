import './ScheduleCreationMenuCalendarTab.css';
import FiltersButton from './FiltersButton';
import { useState, useEffect } from 'react';
import ScheduleCreationMenuWarningsField from './ScheduleCreationMenuWarningsField';

const ScheduleCreationMenuCalendarTab = ({selectedGrade, setSelectedGrade, selectedSemester, setSelectedSemester, selectedCourse, setSelectedCourse, selectedGroup, setSelectedGroup, selectedMention, setSelectedMention, warningMessage}) => {


    const [selectedGradeButton, setSelectedGradeButton] = useState(null);
    const [selectedSemesterButton, setSelectedSemesterButton] = useState(null);
    const [selectedCourseButton, setSelectedCourseButton] = useState(null);
    const [selectedGroupButton, setSelectedGroupButton] = useState(null);
    const [selectedMentionButton, setSelectedMentionButton] = useState(null);
    
    
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
        //console.log("Mención seleccionada:", mention);
    };
    
    const handleMentionSelectButton = (mention) => {
        setSelectedMentionButton(selectedMentionButton === mention ? null : mention);
        console.log("Mención seleccionada:", mention);
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
                            handleGradeSelectButton(text);
                        }
                        } 
                        isSelected={selectedGradeButton === text}
                        />
                    ))}
                </div>   
            </div>
            
            {selectedGradeButton && (
                <div className="contenido-tab-modificar-horario-seccion-semestre">
                <p>Semestres</p>
                <div className="contenido-tab-modificar-horario-seccion-semestre-botones">
                    {selectedGradeButton !== "Master" && (
                        <>
                            <FiltersButton key={"1ºC"} content={"1ºC"} onClick={() => {handleSemesterSelectButton("1ºC"); handleSemesterSelect("1ºC");}} isSelected={selectedSemesterButton === "1ºC"} />
                            <FiltersButton key={"2ºC"} content={"2ºC"} onClick={() => {handleSemesterSelectButton("2ºC"); handleSemesterSelect("2ºC");}} isSelected={selectedSemesterButton === "2ºC"} />
                        </> 
                    )}
                    {selectedGradeButton === "Master" && (
                        <>
                            <FiltersButton className="first-semester-button" key={"1er Semestre"} content={"1er Semestre"} onClick={() =>{handleSemesterSelectButton("1er Semestre"); handleSemesterSelect("1er Semestre");} } isSelected={selectedSemesterButton === "1er Semestre"} />
                            <FiltersButton className="second-semester-button" key={"2º Semestre"} content={"2º Semestre"} onClick={() => {handleSemesterSelectButton("2º Semestre"); handleSemesterSelect("2º Semestre");}} isSelected={selectedSemesterButton === "2º Semestre"} />
                            <FiltersButton className="third-semester-button" key={"3er Semestre"} content={"3er Semestre"} onClick={() =>{handleSemesterSelectButton("3er Semestre"); handleSemesterSelect("3er Semestre");} } isSelected={selectedSemesterButton === "3er Semestre"} />
                            <FiltersButton className="third-semester-button" key={"4º Semestre"} content={"4º Semestre"} onClick={() => {handleSemesterSelectButton("4º Semestre"); handleSemesterSelect("4º Semestre");}} isSelected={selectedSemesterButton === "4º Semestre"} />
                        </>
                    )}
                    
                </div>
            </div>
            )}
            
            {selectedGradeButton !== "Master" && selectedSemesterButton && (
                <div className="contenido-tab-modificar-horario-seccion-curso">
                    <p>Cursos</p>
                    <div className="contenido-tab-modificar-horario-seccion-curso-botones">
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
                            <FiltersButton key={"5º"} content={"5º"} onClick={() => {
                            handleCourseSelect("5º");
                            handleCourseSelectButton("5º");
                            }}
                            isSelected={selectedCourseButton === "5º"}
                            />
                        )}
                        
                    </div>
                </div>
            )}

            {(selectedGradeButton === "EST" || selectedGradeButton === "I + E") && selectedSemesterButton && selectedCourseButton && warningMessage !== null && (
                <div>
                    <ScheduleCreationMenuWarningsField text={warningMessage}/> 
                </div> 
            )}

            {selectedGradeButton === "Master" && selectedSemesterButton && warningMessage !== null && (
                <div>
                    <ScheduleCreationMenuWarningsField text={`Hola`}/> 
                </div> 
            )}

            {selectedGradeButton === "INF" && selectedSemesterButton && selectedCourseButton && (
            (selectedCourseButton !== "3º" && selectedCourseButton !== "4º") &&  (
                <>
                    <div className="contenido-tab-modificar-horario-seccion-grupo">
                        <p>Grupos</p>  
                        <div className="contenido-tab-modificar-horario-seccion-grupo-botones">
                            <FiltersButton key={"T1"} content={"T1"} onClick={() => {handleGroupSelect("T1"); handleGroupSelectButton("T1")}} isSelected={selectedGroupButton === "T1"} />
                            {(selectedCourseButton === "1º" || selectedCourseButton === "2º") && (
                                <>
                                    <FiltersButton key={"T2"} content={"T2"} onClick={() => {handleGroupSelect("T2"); handleGroupSelectButton("T2")}} isSelected={selectedGroupButton === "T2"} />
                                </>
                            )}
                            {selectedCourseButton === "1º" && (
                                <FiltersButton key={"T3"} content={"T3"} onClick={() => {handleGroupSelect("T3"); handleGroupSelectButton("T3")}} isSelected={selectedGroupButton === "T3"} />
                            )}
                            
                        </div>      
                    </div> 
                    {warningMessage !== null && (
                        <div>
                            <ScheduleCreationMenuWarningsField text={warningMessage}/> 
                        </div>
                    )}  
                </>
            ))}
            
            {selectedGradeButton === "INF" && selectedSemesterButton && selectedCourseButton && 
            (selectedCourseButton === "3º" || selectedCourseButton === "4º")  && (
                <>
                    <div className="contenido-tab-modificar-horario-seccion-mencion">
                        <p>Menciones</p>
                        <div className="contenido-tab-modificar-horario-seccion-mencion-botones">
                            <FiltersButton key={"IS"} content={"IS"} onClick={() => {handleMentionSelect("IS"); handleMentionSelectButton("IS")}} isSelected={selectedMentionButton === "IS"} />
                            <FiltersButton key={"CO"} content={"CO"} onClick={() => {handleMentionSelect("CO"); handleMentionSelectButton("CO")}} isSelected={selectedMentionButton === "CO"} />
                            <FiltersButton key={"TI"} content={"TI"} onClick={() => {handleMentionSelect("TI"); handleMentionSelectButton("TI")}} isSelected={selectedMentionButton === "TI"} />
                        </div>
                    </div>
                    {selectedMentionButton && warningMessage !== null && (
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