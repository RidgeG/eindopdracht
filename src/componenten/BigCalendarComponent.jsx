import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const BigCalendarComponent = ({ view, date, events, onSelectEvent, onNavigate }) => {
    return (
        <div>
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
                style={{ height: 500 }}
            />
        </div>
    );
};

export default BigCalendarComponent;