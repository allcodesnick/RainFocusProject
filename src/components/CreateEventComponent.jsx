import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventService from '../service/EventService';

function CreateEventComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        name: '',
        company: '',
        description: '',
        color: ''
    });

    useEffect(() => {
        console.log("ID:", id);
        const fetchEventDetails = async () => {
            try {
                if (id) {
                    const response = await EventService.getSingleEvent(id);
                    setEventData(response.data); // Set the state with retrieved data
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
    
        fetchEventDetails();
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value
        });
    };

    const saveOrUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update event if id is provided
                await EventService.updateEvent(eventData, id);
            } else {
                // Create event if no id is provided
                await EventService.createEvent(eventData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving/updating event:', error);
        }
    };

    const cancel = () => {
        navigate('/');
    };

    const getTitle = () => {
        return id ? <h3>Update Event</h3> : <h3>Add Event</h3>;
    };

    return (
        <div>
            {getTitle()}
            <form onSubmit={saveOrUpdateEvent}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={eventData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={eventData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Save'}</button>
                <button type="button" onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
}

export default CreateEventComponent;
