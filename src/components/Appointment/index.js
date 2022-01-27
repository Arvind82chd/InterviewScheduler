import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';

export default function Appointment (props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY)
  //console.log('props ----',props);
  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((e) => console.log(e));
    //transition(SHOW);
  }

  function del(id) {
    props.delete(id)
    .then(() => transition(EMPTY))
    .catch((e) => console.log(e))
  }

  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW && (
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        /> 
      )}
      {mode === CREATE && 
      <Form 
      student={props.student}
      interviewer={props.key}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
      {mode === SAVING && <Status message="SAVING"/>}
      {mode === DELETE && <Status message="DELETING"/>}
      </article>
  );
}
