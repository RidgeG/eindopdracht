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

const BigCalendarComponent = ({ events, view, date, onSelectEvent }) => {
    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                views={['month', 'week', 'day', 'agenda']}
                defaultView={view}
                date={date}
                onSelectEvent={onSelectEvent}
                messages={{
                    noEventsInRange: "Geen taken gevonden"
                }}
            />
        </div>
    );
};

export default BigCalendarComponent;