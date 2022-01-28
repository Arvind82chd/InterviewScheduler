import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment (props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
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
    // const interview = {

    // }
    transition(DELETE)
    props.delete(id)
    .then(() => transition(EMPTY))
    .catch((e) => console.log(e))
  }
  
   function confirm(id) {
    transition(CONFIRM)
    if (props.onConfirm) {
      del(id)
    } else transition(SHOW);
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
        onDelete={del}
        onConfirm={confirm}
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
      {mode === CONFIRM && <Confirm onConfirm={confirm}/>}
      </article>
  );
}
