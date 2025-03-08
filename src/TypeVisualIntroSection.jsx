import './TypeVisualIntroSection.css'
import IntroButton from './IntroButton'

export const TypeVisualIntroSection = ({visualizationType, visualizationTypeDescription}) => {
    return(
        <div className="contenido-informativo-tipo-visualizacion">
            <div className="tipo-visualizacion">
                <p>{visualizationType}</p>
            </div>
            <div className="detalle-tipo-visualizacion">
                <p>{visualizationTypeDescription}</p>
            </div>
            <div>
                <IntroButton text={"Acceder"}/>
            </div>
        </div>
    )
}