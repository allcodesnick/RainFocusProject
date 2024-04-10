import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate hook

import EventService from '../service/EventService';


function ViewEventComponent() {
    const [rf_event, setEvents] = useState([]);
    const navigate = useNavigate(); // Use useNavigate hook to get navigate function
    const { id } = useParams(); // Fetch id from URL parameters



    useEffect(() => {
        // Use a separate function to fetch the event details
        const fetchEventDetails = async () => {
            try {
                const response = await EventService.getSingleEvent(id);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        // Call the fetchEventDetails function
        fetchEventDetails();
    }, [id]);

      const cancel = () => {
        navigate('/');
    }

    return(
        <div>
            <br></br>
                <div>
                    <h3> View Event Details</h3>
                    <div>
                        <div>
                            <label> Event Name: </label>
                            <div> { rf_event.name }</div>
                        </div>
                        <div>
                            <label> Event Comany: </label>
                            <div> { rf_event.company }</div>
                        </div>
                        <div>
                            <label> Event Description: </label>
                            <div> { rf_event.description }</div>
                        </div>
                        <div>
                            <label> Event Color: </label>
                            <div> { rf_event.color }</div>
                        </div>
                        <div>
                            <label> Event email: </label>
                            <div> { rf_event.email }</div>
                        </div>
                        <div>
                            <label> Event Phone: </label>
                            <div> { rf_event.phone }</div>
                        </div>
                        <div>
                            <label> Event Address: </label>
                            <div> { rf_event.address }</div>
                        </div>
                        <div>
                            <label> Event image: </label>
                            <div> { rf_event.image }</div>
                        </div>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                </div>
        </div>
    )
}

export default ViewEventComponent