import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function Calendar() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getEventsHandler = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_meals', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const schedule = response.data.Schedule;
                const transformedEvents = schedule.map(item => ({
                    title: item.name,
                    start: item.date
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.log(error);
            }
        };
        getEventsHandler()
    }, []);

    return (
        <div className='calendar-container'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
            />
        </div>
    );
}

export default Calendar;
