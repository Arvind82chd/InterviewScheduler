import { useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData() {

  const setDay = day => setState({ ...state, day });
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    spots: 5,
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(response => {
      setState(prev => ({ ...prev, 
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
        
      }))
      
    });
    }, []);

    function updateSpots (actionType) {
      const days = state.days.map(day => {
        if (day.name === state.day) {
          console.log(actionType)

          if (actionType === "NEW_APPOINTMENT") {
            return { ...day, spots: day.spots - 1 }
          } 
          else if (actionType === "DELETE_APPOINTMENT") {
            return { ...day, spots: day.spots + 1 }
          }
          
        } 
          return { ...day };
      })
      return days;
    }

    function bookInterview(id, interview, actionType) {
      const appointment = {
        ...state.appointments[id], interview: { ...interview}, 
      };
   
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
    
      const putRequest = axios.put(`/api/appointments/${appointment.id}`, {interview})
      .then(response => {
        const days = updateSpots(actionType)
        setState({
          ...state,
          appointments, 
          days 
        });
          return response;
        })
        return putRequest;
    }


    function cancelInterview(id, actionType) {
      const appointment = {
        ...state.appointments[id], interview: null
      }

      const appointments = {
        ...state.appointments, 
        [id]: appointment
      }
  
      const deleteRequest = axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const days = updateSpots(actionType)
        setState({...state, 
          appointments, 
          days 
        });
        return response;
    })
      return deleteRequest;
    }
  return {
    state, setDay, bookInterview, cancelInterview
  };
}

