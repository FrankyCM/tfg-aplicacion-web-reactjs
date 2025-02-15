import './CalendarEvent.css'

export const CalendarEvent = ({evento}) => {
    return (
        <div>
            <strong>{evento.siglas}</strong>
            <span>{evento.grupo} - {evento.aula}</span>
        </div>
    )
}
