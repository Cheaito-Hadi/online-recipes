import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import './styles.css'

function Calendar() {
    const [events, setEvents] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealDate, setMealDate] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
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
    const addMeal = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add_meal', {
                name: mealName,
                date: mealDate
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data);
            fetchEvents();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='calendar-container'>
            <div className="add-meal">
                Meal Name: <input placeholder="Enter your meal here" value={mealName} onChange={e => setMealName(e.target.value)} />
                Enter the date: <input type="date" value={mealDate} onChange={e => setMealDate(e.target.value)} />
                <button onClick={addMeal}>Add Meal</button>
            </div>
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
