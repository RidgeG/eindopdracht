import React from 'react';
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
    const eventStyleGetter = (event) => {
        let backgroundColor = '#4f46e5';
        if (event.category === 'werk') backgroundColor = '#ef4444';
        if (event.category === 'boodschappen') backgroundColor = '#10b981';
        if (event.category === 'huishouden') backgroundColor = '#f59e0b';

        return { style: { backgroundColor } };
    };

    const CustomEvent = ({ event }) => (
        <div>
            <strong>{event.title}</strong>
            {event.category === 'werk' && (
                <div style={{ fontSize: '0.8em' }}>
                    {format(new Date(event.reminderDate), 'dd/MM HH:mm')}
                </div>
            )}
        </div>
    );

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={view}
                views={['month', 'week', 'day', 'agenda']}
                date={date}
                onNavigate={onNavigate}
                onSelectEvent={onSelectEvent}
                style={{ height: 600 }}
                eventPropGetter={eventStyleGetter}
                components={{ event: CustomEvent }}
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