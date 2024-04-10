import axios from "axios";

const Event_API_BASE_URL = "https://rf-json-server.herokuapp.com";

class EventService {
  getAllEvents() {
    return axios.get(Event_API_BASE_URL + "/"+ "events");
  }

  createEvent(rf_event) {
    return axios.post(Event_API_BASE_URL + "/events/", rf_event);
  }

  getSingleEvent(id) {
    return axios.get(Event_API_BASE_URL + "/events/" + id);
  }

  updateEvent(rf_event, id) {
    return axios.put(Event_API_BASE_URL + "/events/" + id, rf_event);
  }

  deleteEvent(id) {
    return axios.delete(Event_API_BASE_URL + "/events/" + id);
  }
}

export default new EventService();
