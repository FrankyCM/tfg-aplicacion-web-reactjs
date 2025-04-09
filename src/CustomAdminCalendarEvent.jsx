// CustomAdminCalendarEvent.jsx
import { AdminCalendarEvent } from "./adminCalendarEvent";

export const CustomAdminCalendarEvent = ({extraProps}) => {
    return (props) => (
        <AdminCalendarEvent
            {...props}
            {...extraProps} // Pasamos props adicionales como funciones o estados
        />
    );
};