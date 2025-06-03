// CustomAdminCalendarEvent.jsx
import { AdminCalendarEvent } from "./AdminCalendarEvent";
import React from 'react';

export const CustomAdminCalendarEvent = ({extraProps}) => {
    return (props) => (
        <AdminCalendarEvent
            {...props}
            {...extraProps} // Pasamos props adicionales como funciones o estados
        />
    );
};