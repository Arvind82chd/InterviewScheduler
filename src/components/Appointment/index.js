import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';



export default function Appointment (props) {
  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {(props.interview) ? 
      <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      /> : 
      <Empty /> }
      </article>
  );
}



{/* <Fragment>
    <Appointment
      id={1}
      time="4pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment time="5pm" />
  </Fragment> */}