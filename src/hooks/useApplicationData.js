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

    // function calculateSpots(id, days, add = true) {
    //   //const dayId = null
    //   const dayId = Math.floor(id / 5)
    //   console.log(dayId)
    //   const day = days[dayId - 1]
    //   if (add) {
    //     return day.spots += 1;
    //   } 
    //     return day.spots -= 1;

    // }
   

    function updateSpots (actionType) {
      const days = state.days.map(day => {
        if (day.name === state.day) {
          if (actionType === "bookAppointment") {
            return { ...day, spots: day.spots - 1 }
          } 
            return { ...day, spots: day.spots + 1 }
          
        } else return { ...day };
      })
      return days;
    }

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id], interview: { ...interview}, 
      };
      // const spots = {
      //   ...state.days,
      //   spots: calculateSpots(id, state.days)
      // }
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({...state, appointments});
    //   console.log('id & interview ----',id, interview);
    //  console.log('apps----',appointment.id)
      const putRequest = axios.put(`/api/appointments/${appointment.id}`, {interview})
      .then(response => {
        const days = updateSpots("bookAppointment")
        setState({
          ...state,
          appointments, 
          days //spots
        });
          return response;
        })
       // .catch((e) => console.log(e));
        return putRequest;
    }


    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id], interview: null
      }

      const appointments = {
        ...state.appointments, 
        [id]: appointment
      }
      // const spots = {
      //   ...state.days,
      //   spots: calculateSpots(id, state.days, false)
      // }
      
      //setState({...state, appointments})
      const deleteRequest = axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const days = updateSpots()
        setState({...state, 
          appointments, 
          days //spots
        });
        return response;
    })
      //.catch((e) => console.log(e))
      return deleteRequest;
    }


  return {
    state, setDay, bookInterview, cancelInterview
  };


}

