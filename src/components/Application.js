import React, {useEffect, useState} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "./Appointment";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";



const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];



export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //console.log("props: -----" , props);
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => { 
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      //{...appointment}
      />
      );
    
  })
   

  const setDay = day => setState({ ...state, day });
  
  //const setDays = days => setState(prev => ({ ...prev, days }));//setState({ ...state, days})
  
  useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get(`http://localhost:8001/api/appointments`),
    axios.get(`http://localhost:8001/api/interviewers`)
  ]).then(response => {
    //console.log("response: ",response);
    //console.log(response[2].data);
    setState(prev => ({ ...prev, 
      days: response[0].data,
      appointments: response[1].data,
      interviewers: response[2].data,
      
    }))
    
  });
}, []);
console.log("state.interv: ",state.interviewers);
  
  // useEffect(() => {
  //   const URL = `http://localhost:8001/api/days`
  //   axios.get(URL).then(response => { 
  //    setDays([...response.data]);
  //   });
  // }, []);

 
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
          // days={days}
          // value={day}
          // onChange={setDay}
        />
        {/* <DayList
          days={days}
          day={day}
          setDay={setDay}
        /> */}
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
