import React, { useState } from 'react';
import { TabPane, Tab, Label } from 'semantic-ui-react';
import FiltersButton from './FiltersButton';
import FiltersSelect from './FiltersSelect';
import './FiltersTab.css'; 



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

const asigOptions = [
    { key: 'ADA', value: 'Análisis y Diseño de Algoritmos', text: 'ADA - Análisis y Diseño de Algoritmos' },
    { key: 'ADBD', value: 'Análisis y Diseño de Bases de Datos', text: 'ADBD - Análisis y Diseño de Bases de Datos' },
    { key: 'ICON', value: 'Ingeniería del conocimiento', text: 'ICON - Ingeniería del conocimiento' },
    { key: 'MOD', value: 'Modelado de Software', text: 'MOD - Modelado de Software' },
    { key: 'SRS', value: 'Seguridad de Redes y Sistemas', text: 'SRS - Seguridad de Redes y Sistemas'}
];


const FiltersTab = ({selectedAsigs, setSelectedAsigs, selectedGroup, setSelectedGroup}) => {

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const [selectedAsigValue, setSelectedAsigValue] = useState("");  //Este estado almacena el valor (nombre completo) de la ultima asignatura seleccionada en el selector de asignaturas

  const handleAsigSelect = (_, data) => {  
    const selectedKey = data.options.find(option => option.value === data.value)?.key;
    console.log(selectedKey)
    if (selectedKey && !selectedAsigs.includes(selectedKey)) {
        setSelectedAsigs([...selectedAsigs, selectedKey]);
        setSelectedAsigValue(data.value);
    }
  };


  const handleRemoveAsig = (asig) => {
    const newAsigs = selectedAsigs.filter((item) => item !== asig);
    setSelectedAsigs(newAsigs);
    console.log("asignatura: "  +asig + " borrada");
    if (newAsigs.length === 0) {
      setSelectedAsigValue("");
  }
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    console.log("Grupo seleccionado:", group);
  };


  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    console.log(course);
  };

  const handleClassSelect = (_, data) => {
    setSelectedClass(data.value);
    console.log("Aula seleccionada:", data.value);
  };

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    console.log(grade);
  };

  const tabs = [
    { 
      menuItem: 'Filtro por Grado', 
      render: () => (
        <TabPane>
          <p>Aquí puedes filtrar en función de tus estudios</p>
          <div className="filters-container">
            {['IS', 'TI', 'CO', 'Est', 'I+E', 'Master'].map((text) => (
              <FiltersButton key={text} content={text} onClick={() => handleGradeSelect(text)}/>
            ))}
          </div>
        </TabPane>
      ) 
    },
    { 
      menuItem: 'Filtro por Curso', 
      render: () => (
        <TabPane>
          <p>Aquí puedes filtrar en función de los cursos a los que pertenecen tus asignaturas</p>
          <div className="filters-container">
            {['1º', '2º', '3º', '4º', '5º'].map((text) => (
              <FiltersButton key={text} content={text} onClick={() => handleCourseSelect(text)}/>
            ))}
          </div>
        </TabPane>
      ) 
    },
    {
      menuItem: 'Filtro por Grupo', 
      render: () => (
        <TabPane>
          <p>Aquí puedes filtrar en función de los grupos a los que perteneces en tus asignaturas</p>
          <div className="filters-container">
            {['T1', 'T2', 'T3'].map((text) => (
              <FiltersButton key={text} content={text} onClick={() => handleGroupSelect(text)}/>
            ))}
          </div>
        </TabPane>
      ) 
    },
    {
        menuItem: 'Filtro por Aula', 
        render: () => (
          <TabPane>
            <p>Aquí puedes filtrar en función de las aulas en las que se imparten tus asignaturas</p>
            <div className="filters-select-container">
              <FiltersSelect text = {"Escoge tu aula"} options={classOptions} onChange={handleClassSelect}/>
            </div>
          </TabPane>
        ) 
      },
    { 
      menuItem: 'Filtro por Asignaturas', 
      render: () => (
        <TabPane attached={false}>
            <p>Aquí puedes filtrar en función de las asignaturas actuales en tu plan de estudios</p>
                <div className="filters-select-container">
                    <FiltersSelect text = {"Escoge tu asignatura"} options={asigOptions} onChange={handleAsigSelect} value={selectedAsigValue} />
                </div>
                <div className="selected-asigs-container">
                    {selectedAsigs.length > 0 ? (
                        selectedAsigs.map((asig) => (
                        <Label key={asig} onClick={() => handleRemoveAsig(asig)} className = "filters-select-asig-label">
                            {asig}
                            <Label.Detail className = "filters-select-container-label-detail">X</Label.Detail>
                        </Label>
                    ))
                ) : (
                    <p className = "filters-select-default-text">No hay asignaturas seleccionadas</p>
                )}
                </div>
        </TabPane>
        ) 
    }
  ];

  return <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={tabs} />;
};

export default FiltersTab;
