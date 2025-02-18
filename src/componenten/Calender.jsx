import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./Calender.css"

function Calender() {
    const [date, setDate] = useState(new Date());



    return (
        <div className='app'>
            <h1 className='text-center'>React Calendar</h1>
            <div className='calendar-container'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    defaultView={"month"}
                    minDate={new Date()}
                    maxDetail="year"
                    nextLabel='month>>'
                    nextAriaLabel='Go to next month'
                    next2Label='year>>'
                    next2AriaLabel='Go to next year'
                    prevLabel='<<month'
                    prevAriaLabel='Go to prev month'
                    prev2Label='<<year'
                    prev2AriaLabel='Go to prev year'
                />
            </div>
            <p className='text-center'>
                <span className='bold'>Selected Date:</span>{' '}
                {date.toDateString()}
            </p>
        </div>
    );

}

export default Calender;