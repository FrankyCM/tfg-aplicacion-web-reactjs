import ImageContainer from './ImageContainer'
import './IntroSection.css'
import './Common.css'
import { TypeVisualIntroSection } from './TypeVisualIntroSection'

const IntroSection = () => {
    return(
        <>
            <div className = "contenido-seccion-introduccion">
                <div className = "contenido-cabecera">
                    <ImageContainer bgColor="#red" picturePath={`/LogoRojoEscuela-288x300.png`} size={`tiny`} isCircular={false}/>
                    <p>Escuela de Ingeniería Informática</p>
                </div>
                <div className = "contenido-introduccion">
                    <p>Bienvenido a la aplicación web destinada a la visualización de horarios en nuestra facultad de Ingeniería Informática ubicada en el campus Miguel Delibes. Este proyecto sin ánimo de lucro ha sido desarrollado con la intención de simplificar la organización de la vida universitaria de cada uno de los estudiantes de nuestra facultad, en base a los horarios, de una manera más interactiva. A continuación se detallan las opciones de visualización que son ofrecidas.</p>
                    <div className= "texto-cursiva">
                        <p>Recuerda, no hay mejor aliado que una planificación sensata y temprana</p>
                        <p>- Fran</p>
                    </div>
                </div>
                <div className = "contenido-seccion-tipo-visualizacion">
                    <TypeVisualIntroSection visualizationType={"Visualización de horario genérica"} visualizationTypeDescription={"Esta sección ofrece la visualización de horarios de manera genérica, compuesto por una selección de asignaturas adaptadas a los criterios del alumno y separados en los distintos cursos o menciones de cada grado."} link="/horarios-genericos"></TypeVisualIntroSection>
                    <TypeVisualIntroSection visualizationType={"Visualización de horario personalizada"} visualizationTypeDescription={"Esta sección ofrece la visualización de un horario personalizado, formado por una selección de asignaturas a elección del alumno, pudiendo crear horarios adaptados a sus necesidades."} link="/horarios-personalizados"></TypeVisualIntroSection>
                </div>
                

            </div>
        
        </>
    )
}

export default IntroSection;