import './Common.css';
import LogoutButton from './LogoutButton';
import './ScheduleCreation.css';
import { useState, useEffect, useCallback  } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css';
import FloatingFilterScheduleMenu from './FloatingFilterScheduleMenu';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2pdf from "html2pdf.js";
import { AdminCalendarEvent } from './adminCalendarEvent';
import ModifyCalendarEvent from './ModifyCalendarEvent';


const ScheduleCreation = ({diasSemana, gradeMap, semesterMap, courseMap, mentionMap}) => {
    
    // APERTURA DE ARCHIVOS
    const [openFile, setOpenFile] = useState(false);
    const [openedFile, setOpenedFile] = useState("");

    // MODIFICAR HORARIO
    const [events, setEvents] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(""); // Grado seleccionado
    const [selectedSemester, setSelectedSemester] = useState(""); // Semestre o cuatrimestre seleccionado 
    const [selectedCourse, setSelectedCourse] = useState(""); // Curso seleccionado
    const [selectedGroup, setSelectedGroup] = useState(""); // Grupo seleccionado
    const [selectedMention, setSelectedMention] = useState(""); // Mencion seleccionada
    const [filteredAsigs, setFilteredAsigs] = useState([]); // Eventos de asignaturas filtradas
    const [warningMessage, setWarningMessage] = useState(null); // Mensaje de aviso en situaciones de incompatibilidad
    const [save, setSave] = useState(false);     // Si se decide guardar el horario modificado
    const [exportPDF, setExportPDF] = useState(false);  // Si se decide exportar a PDF
    const [subjects, setSubjects] = useState([]); // Almacena las asig que cumplen los criterios de seleccion

    // CREAR ASIGNATURAS
    const [asigCode, setAsigCode] = useState("");
    const [asigInitials, setAsigInitials] = useState("");
    const asigPossibleDays = [
        { key: 'L', value: 'Lunes', text: 'L' },
        { key: 'M', value: 'Martes', text: 'M' },
        { key: 'X', value: 'Miércoles', text: 'X' },
        { key: 'J', value: 'Jueves', text: 'J' },
        { key: 'V', value: 'Viernes', text: 'V' },
      ];
    const [asigDay, setAsigDay] = useState("");
    const asigStartTimes = [
        { key: '8:00', value: '8:00', text: '8:00' },
        { key: '9:00', value: '9:00', text: '9:00' },
        { key: '10:00', value: '10:00', text: '10:00' },
        { key: '11:00', value: '11:00', text: '11:00' },
        { key: '12:00', value: '12:00', text: '12:00' },
        { key: '13:00', value: '13:00', text: '13:00' },
        { key: '14:00', value: '14:00', text: '14:00' },
        { key: '15:00', value: '15:00', text: '15:00' },
        { key: '16:00', value: '16:00', text: '16:00' },
        { key: '17:00', value: '17:00', text: '17:00' },
        { key: '18:00', value: '18:00', text: '18:00' },
        { key: '19:00', value: '19:00', text: '19:00' },
        { key: '20:00', value: '20:00', text: '20:00' },
      ];
    const [asigStartTime, setAsigStartTime] = useState("");

    const asigPossibleColors = [
      { key: 'color1', value: '#FF4545', text: '#FF4545', style: { backgroundColor: '#FF4545' } },
      { key: 'color2', value: '#FF8282', text: '#FF8282', style: { backgroundColor: '#FF8282' } },
      { key: 'color3', value: '#DA6C6C', text: '#DA6C6C', style: { backgroundColor: '#DA6C6C' } },
      { key: 'color4', value: '#D84040', text: '#D84040', style: { backgroundColor: '#D84040' } },
      
      { key: 'color5', value: '#81E7AF', text: '#81E7AF', style: { backgroundColor: '#81E7AF' } },
      { key: 'color6', value: '#DDF6D2', text: '#DDF6D2', style: { backgroundColor: '#DDF6D2' } },
      { key: 'color7', value: '#CAE8BD', text: '#CAE8BD', style: { backgroundColor: '#CAE8BD' } },
      { key: 'color8', value: '#B0DB9C', text: '#B0DB9C', style: { backgroundColor: '#B0DB9C' } },
    
      { key: 'color9', value: '#FFF085', text: '#FFF085', style: { backgroundColor: '#FFF085' } },
      { key: 'color10', value: '#F6F193', text: '#F6F193', style: { backgroundColor: '#F6F193' } },
      { key: 'color11', value: '#FADA7A', text: '#FADA7A', style: { backgroundColor: '#FADA7A' } },
      { key: 'color12', value: '#F3C623', text: '#F3C623', style: { backgroundColor: '#F3C623' } },
    
      { key: 'color13', value: '#FFC145', text: '#FFC145', style: { backgroundColor: '#FFC145' } },
      { key: 'color14', value: '#FF9F00', text: '#FF9F00', style: { backgroundColor: '#FF9F00' } },
      { key: 'color15', value: '#F39E60', text: '#F39E60', style: { backgroundColor: '#F39E60' } },
      { key: 'color16', value: '#FE7743', text: '#FE7743', style: { backgroundColor: '#FE7743' } },
    
      { key: 'color17', value: '#F1BA88', text: '#F1BA88', style: { backgroundColor: '#F1BA88' } },
      { key: 'color18', value: '#DE8F5F', text: '#DE8F5F', style: { backgroundColor: '#DE8F5F' } },
      { key: 'color19', value: '#B17F59', text: '#B17F59', style: { backgroundColor: '#B17F59' } },
      { key: 'color20', value: '#AB886D', text: '#AB886D', style: { backgroundColor: '#AB886D' } },
    
      { key: 'color21', value: '#BDDDE4', text: '#BDDDE4', style: { backgroundColor: '#BDDDE4' } },
      { key: 'color22', value: '#9EC6F3', text: '#9EC6F3', style: { backgroundColor: '#9EC6F3' } },
      { key: 'color23', value: '#9FB3DF', text: '#9FB3DF', style: { backgroundColor: '#9FB3DF' } },
      { key: 'color24', value: '#BBE9FF', text: '#BBE9FF', style: { backgroundColor: '#BBE9FF' } },
    
      { key: 'color25', value: '#F7CFD8', text: '#F7CFD8', style: { backgroundColor: '#F7CFD8' } },
      { key: 'color26', value: '#EABDE6', text: '#EABDE6', style: { backgroundColor: '#EABDE6' } },
      { key: 'color27', value: '#AA60C8', text: '#AA60C8', style: { backgroundColor: '#AA60C8' } },
      { key: 'color28', value: '#D69ADE', text: '#D69ADE', style: { backgroundColor: '#D69ADE' } },
    
      { key: 'color29', value: '#EAE4D5', text: '#EAE4D5', style: { backgroundColor: '#EAE4D5' } },
      { key: 'color30', value: '#AAB99A', text: '#AAB99A', style: { backgroundColor: '#AAB99A' } },
      { key: 'color31', value: '#D4C9BE', text: '#D4C9BE', style: { backgroundColor: '#D4C9BE' } },
      { key: 'color32', value: '#B6B09F', text: '#B6B09F', style: { backgroundColor: '#B6B09F' } },
    ];
    
    const [asigColor, setAsigColor] = useState("");
    const [asigFullName, setAsigFullName] = useState("");
    const asigPossibleSemesters = [
        { key: '1ºC', value: '1ºC', text: '1ºC' },
        { key: '2ºC', value: '2ºC', text: '2ºC' },
        { key: '1S', value: '1er Semestre', text: '1er Semestre' },
        { key: '2S', value: '2º Semestre', text: '2º Semestre' },
        { key: '3S', value: '3er Semestre', text: '3er Semestre' },
        { key: '4S', value: '4º Semestre', text: '4º Semestre' },
      ];
    const [asigSemester, setAsigSemester] = useState("");
    const asigPossibleGroupNumbers = [
        { key: '1', value: '1', text: 'Grupo 1' },
        { key: '2', value: '2', text: 'Grupo 2' },
        { key: '3', value: '3', text: 'Grupo 3' },
      ];
    const [asigGroupNumber, setAsigGroupNumber] = useState("");
    const [asigLabGroup, setAsigLabGroup] = useState("");
    const asigPossibleGroupType = [
        { key: 'T', value: 'T', text: 'T' },
    ];
    const [asigGroupType, setAsigGroupType] = useState("");
    const [asigDuration, setAsigDuration] = useState("");
    const asigPossibleClasses = [
        { key: '01', value: '01', text: '01' },
        { key: '02', value: '02', text: '02' },
        { key: '03', value: '03', text: '03' },
        { key: '04', value: '04', text: '04' },
        { key: '05', value: '05', text: '05' },
        { key: '06', value: '06', text: '06' },
        { key: '07', value: '07', text: '07' },
        { key: '08', value: '08', text: '08' },
        { key: '101', value: '101', text: '101' },
        { key: '102', value: '102', text: '102' },
        { key: '103', value: '103', text: '103' },
        { key: '104', value: '104', text: '104' },
        { key: '102A', value: '102A', text: '102A' },
        { key: 'L101', value: 'L101', text: 'L101' },
        { key: 'L102', value: 'L102', text: 'L102' },
        { key: 'L103', value: 'L103', text: 'L103' },
        { key: 'L104', value: 'L104', text: 'L104' },
        { key: 'L105', value: 'L105', text: 'L105' },
        { key: 'L106', value: 'L106', text: 'L106' },
        { key: 'Lab I + D', value: 'Lab I + D', text: 'Lab I + D' }
      ];
    const [asigClass, setAsigClass] = useState("");
    const asigPossibleCourses = [
        { key: '-', value: '-', text: '-' },
        { key: '1º', value: '1º', text: '1º' },
        { key: '2º', value: '2º', text: '2º' },
        { key: '3º', value: '3º', text: '3º' },
        { key: '4º', value: '4º', text: '4º' },
        { key: '5º', value: '5º', text: '5º' },
      ];
    const [asigCourseGII_IS, setAsigCourseGII_IS] = useState("");
    const [asigCourseGII_TI, setAsigCourseGII_TI] = useState("");
    const [asigCourseGII_CO, setAsigCourseGII_CO] = useState("");
    const [asigCourse_EST, setAsigCourse_EST] = useState("");
    const [asigCourse_INDat, setAsigCourse_INDat] = useState("");
    const [asigCourse_Master, setAsigCourse_Master] = useState("");
    const asigPossibleTeacherOptions = [ 
        { key: 'NICOLAS RODRIGUEZ, JOAQUIN ADIEGO', value: 'NICOLAS RODRIGUEZ, JOAQUIN ADIEGO', text: 'NICOLAS RODRIGUEZ, JOAQUIN ADIEGO' }, 
        { key: 'CALONGE CANO, TEODORO', value: 'CALONGE CANO, TEODORO', text: 'CALONGE CANO, TEODORO' }, 
        { key: 'GONZALEZ FERRERAS, CESAR', value: 'GONZALEZ FERRERAS, CESAR', text: 'GONZALEZ FERRERAS, CESAR' } 
      ];
    const [asigTeacher, setAsigTeacher] = useState("");
    const [asigIncidences, setAsigIncidences] = useState("");
    const [incidenceOnCreatedAsig, setIncidenceOnCreatedAsig] = useState("");
    const [asigIncompatibilitiesIds, setAsigIncompatibilitiesIds] = useState({});
    const [createAsig, setCreateAsig] = useState(false);
    const [clearFormulary, setClearFormulary] = useState(false);

    // MODIFICAR ASIGNATURAS
    const [asigCodeMod, setAsigCodeMod] = useState("");
    const [asigInitialsMod, setAsigInitialsMod] = useState("");
    const [asigDayMod, setAsigDayMod] = useState("");
    const [asigStartTimeMod, setAsigStartTimeMod] = useState("");
    const [asigColorMod, setAsigColorMod] = useState("");
    const [asigFullNameMod, setAsigFullNameMod] = useState("");
    const [asigSemesterMod, setAsigSemesterMod] = useState("");
    const [asigGroupNumberMod, setAsigGroupNumberMod] = useState("");
    const [asigLabGroupMod, setAsigLabGroupMod] = useState("");
    const [asigGroupTypeMod, setAsigGroupTypeMod] = useState("");
    const [asigDurationMod, setAsigDurationMod] = useState("");
    const [asigClassMod, setAsigClassMod] = useState("");
    const [asigCourseGII_ISMod, setAsigCourseGII_ISMod] = useState("-");
    const [asigCourseGII_TIMod, setAsigCourseGII_TIMod] = useState("-");
    const [asigCourseGII_COMod, setAsigCourseGII_COMod] = useState("-");
    const [asigCourse_ESTMod, setAsigCourse_ESTMod] = useState("-");
    const [asigCourse_INDatMod, setAsigCourse_INDatMod] = useState("-");
    const [asigCourse_MasterMod, setAsigCourse_MasterMod] = useState("-");
    const [asigTeacherMod, setAsigTeacherMod] = useState("");
    const [asigIncidencesMod, setAsigIncidencesMod] = useState("");
    const [modifyAsig, setModifyAsig] = useState(false);
    const [deleteAsig, setDeleteAsig] = useState(false);

    const [eventClicked, setEventClicked] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    
    moment.locale('es');
    const localizer = momentLocalizer(moment);
    

    const DnDCalendar = withDragAndDrop(Calendar);


    const CustomAdminCalendarEvent = (props) => (
        <AdminCalendarEvent
            {...props}
            setAsigCodeMod={setAsigCodeMod}
            setAsigInitialsMod={setAsigInitialsMod}
            setAsigDayMod={setAsigDayMod}
            setAsigStartTimeMod={setAsigStartTimeMod}
            setAsigColorMod={setAsigColorMod}
            setAsigFullNameMod={setAsigFullNameMod}
            setAsigSemesterMod={setAsigSemesterMod}
            setAsigGroupNumberMod={setAsigGroupNumberMod}
            setAsigLabGroupMod={setAsigLabGroupMod}
            setAsigGroupTypeMod={setAsigGroupTypeMod}
            setAsigDurationMod={setAsigDurationMod}
            setAsigClassMod={setAsigClassMod}
            setAsigCourseGII_ISMod={setAsigCourseGII_ISMod}
            setAsigCourseGII_TIMod={setAsigCourseGII_TIMod}
            setAsigCourseGII_COMod={setAsigCourseGII_COMod}
            setAsigCourse_ESTMod={setAsigCourse_ESTMod}
            setAsigCourse_INDatMod={setAsigCourse_INDatMod}
            setAsigCourse_MasterMod={setAsigCourse_MasterMod}
            setAsigTeacherMod={setAsigTeacherMod}
            setModifyAsig={setModifyAsig}
            setEventClicked={setEventClicked}
            asigIncompatibilitiesIds={asigIncompatibilitiesIds}
        />
    );

    /*
    useEffect(() => {
        cargarAsignaturas();
    }, []);
    
    const cargarAsignaturas = async () => {
        try {
          const response = await fetch("/asignaturas.json");
          const data = await response.json();
          setSubjects(data); // Guardar asignaturas en el estado
      
          const eventos = data.map((asignatura) => {
            const diaSemana = diasSemana[asignatura.Dia];
            if (diaSemana === undefined) return null;
      
            const [hora, minutos] = asignatura.HoraInicio.split(":").map(Number);
      
            const hoy = moment();
            const lunesSemanaActual = hoy.clone().startOf("isoWeek");
      
            const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
              hour: hora,
              minute: minutos,
              second: 0,
            }).toDate();
      
            const fin = moment(inicio).add(parseInt(asignatura.Duracion), "hours").toDate();
      
            return {
              id: `${asignatura.Dia} - ${asignatura.Siglas} - ${asignatura.Grupo} - ${asignatura.Clase} - ${asignatura.HoraInicio}`,
              title: `${asignatura.Siglas} \n \n ${asignatura.Grupo} - ${asignatura.Clase}`,
              start: inicio,
              end: fin,
              nombre: asignatura.Nombre,
              siglas: asignatura.Siglas,
              grado: asignatura.Grado,
              semestre: asignatura.Semestre,
              curso: asignatura.Curso,
              grupo: asignatura.Grupo,
              grupoLaboratorio: asignatura.GrupoLaboratorio,
              mencion: asignatura.Mencion,
              aula: asignatura.Clase,
              profesor: asignatura.Profesor,
              color: asignatura.Color,
              dia: asignatura.Dia,
              codigo: asignatura.Codigo
            };
          }).filter(Boolean);
      
          setEvents(eventos);
        } catch (error) {
          console.error("Error cargando los datos del JSON:", error);
        }
    }; */

    useEffect(() => {
      if (openFile) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
    
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          
          setOpenedFile(file);
          cargarAsignaturasArchivoElegido(file);
        };
    
        input.click();
        setOpenFile(false); // cerramos el "modo abrir" tras mostrar el cuadro
      }
    }, [openFile]);

    const cargarAsignaturasArchivoElegido = async (file) => {
      try {
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const contenido = event.target.result;
    
          let data;
          try {
            data = JSON.parse(contenido);
          } catch (error) {
            console.error("Error al parsear el JSON:", error);
            return;
          }
    
          setSubjects(data);
    
          const eventos = data.map((asignatura) => {
            const diaSemana = diasSemana[asignatura.Dia];
            if (diaSemana === undefined) return null;
    
            const [hora, minutos] = asignatura.HoraInicio.split(":").map(Number);
            const hoy = moment();
            const lunesSemanaActual = hoy.clone().startOf("isoWeek");
    
            const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
              hour: hora,
              minute: minutos,
              second: 0,
            }).toDate();
            
            const fin = moment(inicio).add(parseInt(asignatura.Duracion), "hours").toDate();
    
            return {
              id: `${asignatura.Dia} - ${asignatura.Siglas} - ${asignatura.Grupo} - ${asignatura.GrupoLaboratorio} - ${asignatura.Clase} - ${asignatura.HoraInicio}`,
              title: `${asignatura.Siglas} \n \n ${asignatura.Grupo} - ${asignatura.Clase}`,
              start: inicio,
              end: fin,
              nombre: asignatura.Nombre,
              siglas: asignatura.Siglas,
              grado: asignatura.Grado,
              semestre: asignatura.Semestre,
              curso: asignatura.Curso,
              grupo: asignatura.Grupo,
              grupoLaboratorio: asignatura.GrupoLaboratorio,
              mencion: asignatura.Mencion,
              aula: asignatura.Clase,
              profesor: asignatura.Profesor,
              color: asignatura.Color,
              dia: asignatura.Dia,
              codigo: asignatura.Codigo
            };
          }).filter(Boolean);
    
          setEvents(eventos);
        };
    
        reader.onerror = () => {
          console.error("Error al leer el archivo.");
        };
    
        reader.readAsText(file);
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
    };

    useEffect(() => {
        if (!exportPDF || !filteredAsigs || !subjects) return; // Evita ejecutar si no se quiere exportar a pdf o si el horario está vacio

        const contenido = document.getElementById("creacion-horarios-horario-cabeceraDocumento");

        if (!contenido) {
            console.error("No se encontró el elemento con ID 'creacion-horarios-horario-cabeceraDocumento'");
            return;
        }

        // 🔹 Obtener valores mapeados
        const curso = courseMap[selectedCourse] || selectedCourse;
        const semestre = semesterMap[selectedSemester] || selectedSemester;
        
        // 🔹 Generar año académico en formato "2024/25"
        const añoActual = new Date().getFullYear() - 1;
        const añoSiguiente = (añoActual + 1) % 100; // Solo los dos últimos dígitos
        const anho = `${añoActual}/${añoSiguiente}`;

        let extraInfo = "";

        if (selectedGrade === "INF") {
            if (selectedCourse === "1º" || selectedCourse === "2º") {
                extraInfo = selectedGroup ? `${selectedGroup}` : "";
            } else if (selectedCourse === "3º" || selectedCourse === "4º") {
                extraInfo = selectedMention ? `${selectedMention}` : "";
            }
        }

        const filename = `Horario_${selectedGrade}_${curso}_${semestre}_${extraInfo}_${anho}.pdf`;

        const parametrosPDF = {
            margin: 10,  // Aumenta el margen si deseas más espacio alrededor
            filename: filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { 
                scale: 4, 
                scrollY: 0, 
                windowWidth: document.documentElement.scrollWidth, 
                windowHeight: document.documentElement.scrollHeight 
            },
            jsPDF: { 
                unit: "mm", 
                format: "a4",  // Cambia el formato a A3
                orientation: "landscape" 
            },
        };
        

        html2pdf().set(parametrosPDF).from(contenido).save().then(() => {
            setExportPDF(false); // Resetea el estado después de exportar
        });

    }, [exportPDF, filteredAsigs, subjects]);

    // useEffect para la parte de visualizacion de calendarios genericos
    useEffect(() => {
        if (!selectedGrade || !selectedSemester) {
            setFilteredAsigs([]);
        } else {
            let asignaturasFiltradas;
    
            if(selectedGrade === "INF"){
              if (selectedCourse === "3º" || selectedCourse === "4º") {
                asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse &&
                evento.mencion === selectedMention &&
                evento.grupo.startsWith("T") &&
                (evento.grupoLaboratorio.startsWith("L") ||
                evento.grupoLaboratorio.startsWith("W") ||
                evento.grupoLaboratorio === "")
                );
              } else {
                if(!selectedGroup){
                    asignaturasFiltradas = events.filter(evento => 
                        evento.grado === selectedGrade &&
                        evento.semestre === selectedSemester &&
                        evento.curso === selectedCourse &&
                        evento.grupo.startsWith("T") &&
                        (evento.grupoLaboratorio.startsWith("X") || 
                        evento.grupoLaboratorio.startsWith("L") || 
                        evento.grupoLaboratorio.startsWith("AS") || 
                        evento.grupoLaboratorio.startsWith("J") ||
                        evento.grupoLaboratorio.startsWith("K") ||
                        evento.grupoLaboratorio.startsWith("Y") ||
                        evento.grupoLaboratorio === "")
                    );
                } else {
                    asignaturasFiltradas = events.filter(evento => 
                        evento.grado === selectedGrade &&
                        evento.semestre === selectedSemester &&
                        evento.curso === selectedCourse &&
                        (evento.grupo === selectedGroup && 
                        (evento.grupoLaboratorio.startsWith("X") ||  
                        evento.grupoLaboratorio.startsWith("L")  || 
                        evento.grupoLaboratorio.startsWith("AS") || 
                        evento.grupoLaboratorio.startsWith("J")  ||
                        evento.grupoLaboratorio.startsWith("K")  ||
                        evento.grupoLaboratorio.startsWith("Y")  ||
                        evento.grupoLaboratorio === ""))
                    );
                }
              }
            }
    
            if(selectedGrade === "EST"){
              if(!selectedGroup){
                asignaturasFiltradas = events.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  (evento.grupo.startsWith("T") && 
                  (evento.grupoLaboratorio.startsWith("T/L") ||
                  evento.grupoLaboratorio.startsWith("L") ||
                  evento.grupoLaboratorio.startsWith("X") ||
                  evento.grupoLaboratorio.startsWith("J") ||
                  evento.grupoLaboratorio.startsWith("TL") ||
                  evento.grupoLaboratorio === ""))
                  );
              } else {
                asignaturasFiltradas = events.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  (evento.grupo === selectedGroup && 
                  (evento.grupoLaboratorio.startsWith("T/L") ||
                  evento.grupoLaboratorio.startsWith("L") ||
                  evento.grupoLaboratorio.startsWith("X") ||
                  evento.grupoLaboratorio.startsWith("J") ||
                  evento.grupoLaboratorio.startsWith("TL") ||
                  evento.grupoLaboratorio === ""))
                );
              }
                      
            }
            if(selectedGrade === "I + E"){
              if(!selectedGroup){
                asignaturasFiltradas = events.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  (evento.grupo.startsWith("T") &&
                  (evento.grupoLaboratorio.startsWith("T/L") ||
                  evento.grupoLaboratorio.startsWith("L") ||
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("X") ||
                  evento.grupoLaboratorio.startsWith("J") ||
                  evento.grupoLaboratorio.startsWith("Y") ||
                  evento.grupoLaboratorio.startsWith("K") ||
                  evento.grupoLaboratorio === ""))
                );
            } else {
              asignaturasFiltradas = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === selectedCourse &&
                (evento.grupo === selectedGroup &&
                (evento.grupoLaboratorio.startsWith("T/L") ||
                evento.grupoLaboratorio.startsWith("L") ||
                evento.grupoLaboratorio.startsWith("AS") || 
                evento.grupoLaboratorio.startsWith("X") ||
                evento.grupoLaboratorio.startsWith("J") ||
                evento.grupoLaboratorio.startsWith("Y") ||
                evento.grupoLaboratorio.startsWith("K") ||
                evento.grupoLaboratorio === ""))
              );
            }
                
            }
    
            if(selectedGrade === "Master"){
                asignaturasFiltradas = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === "1º" &&
                    (evento.grupo.startsWith("T") &&
                    (evento.grupoLaboratorio.startsWith("L") ||
                     evento.grupoLaboratorio === ""))
                );
            }
            
            console.log("Eventos filtrados:", asignaturasFiltradas);
            setFilteredAsigs(asignaturasFiltradas);
        }
    }, [selectedGrade, selectedSemester, selectedCourse, selectedGroup, selectedMention, events]);

    // Version de guardado para todo tipo de navegadores (supuestamente)
    /*
    useEffect(() => {
      if (!save) return;

      const guardarAsignaturasJSON = async () => {
        try {
          const eventosActualizados = events.map(evento => ({
            Codigo: evento.codigo,
            Dia: evento.dia,
            HoraInicio: moment(evento.start).format("HH:mm"),
            Duracion: moment(evento.end).diff(moment(evento.start), "hours"),
            Siglas: evento.siglas,
            Nombre: evento.nombre,
            Grado: evento.grado,
            Semestre: evento.semestre,
            Curso: evento.curso,
            Grupo: evento.grupo,
            GrupoLaboratorio: evento.grupoLaboratorio,
            Mencion: evento.mencion,
            Clase: evento.aula,
            Profesor: evento.profesor,
            Color: evento.color
          }));

          const jsonString = JSON.stringify(eventosActualizados, null, 2);
          const blob = new Blob([jsonString], { type: "application/json" });

          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;

          const nombreArchivo = prompt("Introduce el nombre del archivo (sin extensión):", "asignaturas_guardadas");
          if (!nombreArchivo) {
            URL.revokeObjectURL(url);
            setSave(false);
            return;
          }

          a.download = nombreArchivo.endsWith(".json") ? nombreArchivo : `${nombreArchivo}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          URL.revokeObjectURL(url);
          console.log("Asignaturas guardadas exitosamente como:", a.download);
        } catch (error) {
          console.error("Error al guardar el archivo JSON:", error);
        }

          setSave(false);
        };

        guardarAsignaturasJSON();
  }, [save]);*/

  // Version para navegadores basados en Chromium
  useEffect(() => {
    if (!save) return;
  
    const guardarAsignaturasJSON = async () => {
      try {
        const eventosActualizados = events.map(evento => {
          const hora = moment(evento.start).hour();
          const horaInicioFormateada = hora < 10
            ? moment(evento.start).format("H:mm")
            : moment(evento.start).format("HH:mm");
  
          return {
            Codigo: evento.codigo,
            Dia: evento.dia,
            HoraInicio: horaInicioFormateada,
            Duracion: moment(evento.end).diff(moment(evento.start), "hours"),
            Siglas: evento.siglas,
            Nombre: evento.nombre,
            Grado: evento.grado,
            Semestre: evento.semestre,
            Curso: evento.curso,
            Grupo: evento.grupo,
            GrupoLaboratorio: evento.grupoLaboratorio,
            Mencion: evento.mencion,
            Clase: evento.aula,
            Profesor: evento.profesor,
            Color: evento.color
          };
        });
  
        // JSON convertido a string con indentación
        const jsonString = JSON.stringify(eventosActualizados, null, 2);
  
        // Mostrar cuadro de diálogo "Guardar como"
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: "asignaturas.json",
          types: [
            {
              description: "Archivo JSON",
              accept: { "application/json": [".json"] }
            }
          ]
        });
  
        // Crear archivo y escribir datos
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(jsonString);
        await writableStream.close();
  
        console.log("Archivo guardado correctamente:", fileHandle.name);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error al guardar el archivo:", error);
        } else {
          console.log("Guardado cancelado por el usuario.");
        }
      }
  
      setSave(false);
    };
  
    guardarAsignaturasJSON();
  }, [save]);

     
  const actualizarEventos = (contenidoActualizado) => {
    return contenidoActualizado.map((asignatura) => {
      const diaSemana = diasSemana[asignatura.Dia];
      if (diaSemana === undefined) return null;
  
      const [hora, minutos] = asignatura.HoraInicio.split(":").map(Number);
      const hoy = moment();
      const lunesSemanaActual = hoy.clone().startOf("isoWeek");
  
      const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
        hour: hora,
        minute: minutos,
        second: 0,
      }).toDate();
  
      const fin = moment(inicio).add(parseInt(asignatura.Duracion), "hours").toDate();
  
      return {
        id: `${asignatura.Dia} - ${asignatura.Siglas} - ${asignatura.Grupo} - ${asignatura.GrupoLaboratorio} - ${asignatura.Clase} - ${asignatura.HoraInicio}`,
        title: `${asignatura.Siglas} \n \n ${asignatura.Grupo} - ${asignatura.Clase}`,
        start: inicio,
        end: fin,
        nombre: asignatura.Nombre,
        siglas: asignatura.Siglas,
        grado: asignatura.Grado,
        semestre: asignatura.Semestre,
        curso: asignatura.Curso,
        grupo: asignatura.Grupo,
        grupoLaboratorio: asignatura.GrupoLaboratorio,
        mencion: asignatura.Mencion,
        aula: asignatura.Clase,
        profesor: asignatura.Profesor,
        color: asignatura.Color,
        dia: asignatura.Dia,
        codigo: asignatura.Codigo
      };
    }).filter(Boolean);
  };
  
    
    useEffect(() => {
        const crearAsignaturas = async () => {
          try {
            const nuevosRegistros = [];
            let incidenciasTexto = "";
      
            const cursos = [
              { estado: asigCourseGII_IS, grado: "INF", mencion: "IS" },
              { estado: asigCourseGII_TI, grado: "INF", mencion: "TI" },
              { estado: asigCourseGII_CO, grado: "INF", mencion: "CO" },
              { estado: asigCourse_EST, grado: "EST" },
              { estado: asigCourse_INDat, grado: "I + E" },
              { estado: asigCourse_Master, grado: "Master" },
            ];
      
            cursos.forEach((curso) => {
              if (curso.estado && curso.estado !== "-") {
                
                const grupo = `${asigGroupType ?? ""}${asigGroupNumber ?? ""}`;
                console.log(asigCourseGII_IS);
                console.log(selectedEvent);
                //console.log(Array.isArray(subjects), subjects);

                const diaSemana = diasSemana[asigDay];
                
      
                const [hora, minutos] = asigStartTime.split(":").map(Number);
                const hoy = moment();
                const lunesSemanaActual = hoy.clone().startOf("isoWeek");
        
                const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
                  hour: hora,
                  minute: minutos,
                  second: 0,
                }).toDate();
                
                const fin = moment(inicio).add(parseInt(asigDuration), "hours").toDate();

                const nuevaAsignatura = {
                  id: `${asigDay} - ${asigInitials} - ${grupo} - ${asigLabGroup} - ${asigClass} - ${asigStartTime}`,
                  title: `${asigInitials} \n \n ${grupo} - ${asigClass}`,
                  codigo: asigCode,
                  dia: asigDay,
                  siglas: asigInitials,
                  nombre: asigFullName,
                  grado: curso.grado,
                  semestre: asigSemester,
                  curso: curso.estado,
                  grupo: grupo,
                  grupoLaboratorio: asigLabGroup ?? "",
                  mencion: curso.mencion ?? "",
                  aula: asigClass,
                  profesor: asigTeacher,
                  color: asigColor,
                  start: inicio,
                  end: fin
                };
                
                console.log("nueva asignatura:", nuevaAsignatura);

                const horaInicioNuevaAsignatura = nuevaAsignatura.start.getHours() < 10
                  ? nuevaAsignatura.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
                  : nuevaAsignatura.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm

                const duracionNuevaAsignatura = (nuevaAsignatura.end - nuevaAsignatura.start) / (1000 * 60 * 60);

                const asignaturaPreexistente = events.find((evento) => {
                  const horaInicioEvento = evento.start.getHours() < 10
                    ? evento.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                    : evento.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
                  const duracionEvento = (evento.end - evento.start) / (1000 * 60 * 60);
                  
    
                  return (
                    evento.codigo === nuevaAsignatura.codigo &&
                    evento.siglas === nuevaAsignatura.siglas &&
                    evento.dia === nuevaAsignatura.dia &&
                    evento.grupo === nuevaAsignatura.grupo &&
                    evento.grupoLaboratorio === nuevaAsignatura.grupoLaboratorio &&
                    evento.nombre === nuevaAsignatura.nombre &&
                    evento.semestre === nuevaAsignatura.semestre &&
                    evento.aula === nuevaAsignatura.aula &&
                    evento.profesor === nuevaAsignatura.profesor &&
                    evento.grado === nuevaAsignatura.grado &&
                    (evento.mencion ?? "") === (nuevaAsignatura.mencion ?? "") &&
                    evento.curso === nuevaAsignatura.curso &&
                    evento.color === nuevaAsignatura.color &&
                    horaInicioEvento === horaInicioNuevaAsignatura &&
                    duracionEvento === duracionNuevaAsignatura
                  );
                });

      
                if (!asignaturaPreexistente) {
                    nuevosRegistros.push(nuevaAsignatura);
                    let nuevosEventos = [...events];
                    nuevosEventos.push(nuevaAsignatura);
                    setEvents(nuevosEventos);

                    checkNewAsigIncompatibility(nuevaAsignatura, nuevosEventos);
                } else {
                    const combinacion = `${nuevaAsignatura.Siglas} - ${nuevaAsignatura.Grupo} - ${curso.grado} - ${curso.estado} - ${curso.mencion} - ${nuevaAsignatura.Dia} - ${nuevaAsignatura.HoraInicio} ya existente.`;
                    incidenciasTexto += `${combinacion}\n`;
                }
              }
            });
      
            setAsigIncidences(incidenciasTexto.trim());
      
            /*if (nuevosRegistros.length > 0 && incidenciasTexto === "") {
              const res = await fetch(`http://localhost:5000/asignaturas${openedFile ? `?archivo=${openedFile.name}` : ""}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  originales: subjects,
                  nuevos: nuevosRegistros
                }),
              });
      
              if (res.ok) {
                const contenidoActualizado = await res.json();
                setSubjects(contenidoActualizado);
                console.log("Nuevas asignaturas guardadas correctamente.");
                clearAllFields();
                setTimeout(() => {
                  const nuevosEventos = actualizarEventos(contenidoActualizado);
                  setEvents(nuevosEventos);    
                }, 300); // Espera 300ms
                
              } else {
                console.error("Error al guardar las asignaturas en el backend.");
              }
            }*/
      
          } catch (error) {
            console.error("Error al cargar o actualizar asignaturas:", error);
          } finally {
            // 🔁 Siempre se reinicia el estado al final
            setCreateAsig(false);
          }
        };
      
        if (createAsig) {
            crearAsignaturas();
        }
      }, [createAsig]);

      const checkNewAsigIncompatibility = (nuevaAsignatura, eventosActualizados) => {

        console.log("entra checkNewAsig");
        console.log("nueva asig Creada:", nuevaAsignatura);
      
        const horaInicioNueva = moment(nuevaAsignatura.start);
        const horaFinNueva = moment(nuevaAsignatura.end);

        let eventosFiltrados;

        const horaInicioNuevaAsignatura = nuevaAsignatura.start.getHours() < 10
              ? nuevaAsignatura.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
              : nuevaAsignatura.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm

        if(selectedGrade === "INF"){
          if (selectedCourse === "3º" || selectedCourse === "4º") {
            eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            evento.mencion === selectedMention &&
            evento.grupo.startsWith("T") &&
            (evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("W") ||
            evento.grupoLaboratorio === "")
            );
          } else {
            if(!selectedGroup){
              eventosFiltrados = eventosActualizados.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo.startsWith("T") &&
                    (evento.grupoLaboratorio.startsWith("X") || 
                    evento.grupoLaboratorio.startsWith("L") || 
                    evento.grupoLaboratorio.startsWith("AS") || 
                    evento.grupoLaboratorio.startsWith("J") ||
                    evento.grupoLaboratorio.startsWith("K") ||
                    evento.grupoLaboratorio.startsWith("Y") ||
                    evento.grupoLaboratorio === "")
                );
            } else {
              eventosFiltrados = eventosActualizados.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    (evento.grupo === selectedGroup && 
                    (evento.grupoLaboratorio.startsWith("X") ||  
                    evento.grupoLaboratorio.startsWith("L")  || 
                    evento.grupoLaboratorio.startsWith("AS") || 
                    evento.grupoLaboratorio.startsWith("J")  ||
                    evento.grupoLaboratorio.startsWith("K")  ||
                    evento.grupoLaboratorio.startsWith("Y")  ||
                    evento.grupoLaboratorio === ""))
                );
            }
          }
        }
  
        if(selectedGrade === "EST"){
          if(!selectedGroup){
            eventosFiltrados = eventosActualizados.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo.startsWith("T") && 
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("TL") ||
              evento.grupoLaboratorio === ""))
              );
          } else {
            eventosFiltrados = eventosActualizados.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo === selectedGroup && 
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("TL") ||
              evento.grupoLaboratorio === ""))
            );
          }
                  
        }
        if(selectedGrade === "I + E"){
          if(!selectedGroup){
            eventosFiltrados = eventosActualizados.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo.startsWith("T") &&
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("AS") || 
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("Y") ||
              evento.grupoLaboratorio.startsWith("K") ||
              evento.grupoLaboratorio === ""))
            );
        } else {
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo === selectedGroup &&
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("AS") || 
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("Y") ||
            evento.grupoLaboratorio.startsWith("K") ||
            evento.grupoLaboratorio === ""))
          );
        }
            
        }
  
        if(selectedGrade === "Master"){
          eventosFiltrados = eventosActualizados.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === "1º" &&
                (evento.grupo.startsWith("T") &&
                (evento.grupoLaboratorio.startsWith("L") ||
                 evento.grupoLaboratorio === ""))
            );
        }
        
        for (const evento of eventosFiltrados) {    // Es necesario que se realice sobre los eventos que compartan grado, cuatri y curso, para poder
                                          // comprobar entre distintos grupos del mismo curso
          const horaInicioEvento = moment(evento.start);
          const horaFinEvento = moment(evento.end);
      
          const mismaFranja = horaInicioNueva.isBefore(horaFinEvento) && horaFinNueva.isAfter(horaInicioEvento);
      
          if (
            mismaFranja && nuevaAsignatura.grado === evento.grado && nuevaAsignatura.dia === evento.dia &&
            nuevaAsignatura.curso === evento.curso &&
            nuevaAsignatura.grupo.startsWith("T") &&
            evento.grupo.startsWith("T")
          ) {
            console.log("entra if gordo");

            const generatedId = `${nuevaAsignatura.dia} - ${nuevaAsignatura.siglas} - ${nuevaAsignatura.grupo} - ${nuevaAsignatura.grupoLaboratorio} - ${nuevaAsignatura.aula} - ${horaInicioNuevaAsignatura}`;
            
            const buildMessage = (base) => {
              const extras = [];
              if (nuevaAsignatura.profesor === evento.profesor) extras.push("profesor");
              if (nuevaAsignatura.aula === evento.aula) extras.push("aula");
              return extras.length
                ? `${base} ${extras.join(" y ")}`
                : base;
            };

            if (nuevaAsignatura.grupoLaboratorio === "" && evento.grupoLaboratorio === "" && generatedId !== evento.id) {

              const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teóricas");

              setIncidenceOnCreatedAsig(mensaje);
              console.log("id de nueva:", generatedId);
              console.log("id de evento:", evento.id);

              setAsigIncompatibilitiesIds(prev => ({
                ...prev,
                [generatedId]: mensaje,
                [evento.id]: mensaje,
              }));

              console.log("entra primer if", incidenceOnCreatedAsig);
              return true;
            }
      
            if (
              (nuevaAsignatura.grupoLaboratorio === "" && evento.grupoLaboratorio !== "" && generatedId !== evento.id) ||
              (nuevaAsignatura.grupoLaboratorio !== "" && evento.grupoLaboratorio === "" && generatedId !== evento.id)
            ) {

              const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teórica y práctica");
        
              setIncidenceOnCreatedAsig(mensaje);

              console.log("id de nueva:", generatedId);
              console.log("id de evento:", evento.id);

              setAsigIncompatibilitiesIds(prev => ({
                ...prev,
                [generatedId]: mensaje,
                [evento.id]: mensaje,
              }));

              console.log("entra segundo/tercer if", incidenceOnCreatedAsig);
              return true;
            }

            if (nuevaAsignatura.grupoLaboratorio !== "" && evento.grupoLaboratorio !== "" && generatedId !== evento.id) {

              const mensaje = buildMessage("Incompatibilidad por coincidencia de");
              const mensajeOriginal = "Incompatibilidad por coincidencia de";

              if(mensaje !== mensajeOriginal) {
                setIncidenceOnCreatedAsig(mensaje);

                console.log("id de nueva:", generatedId);
                console.log("id de evento:", evento.id);

                setAsigIncompatibilitiesIds(prev => ({
                  ...prev,
                  [generatedId]: mensaje,
                  [evento.id]: mensaje,
                }));

                console.log("entra cuarto if", incidenceOnCreatedAsig);
                return true;
              }

            }

          }
        }
      
        return false;
      };


      useEffect(() => {
        if (clearFormulary) {
            clearAllFields();
        }
    }, [clearFormulary]);
    
    const clearAllFields = () => {
        setAsigCode("");
        setAsigInitials("");
        setAsigFullName("");
        setAsigDay("");
        setAsigStartTime("");
        setAsigColor("");
        setAsigSemester("");
        setAsigGroupNumber("");
        setAsigLabGroup("");
        setAsigGroupType("");
        setAsigDuration("");
        setAsigClass("");
        setAsigCourseGII_IS("");
        setAsigCourseGII_TI("");
        setAsigCourseGII_CO("");
        setAsigCourse_EST("");
        setAsigCourse_INDat("");
        setAsigCourse_Master("");
        setAsigTeacher("");
        setAsigIncidences("");
        setCreateAsig(false);
        setIncidenceOnCreatedAsig("");
        setClearFormulary(false);
    };


    const handleEventSelect = (event) => {
        setSelectedEvent(event); // Actualiza el estado con el evento seleccionado
        console.info('[handleEventSelect - event]', event); // Imprime el evento en consola (opcional)
    };


    useEffect(() => {
        const modificarAsignatura = async () => {
          try {
            console.log("archivo donde se mod:", openedFile);
            const cursos = [
              { estado: asigCourseGII_ISMod, grado: "INF", mencion: "IS" },
              { estado: asigCourseGII_TIMod, grado: "INF", mencion: "TI" },
              { estado: asigCourseGII_COMod, grado: "INF", mencion: "CO" },
              { estado: asigCourse_ESTMod, grado: "EST" },
              { estado: asigCourse_INDatMod, grado: "I + E" },
              { estado: asigCourse_MasterMod, grado: "Master" },
            ];
      
            let asignaturaModificada;

            console.log(asigCourseGII_TIMod);
            console.log(asigCourseGII_COMod);
            console.log(asigCourse_ESTMod);
            console.log(asigCourse_INDatMod);
            console.log(asigCourse_MasterMod);

            cursos.forEach((curso) => {
              if (curso.estado && curso.estado !== "-") {
                const grupo = `${asigGroupTypeMod ?? ""}${asigGroupNumberMod ?? ""}`;
                console.log(asigCourseGII_ISMod);
                console.log(selectedEvent);
                //console.log(Array.isArray(subjects), subjects);

                const diaSemana = diasSemana[asigDayMod];
                
      
                const [hora, minutos] = asigStartTimeMod.split(":").map(Number);
                const hoy = moment();
                const lunesSemanaActual = hoy.clone().startOf("isoWeek");
        
                const inicio = lunesSemanaActual.clone().add(diaSemana - 1, "days").set({
                  hour: hora,
                  minute: minutos,
                  second: 0,
                }).toDate();
                
                const fin = moment(inicio).add(parseInt(asigDurationMod), "hours").toDate();

                asignaturaModificada = {
                  id: `${asigDayMod} - ${asigInitialsMod} - ${grupo} - ${asigLabGroupMod} - ${asigClassMod} - ${asigStartTimeMod}`,
                  title: `${asigInitialsMod} \n \n ${grupo} - ${asigClassMod}`,
                  codigo: asigCodeMod,
                  dia: asigDayMod,
                  siglas: asigInitialsMod,
                  nombre: asigFullNameMod,
                  grado: curso.grado,
                  semestre: asigSemesterMod,
                  curso: curso.estado,
                  grupo: grupo,
                  grupoLaboratorio: asigLabGroupMod ?? "",
                  mencion: curso.mencion ?? "",
                  aula: asigClassMod,
                  profesor: asigTeacherMod,
                  color: asigColorMod,
                  start: inicio,
                  end: fin
                };
                
                  checkModifiedAsigIncompatibility(asignaturaModificada, selectedEvent.id);
                
              }
            });

            // Aquí reemplazas el evento en el array
            if (asignaturaModificada) {
              const eventosActualizados = events
                .filter((evento) => evento.id !== selectedEvent.id) // elimina el antiguo
                .concat(asignaturaModificada); // añade el nuevo

              setEvents(eventosActualizados);
              console.log("evnetos modificados mod asig: ", eventosActualizados);
            }
      
            
      
          } catch (error) {
            console.error("⚠️ Error al modificar asignatura:", error);
          } finally {
            setModifyAsig(false);
            setEventClicked(false);
          }
        };
      
        if (modifyAsig) {
          modificarAsignatura();
        }
      }, [modifyAsig]);

      
      const checkModifiedAsigIncompatibility = (asignaturaModificada, idAntiguoAsigModificada) => {
        
        console.log("entra checkModifiedAsigIncompatibility");
        console.log("asig Modificada:", asignaturaModificada);
        console.log("id antiguo asig Mod:", idAntiguoAsigModificada);

        
      
        const horaInicioNueva = moment(asignaturaModificada.start);
        const horaFinNueva = moment(asignaturaModificada.end);

        let eventosFiltrados;

        const horaInicioAsignaturaModificada = asignaturaModificada.start.getHours() < 10
              ? asignaturaModificada.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
              : asignaturaModificada.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm

        if(selectedGrade === "INF"){
          if (selectedCourse === "3º" || selectedCourse === "4º") {
            eventosFiltrados = events.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            evento.mencion === selectedMention &&
            evento.grupo.startsWith("T") &&
            (evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("W") ||
            evento.grupoLaboratorio === "") &&
            evento.id !== idAntiguoAsigModificada
            );
          } else {
            if(!selectedGroup){
              eventosFiltrados = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    evento.grupo.startsWith("T") &&
                    (evento.grupoLaboratorio.startsWith("X") || 
                    evento.grupoLaboratorio.startsWith("L") || 
                    evento.grupoLaboratorio.startsWith("AS") || 
                    evento.grupoLaboratorio.startsWith("J") ||
                    evento.grupoLaboratorio.startsWith("K") ||
                    evento.grupoLaboratorio.startsWith("Y") ||
                    evento.grupoLaboratorio === "") &&
                    evento.id !== idAntiguoAsigModificada
                );
            } else {
              eventosFiltrados = events.filter(evento => 
                    evento.grado === selectedGrade &&
                    evento.semestre === selectedSemester &&
                    evento.curso === selectedCourse &&
                    (evento.grupo === selectedGroup && 
                    (evento.grupoLaboratorio.startsWith("X") ||  
                    evento.grupoLaboratorio.startsWith("L")  || 
                    evento.grupoLaboratorio.startsWith("AS") || 
                    evento.grupoLaboratorio.startsWith("J")  ||
                    evento.grupoLaboratorio.startsWith("K")  ||
                    evento.grupoLaboratorio.startsWith("Y")  ||
                    evento.grupoLaboratorio === "")) &&
                    evento.id !== idAntiguoAsigModificada
                );
            }
          }
        }
  
        if(selectedGrade === "EST"){
          if(!selectedGroup){
            eventosFiltrados = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo.startsWith("T") && 
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("TL") ||
              evento.grupoLaboratorio === "")) &&
              evento.id !== idAntiguoAsigModificada
              );
          } else {
            eventosFiltrados = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo === selectedGroup && 
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("TL") ||
              evento.grupoLaboratorio === "")) &&
              evento.id !== idAntiguoAsigModificada
            );
          }
                  
        }
        if(selectedGrade === "I + E"){
          if(!selectedGroup){
            eventosFiltrados = events.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === selectedCourse &&
              (evento.grupo.startsWith("T") &&
              (evento.grupoLaboratorio.startsWith("T/L") ||
              evento.grupoLaboratorio.startsWith("L") ||
              evento.grupoLaboratorio.startsWith("AS") || 
              evento.grupoLaboratorio.startsWith("X") ||
              evento.grupoLaboratorio.startsWith("J") ||
              evento.grupoLaboratorio.startsWith("Y") ||
              evento.grupoLaboratorio.startsWith("K") ||
              evento.grupoLaboratorio === "")) &&
              evento.id !== idAntiguoAsigModificada
            );
        } else {
          eventosFiltrados = events.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo === selectedGroup &&
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("AS") || 
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("Y") ||
            evento.grupoLaboratorio.startsWith("K") ||
            evento.grupoLaboratorio === "")) &&
            evento.id !== idAntiguoAsigModificada
          );
        }
            
        }
  
        if(selectedGrade === "Master"){
          eventosFiltrados = events.filter(evento => 
                evento.grado === selectedGrade &&
                evento.semestre === selectedSemester &&
                evento.curso === "1º" &&
                (evento.grupo.startsWith("T") &&
                (evento.grupoLaboratorio.startsWith("L") ||
                 evento.grupoLaboratorio === "")) &&
                 evento.id !== idAntiguoAsigModificada
            );
        }

        
        console.log("eventos checkMod: ", eventosFiltrados);
        const nuevoIdAsigModificada = `${asignaturaModificada.dia} - ${asignaturaModificada.siglas} - ${asignaturaModificada.grupo} - ${asignaturaModificada.grupoLaboratorio} - ${asignaturaModificada.aula} - ${horaInicioAsignaturaModificada}`;
        
        for (const evento of eventosFiltrados) {    // Es necesario que se realice sobre los eventos que compartan grado, cuatri y curso, para poder
                                          // comprobar entre distintos grupos del mismo curso
          const horaInicioEvento = moment(evento.start);
          const horaFinEvento = moment(evento.end);
      
          const mismaFranja = horaInicioNueva.isBefore(horaFinEvento) && horaFinNueva.isAfter(horaInicioEvento);
          
          if (
            mismaFranja && asignaturaModificada.grado === evento.grado && asignaturaModificada.dia === evento.dia &&
            asignaturaModificada.curso === evento.curso &&
            asignaturaModificada.grupo.startsWith("T") &&
            evento.grupo.startsWith("T")  && 
            nuevoIdAsigModificada !== evento.id 
          ) {
            console.log("entra if gordo");

            
            
            const buildMessage = (base) => {
              const extras = [];
              if (asignaturaModificada.profesor === evento.profesor) extras.push("profesor");
              if (asignaturaModificada.aula === evento.aula) extras.push("aula");
              return extras.length
                ? `${base} ${extras.join(" y ")}`
                : base;
            };

            if (asignaturaModificada.grupoLaboratorio === "" && evento.grupoLaboratorio === "") {

              const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teóricas");

              setIncidenceOnCreatedAsig(mensaje);
              console.log("id de evento mod:", nuevoIdAsigModificada);
              console.log("id de evento:", evento.id);

              setAsigIncompatibilitiesIds(prev => ({
                ...prev,
                [nuevoIdAsigModificada]: mensaje,
                [evento.id]: mensaje,
              }));

              console.log("entra primer if", mensaje);
              return true;
            }
      
            if (
              (asignaturaModificada.grupoLaboratorio === "" && evento.grupoLaboratorio !== "") ||
              (asignaturaModificada.grupoLaboratorio !== "" && evento.grupoLaboratorio === "")
            ) {

              const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teórica y práctica");
        
              setIncidenceOnCreatedAsig(mensaje);

              console.log("id de evento mod:", nuevoIdAsigModificada);
              console.log("id de evento:", evento.id);

              setAsigIncompatibilitiesIds(prev => ({
                ...prev,
                [nuevoIdAsigModificada]: mensaje,
                [evento.id]: mensaje,
              }));

              console.log("entra segundo/tercer if", mensaje);
              return true;
            }

            if(asignaturaModificada.grupoLaboratorio !== "" && evento.grupoLaboratorio !== "") {

              const mensaje = buildMessage("Incompatibilidad por coincidencia de");
              const mensajeOriginal = "Incompatibilidad por coincidencia de";

              if(mensaje !== mensajeOriginal){
                console.log("id de evento mod:", nuevoIdAsigModificada);
                console.log("id de evento:", evento.id);

                setIncidenceOnCreatedAsig(mensaje);
                
                setAsigIncompatibilitiesIds(prev => ({
                  ...prev,
                  [nuevoIdAsigModificada]: mensaje,
                  [evento.id]: mensaje,
                }));

                console.log("entra cuarto if", mensaje);
                return true;
              }

            }
          }
        }
      
        return false;
      };

      useEffect(() => {
        const eliminarAsignatura = async () => {
          try {
            const horaInicioEventoSelect = selectedEvent.start.getHours() < 10
              ? selectedEvent.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
              : selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm

            const duracionEventoSelect = (selectedEvent.end - selectedEvent.start) / (1000 * 60 * 60);

            console.log("eventos antes de borrar:", events);  

            const eventoAEliminar = events.find((evento) => {
              const horaInicioEvento = evento.start.getHours() < 10
                ? evento.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                : evento.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
              const duracionEvento = (evento.end - evento.start) / (1000 * 60 * 60);
              

              return (
                evento.codigo === selectedEvent.codigo &&
                evento.siglas === selectedEvent.siglas &&
                evento.dia === selectedEvent.dia &&
                evento.grupo === selectedEvent.grupo &&
                evento.grupoLaboratorio === selectedEvent.grupoLaboratorio &&
                evento.nombre === selectedEvent.nombre &&
                evento.semestre === selectedEvent.semestre &&
                evento.aula === selectedEvent.aula &&
                evento.profesor === selectedEvent.profesor &&
                evento.grado === selectedEvent.grado &&
                (evento.mencion ?? "") === (selectedEvent.mencion ?? "") &&
                evento.curso === selectedEvent.curso &&
                evento.color === selectedEvent.color &&
                horaInicioEvento === horaInicioEventoSelect &&
                duracionEvento === duracionEventoSelect
              );
            });

            /*const asignaturaAEliminar = events.find((evento) =>
              evento.codigo === selectedEvent.codigo &&
              evento.siglas === selectedEvent.siglas &&
              evento.dia === selectedEvent.dia &&
              evento.grupo === selectedEvent.grupo &&
              evento.grupoLaboratorio === selectedEvent.grupoLaboratorio &&
              evento.nombre === selectedEvent.nombre &&
              evento.semestre === selectedEvent.semestre &&
              evento.aula === selectedEvent.aula &&
              evento.profesor === selectedEvent.profesor &&
              evento.grado === selectedEvent.grado &&
              (evento.mencion ?? "") === (selectedEvent.mencion ?? "") &&
              evento.curso === selectedEvent.curso &&
              evento.color === selectedEvent.color &&
              asig.HoraInicio === horaInicioEvento &&
              ((evento.end - evento.start) / (1000 * 60 * 60)) === ((selectedEvent.end - selectedEvent.start) / (1000 * 60 * 60)) // horas
            );*/
            console.log("evento a eliminar:", eventoAEliminar);
            if (!eventoAEliminar) {
              console.warn("⚠️ No se encontró el evento a eliminar");
              return;
            }
            
            const eventosActualizados = events.filter(ev => ev !== eventoAEliminar);
            console.log("eventos despues de borrar: ", eventosActualizados);
            setEvents(eventosActualizados);
            checkEventsCompatibilitiesAfterDelete(eventosActualizados);

            /*const res = await fetch(`http://localhost:5000/asignaturas/${eventoAEliminar.codigo}${openedFile ? `?archivo=${openedFile.name}` : ""}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                subjects,
                eventoAEliminar,
              }), // Se envía el objeto para filtrar más allá del código
            });
      
            if (res.ok) {
              const contenidoActualizado = await res.json();
              setSubjects(contenidoActualizado);
              console.log("🗑️ Asignatura eliminada correctamente");
              setTimeout(() => {
                //const nuevosEventos = actualizarEventos(contenidoActualizado);
                //setEvents(nuevosEventos);
                
                checkEventsCompatibilitiesAfterDelete(eventosActualizados);
                console.log("Elim asig, archivo abierto:", openedFile);
              }, 300); // Espera 300ms
            } else {
              console.error("❌ Error al eliminar la asignatura en el backend.");
            }*/
          } catch (error) {
            console.error("⚠️ Error al eliminar asignatura:", error);
          } finally {
            setDeleteAsig(false);
            setEventClicked(false);
          }
        };
      
        if (deleteAsig) {
          eliminarAsignatura();
        }
      }, [deleteAsig]);

    const getTextoGrado = () => {
        if (!selectedGrade || !selectedSemester) return "";

        // 🔹 Generar año académico en formato "2024/25"
        const añoActual = new Date().getFullYear() - 1;
        const añoSiguiente = (añoActual + 1) % 100; // Solo los dos últimos dígitos
        const anho = `${añoActual}/${añoSiguiente}`;

        return `${gradeMap[selectedGrade]}, ${semesterMap[selectedSemester]}, Curso ${anho}`;
    };
    
    const getTextoCursoMencion = () => {
      let selectedCourseText = ""; 
      let mentionText = "";
  
      if (selectedGrade === "Master" && selectedSemester) {
          selectedCourseText = courseMap["1º"]; // Asignar el primer curso del máster directamente
      } else if (selectedCourse) {
          selectedCourseText = courseMap[selectedCourse] || ""; // Solo buscar si hay un curso seleccionado
      } else {
          return ""; // Si no es master y no hay curso, retornar vacío
      }
  
      if (
          selectedMention &&
          ["3º", "4º"].includes(selectedCourse) &&
          selectedGrade === "INF"
      ) {
          mentionText = mentionMap[selectedMention] || "";
      }
  
      return mentionText ? `${selectedCourseText}, ${mentionText}` : selectedCourseText;
    };

    const onEventDrop = ({ event, start, end }) => {
      const nuevoDiaSemana = moment(start).isoWeekday();
      const nuevoDia = Object.keys(diasSemana).find(key => diasSemana[key] === nuevoDiaSemana);
      const horaInicioEvento = start.getHours() < 10
              ? start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
              : start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm
      const nuevoId = `${nuevoDia} - ${event.siglas} - ${event.grupo} - ${event.grupoLaboratorio} - ${event.aula} - ${horaInicioEvento}`;
      const eventoActualizado = { ...event, start, end, dia: nuevoDia, id: nuevoId };
      console.log("evento actualizado:", eventoActualizado);
      const eventosActualizados = events.map(e =>
        e.id === event.id ? eventoActualizado : e
      );
      console.log("eventos actualizados:", eventosActualizados);
      let eventosFiltrados;

      if(selectedGrade === "INF"){
        if (selectedCourse === "3º" || selectedCourse === "4º") {
          eventosFiltrados = eventosActualizados.filter(evento => 
          evento.grado === selectedGrade &&
          evento.semestre === selectedSemester &&
          evento.curso === selectedCourse &&
          evento.mencion === selectedMention &&
          evento.grupo.startsWith("T") &&
          (evento.grupoLaboratorio.startsWith("L") ||
          evento.grupoLaboratorio.startsWith("W") ||
          evento.grupoLaboratorio === "")
          );
        } else {
          if(!selectedGroup){
            eventosFiltrados = eventosActualizados.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  evento.grupo.startsWith("T") &&
                  (evento.grupoLaboratorio.startsWith("X") || 
                  evento.grupoLaboratorio.startsWith("L") || 
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("J") ||
                  evento.grupoLaboratorio.startsWith("K") ||
                  evento.grupoLaboratorio.startsWith("Y") ||
                  evento.grupoLaboratorio === "")
              );
          } else {
            eventosFiltrados = eventosActualizados.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  (evento.grupo === selectedGroup && 
                  (evento.grupoLaboratorio.startsWith("X") ||  
                  evento.grupoLaboratorio.startsWith("L")  || 
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("J")  ||
                  evento.grupoLaboratorio.startsWith("K")  ||
                  evento.grupoLaboratorio.startsWith("Y")  ||
                  evento.grupoLaboratorio === ""))
              );
          }
        }
      }

      if(selectedGrade === "EST"){
        if(!selectedGroup){
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo.startsWith("T") && 
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("TL") ||
            evento.grupoLaboratorio === ""))
            );
        } else {
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo === selectedGroup && 
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("TL") ||
            evento.grupoLaboratorio === ""))
          );
        }
                
      }
      if(selectedGrade === "I + E"){
        if(!selectedGroup){
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo.startsWith("T") &&
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("AS") || 
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("Y") ||
            evento.grupoLaboratorio.startsWith("K") ||
            evento.grupoLaboratorio === ""))
          );
      } else {
        eventosFiltrados = eventosActualizados.filter(evento => 
          evento.grado === selectedGrade &&
          evento.semestre === selectedSemester &&
          evento.curso === selectedCourse &&
          (evento.grupo === selectedGroup &&
          (evento.grupoLaboratorio.startsWith("T/L") ||
          evento.grupoLaboratorio.startsWith("L") ||
          evento.grupoLaboratorio.startsWith("AS") || 
          evento.grupoLaboratorio.startsWith("X") ||
          evento.grupoLaboratorio.startsWith("J") ||
          evento.grupoLaboratorio.startsWith("Y") ||
          evento.grupoLaboratorio.startsWith("K") ||
          evento.grupoLaboratorio === ""))
        );
      }
          
      }

      if(selectedGrade === "Master"){
        eventosFiltrados = eventosActualizados.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              (evento.grupo.startsWith("T") &&
              (evento.grupoLaboratorio.startsWith("L") ||
               evento.grupoLaboratorio === ""))
          );
      }

      setEvents(eventosActualizados);
      console.log("Eventos filtrados d&d:", eventosFiltrados);

      const nuevasIncompatibilidades = { ...asigIncompatibilitiesIds };

      checkEventCompatibility(eventoActualizado, eventosFiltrados, nuevasIncompatibilidades);

      setAsigIncompatibilitiesIds(nuevasIncompatibilidades);

      checkAllEventsCompatibilities(eventosFiltrados, nuevasIncompatibilidades);
      
    };
    
    const onEventResize = ({ event, start, end }) => {
      const nuevoDiaSemana = moment(start).isoWeekday();
      const nuevoDia = Object.keys(diasSemana).find(key => diasSemana[key] === nuevoDiaSemana);
      const horaInicioEvento = start.getHours() < 10
              ? start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
              : start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm
      const nuevoId = `${nuevoDia} - ${event.siglas} - ${event.grupo} - ${event.grupoLaboratorio} - ${event.aula} - ${horaInicioEvento}`;
      const eventoActualizado = { ...event, start, end, dia: nuevoDia, id: nuevoId };
      console.log("evento actualizado:", eventoActualizado);
      const eventosActualizados = events.map(e =>
        e.id === event.id ? eventoActualizado : e
      );
      console.log("eventos actualizados:", eventosActualizados);
      let eventosFiltrados;

      if(selectedGrade === "INF"){
        if (selectedCourse === "3º" || selectedCourse === "4º") {
          eventosFiltrados = eventosActualizados.filter(evento => 
          evento.grado === selectedGrade &&
          evento.semestre === selectedSemester &&
          evento.curso === selectedCourse &&
          evento.mencion === selectedMention &&
          evento.grupo.startsWith("T") &&
          (evento.grupoLaboratorio.startsWith("L") ||
          evento.grupoLaboratorio.startsWith("W") ||
          evento.grupoLaboratorio === "")
          );
        } else {
          if(!selectedGroup){
            eventosFiltrados = eventosActualizados.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  evento.grupo.startsWith("T") &&
                  (evento.grupoLaboratorio.startsWith("X") || 
                  evento.grupoLaboratorio.startsWith("L") || 
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("J") ||
                  evento.grupoLaboratorio.startsWith("K") ||
                  evento.grupoLaboratorio.startsWith("Y") ||
                  evento.grupoLaboratorio === "")
              );
          } else {
            eventosFiltrados = eventosActualizados.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  (evento.grupo === selectedGroup && 
                  (evento.grupoLaboratorio.startsWith("X") ||  
                  evento.grupoLaboratorio.startsWith("L")  || 
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("J")  ||
                  evento.grupoLaboratorio.startsWith("K")  ||
                  evento.grupoLaboratorio.startsWith("Y")  ||
                  evento.grupoLaboratorio === ""))
              );
          }
        }
      }

      if(selectedGrade === "EST"){
        if(!selectedGroup){
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo.startsWith("T") && 
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("TL") ||
            evento.grupoLaboratorio === ""))
            );
        } else {
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo === selectedGroup && 
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("TL") ||
            evento.grupoLaboratorio === ""))
          );
        }
                
      }
      if(selectedGrade === "I + E"){
        if(!selectedGroup){
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo.startsWith("T") &&
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("AS") || 
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("Y") ||
            evento.grupoLaboratorio.startsWith("K") ||
            evento.grupoLaboratorio === ""))
          );
      } else {
        eventosFiltrados = eventosActualizados.filter(evento => 
          evento.grado === selectedGrade &&
          evento.semestre === selectedSemester &&
          evento.curso === selectedCourse &&
          (evento.grupo === selectedGroup &&
          (evento.grupoLaboratorio.startsWith("T/L") ||
          evento.grupoLaboratorio.startsWith("L") ||
          evento.grupoLaboratorio.startsWith("AS") || 
          evento.grupoLaboratorio.startsWith("X") ||
          evento.grupoLaboratorio.startsWith("J") ||
          evento.grupoLaboratorio.startsWith("Y") ||
          evento.grupoLaboratorio.startsWith("K") ||
          evento.grupoLaboratorio === ""))
        );
      }
          
      }

      if(selectedGrade === "Master"){
        eventosFiltrados = eventosActualizados.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              (evento.grupo.startsWith("T") &&
              (evento.grupoLaboratorio.startsWith("L") ||
               evento.grupoLaboratorio === ""))
          );
      }

      setEvents(eventosActualizados);
      console.log("Eventos filtrados resize:", eventosFiltrados);
      
      const nuevasIncompatibilidades = { ...asigIncompatibilitiesIds };

      checkEventCompatibility(eventoActualizado, eventosFiltrados, nuevasIncompatibilidades);

      setAsigIncompatibilitiesIds(nuevasIncompatibilidades);

      checkAllEventsCompatibilities(eventosFiltrados, nuevasIncompatibilidades);
      
    };

    const checkEventsCompatibilitiesAfterDelete = (eventosActualizados) => {
      let newIncompatibilities = {};
      console.log("eventos after del: ", eventosActualizados);


      let eventosFiltrados;

      if(selectedGrade === "INF"){
        if (selectedCourse === "3º" || selectedCourse === "4º") {
          eventosFiltrados = eventosActualizados.filter(evento => 
          evento.grado === selectedGrade &&
          evento.semestre === selectedSemester &&
          evento.curso === selectedCourse &&
          evento.mencion === selectedMention &&
          evento.grupo.startsWith("T") &&
          (evento.grupoLaboratorio.startsWith("L") ||
          evento.grupoLaboratorio.startsWith("W") ||
          evento.grupoLaboratorio === "")
          );
        } else {
          if(!selectedGroup){
            eventosFiltrados = eventosActualizados.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  evento.grupo.startsWith("T") &&
                  (evento.grupoLaboratorio.startsWith("X") || 
                  evento.grupoLaboratorio.startsWith("L") || 
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("J") ||
                  evento.grupoLaboratorio.startsWith("K") ||
                  evento.grupoLaboratorio.startsWith("Y") ||
                  evento.grupoLaboratorio === "")
              );
          } else {
            eventosFiltrados = eventosActualizados.filter(evento => 
                  evento.grado === selectedGrade &&
                  evento.semestre === selectedSemester &&
                  evento.curso === selectedCourse &&
                  (evento.grupo === selectedGroup && 
                  (evento.grupoLaboratorio.startsWith("X") ||  
                  evento.grupoLaboratorio.startsWith("L")  || 
                  evento.grupoLaboratorio.startsWith("AS") || 
                  evento.grupoLaboratorio.startsWith("J")  ||
                  evento.grupoLaboratorio.startsWith("K")  ||
                  evento.grupoLaboratorio.startsWith("Y")  ||
                  evento.grupoLaboratorio === ""))
              );
          }
        }
      }

      if(selectedGrade === "EST"){
        if(!selectedGroup){
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo.startsWith("T") && 
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("TL") ||
            evento.grupoLaboratorio === ""))
            );
        } else {
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo === selectedGroup && 
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("TL") ||
            evento.grupoLaboratorio === ""))
          );
        }
                
      }
      if(selectedGrade === "I + E"){
        if(!selectedGroup){
          eventosFiltrados = eventosActualizados.filter(evento => 
            evento.grado === selectedGrade &&
            evento.semestre === selectedSemester &&
            evento.curso === selectedCourse &&
            (evento.grupo.startsWith("T") &&
            (evento.grupoLaboratorio.startsWith("T/L") ||
            evento.grupoLaboratorio.startsWith("L") ||
            evento.grupoLaboratorio.startsWith("AS") || 
            evento.grupoLaboratorio.startsWith("X") ||
            evento.grupoLaboratorio.startsWith("J") ||
            evento.grupoLaboratorio.startsWith("Y") ||
            evento.grupoLaboratorio.startsWith("K") ||
            evento.grupoLaboratorio === ""))
          );
      } else {
        eventosFiltrados = eventosActualizados.filter(evento => 
          evento.grado === selectedGrade &&
          evento.semestre === selectedSemester &&
          evento.curso === selectedCourse &&
          (evento.grupo === selectedGroup &&
          (evento.grupoLaboratorio.startsWith("T/L") ||
          evento.grupoLaboratorio.startsWith("L") ||
          evento.grupoLaboratorio.startsWith("AS") || 
          evento.grupoLaboratorio.startsWith("X") ||
          evento.grupoLaboratorio.startsWith("J") ||
          evento.grupoLaboratorio.startsWith("Y") ||
          evento.grupoLaboratorio.startsWith("K") ||
          evento.grupoLaboratorio === ""))
        );
      }
          
      }

      if(selectedGrade === "Master"){
        eventosFiltrados = eventosActualizados.filter(evento => 
              evento.grado === selectedGrade &&
              evento.semestre === selectedSemester &&
              evento.curso === "1º" &&
              (evento.grupo.startsWith("T") &&
              (evento.grupoLaboratorio.startsWith("L") ||
               evento.grupoLaboratorio === ""))
          );
      }
      console.log("eventos filtrados after del:", eventosFiltrados);

      for(const evento1 of eventosFiltrados){

        const horaInicioPrimerEvento = moment(evento1.start);
        const horaFinPrimerEvento = moment(evento1.end);

        for(const evento2 of eventosFiltrados){
          const horaInicioSegundoEvento = moment(evento2.start);
          const horaFinSegundoEvento = moment(evento2.end);

          if(evento1.id !== evento2.id) {
            
            
            const mismaFranja = horaInicioPrimerEvento.isBefore(horaFinSegundoEvento) && horaFinPrimerEvento.isAfter(horaInicioSegundoEvento);
            
            if (
              mismaFranja && evento1.grado === evento2.grado && evento1.dia === evento2.dia &&
              evento1.curso === evento2.curso &&
              evento1.grupo === evento2.grupo &&
              evento1.grupo.startsWith("T") &&
              evento2.grupo.startsWith("T") 
            ) {
              console.log("entra if gordo");
    
              //const generatedId = `${nuevaAsignatura.dia} - ${nuevaAsignatura.Siglas} - ${nuevaAsignatura.Grupo} - ${nuevaAsignatura.GrupoLaboratorio} - ${nuevaAsignatura.Clase} - ${nuevaAsignatura.HoraInicio}`;
              
              const buildMessage = (base) => {
                const extras = [];
                if (evento1.profesor === evento2.profesor) extras.push("profesor");
                if (evento1.aula === evento2.aula) extras.push("aula");
                return extras.length
                  ? `${base} ${extras.join(" y ")}`
                  : base;
              };
    
              if (evento1.grupoLaboratorio === "" && evento2.grupoLaboratorio === "") {
    
                const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teóricas");
    
                setIncidenceOnCreatedAsig(mensaje);
                console.log("id de evento1:", evento1.id);
                console.log("id de evento2:", evento2.id);
    
                newIncompatibilities[evento1.id] = mensaje;
                newIncompatibilities[evento2.id] = mensaje;
    
                console.log("entra primer if", mensaje);
                return true;
              }
        
              if (
                (evento1.grupoLaboratorio === "" && evento2.grupoLaboratorio !== "") ||
                (evento1.grupoLaboratorio !== "" && evento2.grupoLaboratorio === "")
              ) {
    
                const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teórica y práctica");
          
                setIncidenceOnCreatedAsig(mensaje);
    
                console.log("id de evento1:", evento1.id);
                console.log("id de evento2:", evento2.id);
    
                newIncompatibilities[evento1.id] = mensaje;
                newIncompatibilities[evento2.id] = mensaje;
    
    
                console.log("entra segundo/tercer if", mensaje);
                return true;
              }
    
              if (evento1.grupoLaboratorio !== "" && evento2.grupoLaboratorio !== "" ) {
    
                const mensaje = buildMessage("Incompatibilidad por coincidencia de");
                const mensajeOriginal = "Incompatibilidad por coincidencia de";
    
                if(mensaje !== mensajeOriginal){
                  setIncidenceOnCreatedAsig(mensaje);
    
                console.log("id de evento1:", evento1.id);
                console.log("id de evento2:", evento2.id);
    
                newIncompatibilities[evento1.id] = mensaje;
                newIncompatibilities[evento2.id] = mensaje;
    
    
                console.log("entra cuarto if", mensaje);
                return true;
                } 
              }
            }
          }
        }
      }

      console.log("nuevas inc:", newIncompatibilities);
      setAsigIncompatibilitiesIds(newIncompatibilities);
    }


    const checkEventCompatibility = (nuevaAsignatura, eventosActualizados, incompatibilities) => {
      console.log("entra checkEventCompatibility");
    
      const diaSemanaNueva = diasSemana[nuevaAsignatura.dia];
      if (diaSemanaNueva === undefined) return false;
    
      const horaInicioNueva = moment(nuevaAsignatura.start);
      const horaFinNueva = moment(nuevaAsignatura.end);

      for (const evento of eventosActualizados) {    // Es necesario que se realice sobre los eventos que compartan grado, cuatri y curso, para poder
                                        // comprobar entre distintos grupos del mismo curso
        const horaInicioEvento = moment(evento.start);
        const horaFinEvento = moment(evento.end);
    
        const mismaFranja = horaInicioNueva.isBefore(horaFinEvento) && horaFinNueva.isAfter(horaInicioEvento);
    
        if (
          mismaFranja && nuevaAsignatura.grado === evento.grado && nuevaAsignatura.dia === evento.dia &&
          nuevaAsignatura.curso === evento.curso &&
          nuevaAsignatura.grupo === evento.grupo &&
          nuevaAsignatura.grupo.startsWith("T") &&
          evento.grupo.startsWith("T")  && 
          nuevaAsignatura.id !== evento.id 
        ) {
          console.log("entra if gordo");

          //const generatedId = `${nuevaAsignatura.dia} - ${nuevaAsignatura.Siglas} - ${nuevaAsignatura.Grupo} - ${nuevaAsignatura.GrupoLaboratorio} - ${nuevaAsignatura.Clase} - ${nuevaAsignatura.HoraInicio}`;
          
          const buildMessage = (base) => {
            const extras = [];
            if (nuevaAsignatura.profesor === evento.profesor) extras.push("profesor");
            if (nuevaAsignatura.aula === evento.aula) extras.push("aula");
            return extras.length
              ? `${base} ${extras.join(" y ")}`
              : base;
          };

          if (nuevaAsignatura.grupoLaboratorio === "" && evento.grupoLaboratorio === "") {

            const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teóricas");

            setIncidenceOnCreatedAsig(mensaje);
            console.log("id de evento d&d:", nuevaAsignatura.id);
            console.log("id de evento:", evento.id);

            incompatibilities[nuevaAsignatura.id] = mensaje;
            incompatibilities[evento.id] = mensaje;

            console.log("entra primer if", mensaje);
            return true;
          }
    
          if (
            (nuevaAsignatura.grupoLaboratorio === "" && evento.grupoLaboratorio !== "") ||
            (nuevaAsignatura.grupoLaboratorio !== "" && evento.grupoLaboratorio === "")
          ) {

            const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teórica y práctica");
      
            setIncidenceOnCreatedAsig(mensaje);

            console.log("id de evento d&d:", nuevaAsignatura.id);
            console.log("id de evento:", evento.id);

            incompatibilities[nuevaAsignatura.id] = mensaje;
            incompatibilities[evento.id] = mensaje;


            console.log("entra segundo/tercer if", mensaje);
            return true;
          }

          if (nuevaAsignatura.grupoLaboratorio !== "" && evento.grupoLaboratorio !== "" ) {

            const mensaje = buildMessage("Incompatibilidad por coincidencia de");
            const mensajeOriginal = "Incompatibilidad por coincidencia de";

            if(mensaje !== mensajeOriginal){
              setIncidenceOnCreatedAsig(mensaje);

            console.log("id de evento d&d:", nuevaAsignatura.id);
            console.log("id de evento:", evento.id);

            incompatibilities[nuevaAsignatura.id] = mensaje;
            incompatibilities[evento.id] = mensaje;


            console.log("entra cuarto if", mensaje);
            return true;
            } 
          }
        }
      }
    
      return false;
    };

    const checkAllEventsCompatibilities = (eventosFiltrados, previasIdsIncompatibles) => {
      const nuevasIdsIncompatibles = {};
      console.log("incompatibilidades anadidas?:", previasIdsIncompatibles);

      const buildMessage = (base, asignaturaIncompatibilidad, evento) => {
        const extras = [];
        if (asignaturaIncompatibilidad.profesor === evento.profesor) extras.push("profesor");
        if (asignaturaIncompatibilidad.aula === evento.aula) extras.push("aula");
        return extras.length ? `${base} ${extras.join(" y ")}` : base;
      };

      for (const id of Object.keys(previasIdsIncompatibles)) {
        const asignaturaIncompatibilidad = eventosFiltrados.find(ev => ev.id === id);
        if (!asignaturaIncompatibilidad) continue;
    
        const horaInicioNueva = moment(asignaturaIncompatibilidad.start);
        const horaFinNueva = moment(asignaturaIncompatibilidad.end);
    
        let sigueHabiendoIncompatibilidad = false;
    
        for (const evento of eventosFiltrados) {
          if (evento.id === asignaturaIncompatibilidad.id) continue; // Evita comparaciones de la asig incomp consigo misma
    
          const horaInicioEvento = moment(evento.start);
          const horaFinEvento = moment(evento.end);
    
          const mismaFranja = horaInicioNueva.isBefore(horaFinEvento) && horaFinNueva.isAfter(horaInicioEvento);
    
          if (
            mismaFranja &&
            asignaturaIncompatibilidad.grado === evento.grado &&
            asignaturaIncompatibilidad.dia === evento.dia &&
            asignaturaIncompatibilidad.curso === evento.curso &&
            asignaturaIncompatibilidad.grupo === evento.grupo &&
            asignaturaIncompatibilidad.grupo.startsWith("T") &&
            evento.grupo.startsWith("T")
          ) {
            // 👇 Comprobaciones de incompatibilidad exactas a las de checkEventCompatibility:
    
            // 1️⃣ Coincidencia de sesiones teóricas
            if (asignaturaIncompatibilidad.grupoLaboratorio === "" && evento.grupoLaboratorio === "") {
              sigueHabiendoIncompatibilidad = true;
              const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teóricas", asignaturaIncompatibilidad, evento);
              nuevasIdsIncompatibles[asignaturaIncompatibilidad.id] = mensaje;
              nuevasIdsIncompatibles[evento.id] = mensaje;
              break;
            }
    
            // 2️⃣ Coincidencia de sesión teórica con práctica
            if (
              (asignaturaIncompatibilidad.grupoLaboratorio === "" && evento.grupoLaboratorio !== "") ||
              (asignaturaIncompatibilidad.grupoLaboratorio !== "" && evento.grupoLaboratorio === "")
            ) {
              sigueHabiendoIncompatibilidad = true;
              const mensaje = buildMessage("Incompatibilidad por coincidencia de sesiones teórica y práctica", asignaturaIncompatibilidad, evento);
              nuevasIdsIncompatibles[asignaturaIncompatibilidad.id] = mensaje;
              nuevasIdsIncompatibles[evento.id] = mensaje;
              break;
            }
    
            // 3️⃣ Coincidencia de sesiones prácticas con algún otro criterio
            if (asignaturaIncompatibilidad.grupoLaboratorio !== "" && evento.grupoLaboratorio !== "") {
              const mensaje = buildMessage("Incompatibilidad por coincidencia de", asignaturaIncompatibilidad, evento);
              if (mensaje !== "Incompatibilidad por coincidencia de") {
                sigueHabiendoIncompatibilidad = true;
                nuevasIdsIncompatibles[asignaturaIncompatibilidad.id] = mensaje;
                nuevasIdsIncompatibles[evento.id] = mensaje;
                break;
              }
            }
          }
        }
    

      }
      console.log("Incompatibilidades def:", nuevasIdsIncompatibles);
      setAsigIncompatibilitiesIds(nuevasIdsIncompatibles);
    }


    /*const checkEventCompatibility = ({ event, start, end }) => {
        let conflictMessage = "";
        let eventosFiltrados = [];

        if (selectedGrade === "INF") {
            if (selectedCourse === "3º" || selectedCourse === "4º") {
                eventosFiltrados = events.filter(e =>
                    e.grado === selectedGrade &&
                    e.semestre === selectedSemester &&
                    e.curso === selectedCourse &&
                    e.mencion === selectedMention
                );
            } else {
                eventosFiltrados = events.filter(e =>
                    e.grado === selectedGrade &&
                    e.semestre === selectedSemester &&
                    e.curso === selectedCourse &&
                    (!selectedGroup || e.grupo === selectedGroup)
                );
            }
        } else if (selectedGrade === "EST" || selectedGrade === "I + E") {
            eventosFiltrados = events.filter(e =>
                e.grado === selectedGrade &&
                e.semestre === selectedSemester &&
                e.curso === selectedCourse
            );
        } else if (selectedGrade === "Master") {
            eventosFiltrados = events.filter(e =>
                e.grado === selectedGrade &&
                e.semestre === selectedSemester &&
                e.curso === "1º"
            );
        }

        const hasConflict = eventosFiltrados.some((e) => {
            const isSameTime = e.start < end && e.end > start; // Verifica superposición de tiempo
            
            if (isSameTime) {
                console.log("e.profesor: " + e.profesor + " y event.profesor: " + event.profesor)
                console.log("e.aula: " + e.aula + " y event.aula: " + event.aula)
                if(e.id !== event.id && e.profesor === event.profesor && e.aula === event.aula){
                    conflictMessage = `Incompatibilidad horaria, eventos distintos no pueden tener al profesor ${event.profesor} impartiendo al mismo tiempo y usando el mismo aula.`
                    console.log(conflictMessage + "primer if");
                    return true;
                }
                if (e.id !== event.id && e.profesor === event.profesor) {
                    conflictMessage = `Incompatibilidad horaria, eventos distintos no pueden tener al profesor ${event.profesor} impartiendo al mismo tiempo.`;
                    console.log(conflictMessage + "segundo if");
                    return true;
                }
                if (e.id !== event.id && e.aula === event.aula) {
                    conflictMessage = `Incompatibilidad horaria, eventos distintos no pueden emplear el aula ${event.aula} al mismo tiempo.`;
                    console.log(conflictMessage + "tercer if");
                    return true;
                }
                
            }
            return false;
        });
        
        if (hasConflict) {
            setWarningMessage(conflictMessage);
            return false;
        }
        console.log("hay comp")
        return true;
    };*/

    return(
        <>
            <div className="creacion-horarios">
                <div className="creacion-horarios-cerrar-sesion">
                    <LogoutButton color={`#edbeba`} text={`Cerrar sesión`} iconName={`arrow alternate circle left outline`}/>
                </div>
                <div className="creacion-horarios-menu-y-horario">
                    <FloatingFilterScheduleMenu
                    selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade}
                    selectedSemester={selectedSemester} setSelectedSemester={setSelectedSemester}
                    selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}
                    selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}
                    selectedMention={selectedMention} setSelectedMention={setSelectedMention}
                    warningMessage={warningMessage} setSave={setSave} setExportPDF={setExportPDF}
                    asigCode={asigCode} setAsigCode={setAsigCode} asigInitials={asigInitials}
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
                    asigIncidences={asigIncidences} setAsigIncidences={setAsigIncidences} incidenceOnCreatedAsig={incidenceOnCreatedAsig} 
                    setIncidenceOnCreatedAsig={setIncidenceOnCreatedAsig} createAsig={createAsig} setCreateAsig={setCreateAsig}
                    clearFormulary={clearFormulary} setClearFormulary={setClearFormulary} setOpenFile={setOpenFile}
                    />
                    <div className="creacion-horarios-horario" id="creacion-horarios-horario">
                        <div className="creacion-horarios-horario-cabeceraDocumento" id="creacion-horarios-horario-cabeceraDocumento">
                            <h2 className="creacion-horarios-horario-textoGrado">
                            {getTextoGrado()}
                            </h2>
                            <h2 className="creacion-horarios-horario-textoCursoMencion">
                            {getTextoCursoMencion()}
                            </h2>
                            <div className="creacion-horarios-horario-horario">                        
                                <div className="creacion-horarios-horario-calendarioContainer" style={{ flexGrow: 1 }}>
                                    <DndProvider backend={HTML5Backend}>
                                        <DnDCalendar
                                            localizer={localizer}
                                            events={filteredAsigs}
                                            startAccessor="start"
                                            endAccessor="end"
                                            views={{ week: true }}
                                            defaultView={Views.WEEK}
                                            toolbar={false}
                                            style={{ 
                                                height: exportPDF ? "1000px" : "1000px",  // Si se exporta, reducimos altura
                                                width: "100%", 
                                                backgroundColor: "#ffffff", // Un gris claro para suavizar la interfaz
                                                borderRadius: "10px", // Bordes más redondeados
                                                padding: "10px", // Espaciado interno
                                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Sombra ligera para destacar
                                            }}
                                            defaultDate={(() => {     // Por alguna razon esto es necesario porque si es 
                                                                    // domingo no se muestran los eventos en el calendario (?)
                                            const today = new Date();
                                            const dayOfWeek = today.getDay();
                                            if (dayOfWeek === 0) {
                                                // Si hoy es domingo, mover la vista al lunes pasado
                                                return new Date(today.setDate(today.getDate() - 6));
                                            } else if (dayOfWeek === 6) {
                                                // Si hoy es sábado, mover la vista al lunes pasado
                                                return new Date(today.setDate(today.getDate() - 5));
                                            }
                                            return today;
                                            })()}
                                            min={new Date(2023, 0, 1, 8, 0)}
                                            max={new Date(2023, 0, 1, 21, 0)}
                                            showCurrentTimeIndicator={false}
                                            dayLayoutAlgorithm="no-overlap"

                                            formats={{
                                            dayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture),
                                            weekdayFormat: (date, culture, localizer) => localizer.format(date, "dddd", culture)
                                            }}

                                            components={{
                                            event: CustomAdminCalendarEvent,
                                            }}

                                            // Utiliza la propiedad `eventPropGetter` para controlar qué días mostrar
                                            dayPropGetter={(date) => {
                                            const dayOfWeek = date.getDay();
                                            // Devuelve un estilo especial para los días no deseados (sábado o domingo)
                                            if (dayOfWeek === 0 || dayOfWeek === 6) {
                                                return {
                                                style: {
                                                    display: 'none',

                                                },
                                                };
                                            }
                                            return {}; // Deja los días lunes a viernes como están
                                            }}

                                            eventPropGetter={(event) => {
                                            return {
                                                style: {
                                                backgroundColor: event.color, // Color del JSON
                                                color: "#000", // Ajusta el color del texto si es necesario
                                                borderRadius: "8px", // Bordes redondeados
                                                border: "1px solid rgba(0, 0, 0, 0.2)", // Borde ligero para contraste
                                                marginLeft: 5, // Centra el elemento en la celda
                                                }
                                            };
                                            }}

                                            onEventDrop={onEventDrop}
                                            resizable
                                            onEventResize={onEventResize}
                                            onSelectEvent={handleEventSelect}
                                        />
                                    </DndProvider>
                                    
                                    </div>
                                </div>


                                <div className="creacion-horarios-horario-asignaturasHorario">
                                  {filteredAsigs.length > 0 ? (
                                    // Obtener pares únicos de siglas y nombre
                                    [...new Map(
                                      events
                                        .filter(evento => filteredAsigs.some(f => f.siglas === evento.siglas && f.nombre === evento.nombre))
                                        .map(evento => [evento.siglas, evento.nombre])
                                    )].map(([sigla, nombre]) => (
                                      <div key={sigla} className="creacion-horarios-asignaturaItem">
                                        <p className="creacion-horarios-siglasAsignatura">{sigla}:</p>
                                        <p className="creacion-horarios-nombreCompletoAsignatura">{nombre}</p>
                                      </div>
                                    ))
                                  ) : null}
                                </div>


                            </div>
                        </div> 
                    </div>
            </div>

            {eventClicked && (
                <div className="overlay">
                    <>
                    <ModifyCalendarEvent event={selectedEvent} backgroundColor={selectedEvent.color} setEventClicked={() => {
                            setEventClicked(false);
                        }} 
                        asigCodeMod={asigCodeMod}
                        setAsigCodeMod={setAsigCodeMod}
                        asigInitialsMod={asigInitialsMod}
                        setAsigInitialsMod={setAsigInitialsMod}
                        asigDayMod={asigDayMod}
                        setAsigDayMod={setAsigDayMod}
                        asigPossibleDays={asigPossibleDays}
                        asigStartTimeMod={asigStartTimeMod}
                        setAsigStartTimeMod={setAsigStartTimeMod}
                        asigStartTimes={asigStartTimes}
                        asigColorMod={asigColorMod}
                        setAsigColorMod={setAsigColorMod}
                        asigPossibleColors={asigPossibleColors}
                        asigFullNameMod={asigFullNameMod}
                        setAsigFullNameMod={setAsigFullNameMod}
                        asigSemesterMod={asigSemesterMod}
                        setAsigSemesterMod={setAsigSemesterMod}
                        asigPossibleSemesters={asigPossibleSemesters}
                        asigGroupNumberMod={asigGroupNumberMod}
                        setAsigGroupNumberMod={setAsigGroupNumberMod}
                        asigPossibleGroupNumbers={asigPossibleGroupNumbers}
                        asigLabGroupMod={asigLabGroupMod}
                        setAsigLabGroupMod={setAsigLabGroupMod}
                        asigGroupTypeMod={asigGroupTypeMod}
                        setAsigGroupTypeMod={setAsigGroupTypeMod}
                        asigPossibleGroupType={asigPossibleGroupType}
                        asigDurationMod={asigDurationMod}
                        setAsigDurationMod={setAsigDurationMod}
                        asigClassMod={asigClassMod}
                        setAsigClassMod={setAsigClassMod}
                        asigPossibleClasses={asigPossibleClasses}
                        asigCourseGII_ISMod={asigCourseGII_ISMod}
                        setAsigCourseGII_ISMod={setAsigCourseGII_ISMod}
                        asigCourseGII_TIMod={asigCourseGII_TIMod}
                        setAsigCourseGII_TIMod={setAsigCourseGII_TIMod}
                        asigCourseGII_COMod={asigCourseGII_COMod}
                        setAsigCourseGII_COMod={setAsigCourseGII_COMod}
                        asigCourse_ESTMod={asigCourse_ESTMod}
                        setAsigCourse_ESTMod={setAsigCourse_ESTMod}
                        asigCourse_INDatMod={asigCourse_INDatMod}
                        setAsigCourse_INDatMod={setAsigCourse_INDatMod}
                        asigCourse_MasterMod={asigCourse_MasterMod}
                        setAsigCourse_MasterMod={setAsigCourse_MasterMod}
                        asigPossibleCourses={asigPossibleCourses}
                        asigTeacherMod={asigTeacherMod}
                        setAsigTeacherMod={setAsigTeacherMod}
                        asigPossibleTeacherOptions={asigPossibleTeacherOptions}
                        asigIncidencesMod={asigIncompatibilitiesIds}
                        setAsigIncidencesMod={setAsigIncompatibilitiesIds}
                        setModifyAsig={setModifyAsig}
                        setDeleteAsig={setDeleteAsig}/>
                    </>   
                 </div>
            )}
        </>
    )
}

export default ScheduleCreation;