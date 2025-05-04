import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const BigCalendarComponent = ({ view, date, events, onSelectEvent, onNavigate }) => {
    const [localDate, setLocalDate] = useState(date || new Date());

    const handleNavigate = (newDate) => {
        setLocalDate(newDate);
        if(onNavigate) onNavigate(newDate);
    };

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={view}
                views={['month', 'week', 'day', 'agenda']}
                date={localDate}
                onNavigate={handleNavigate}
                onSelectEvent={onSelectEvent}
                style={{ height: 600 }}
                messages={{
                    noEventsInRange: "Geen taken gevonden voor deze periode."
                }}
            />

            {events.length === 0 && (
                <div className="empty-calendar-hint">
                    <p>🗓️ Klik op "+ Nieuwe Taak" om taken toe te voegen</p>
                </div>
            )}
        </div>
    );
};

export default BigCalendarComponent;