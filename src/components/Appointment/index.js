import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment (props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY)
  console.log('props ----',props);
  

  function save(name, interviewer) {
    console.log("++++++++",interviewer, name)
    const interview = {
      student: name,
      interviewer
    };
  
    props.bookInterview(props.id, interview)
    // .then(() => transition(SHOW))
    // .catch((e) => console.log(e));
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW && ( (props.interview) ?
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        /> : null
      )}
      {mode === CREATE && 
      <Form 
      student={props.student}
      interviewer={props.key}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
      {/* {(props.interview) ? 
      <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      /> : 
      <Empty /> } */}
      </article>
  );
}
