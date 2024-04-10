import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import EventService from '../service/EventService'

function ListEventComponent() {
    const [rf_events, setEvents] = useState([]);
    const navigate = useNavigate(); // Use useNavigate hook to get navigate function

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const res = await EventService.getAllEvents();
                const sortedEvents = res.data.sort((a, b) => a.company.localeCompare(b.company));
                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        }

        fetchEventDetails();
    }, []);

    const createEvent = () => {
        console.log("Create Event button clicked!");
        navigate(`/create`);
    }

    const getSingleEvent = (id) => {
        console.log("View Event button clicked!");
        navigate(`/${id}`);
    }

    const updateEvent = (id) => {
        console.log("Update Event button clicked!");
        console.log(id);
        navigate(`/create/${id}`);
    }

    const deleteEvent = (id) => {
        EventService.deleteEvent(id)
            .then(res => {
                setEvents(rf_events.filter(event => event.id !== id));
            });
    }

    return (
        <div>
            <h2>Event List</h2>
            <div>
                <button onClick={createEvent}> Add Event</button>
            </div>
            <br></br>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th> Event Name</th>
                            <th> Event Company</th>
                            <th> Event Description</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rf_events.map(event =>
                                <tr key={event.id}>
                                    <td> {event.name} </td>
                                    <td> {event.company}</td>
                                    <td> {event.description}</td>
                                    <td>
                                        <button onClick={() => updateEvent(event.id)}>Update </button>
                                        <button onClick={() => deleteEvent(event.id)}>Delete </button>
                                        <button onClick={() => getSingleEvent(event.id)}>View </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListEventComponent;
