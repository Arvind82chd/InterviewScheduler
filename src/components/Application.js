import React, {useEffect, useState} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "./Appointment";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay  } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id], interview: { ...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
    console.log(id, interview);

    const putRequest = axios.put(`/api/appointments/${appointment.id}`, {interview})
    .then(response => {
      setState({
        ...state,
        appointments
      });
        return response;
      })
      .catch((e) => console.log(e));
      return putRequest;
  }

  function deleteData(id, interview) {
    const appointment = {
      ...state.appointments[id], interview: null
    }
    return axios.delete(`/api/appointments/${id}`)
  }
// console.log(bookInterview);
  
  // const {bookInterview} = bookInterview(props.id, props.interview);


  //console.log("props: -----" , props);
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = appointments.map((appointment) => { 
    const interview = getInterview(state, appointment.interview);
    
    //console.log('--------',book, state.day, state.interviewers);
    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      bookInterview={bookInterview}
      interviewers={interviewers}
      //{...appointment}
      />
      );
    
  })

  const setDay = day => setState({ ...state, day });
  
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
console.log("state.interv: ",state.interviewers);

 
  return (
    <main className="layout">
      <section className="sidebar">
            <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
         days={state.days}
         value={state.day}
         onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule" > 
      {schedule}
  
       
      </section>
    </main>
  );
}
