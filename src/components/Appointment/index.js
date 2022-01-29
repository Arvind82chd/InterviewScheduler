import React from 'react';
import "./styles.scss"
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';

export default function Appointment (props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
    .catch((e) => transition(ERROR_SAVE, true))//console.log(e));
    //transition(SHOW);
  }

  function del() {
    //console.log(props.id)
    transition(DELETE)
    //console.log(props.delete(props.id))
    props.delete(props.id)
    .then(() => transition(EMPTY))
    .catch((e) => transition(ERROR_DELETE, true)) //console.log(e))
  }
  
   function confirm() {
    transition(CONFIRM, true)
   }

   function edit() {
     transition(EDIT, true)
    // console.log('---->',props.interview.interviewer)
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
        onDelete={confirm}
        //onConfirm={del}
        onEdit={edit}
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
      {mode === CONFIRM && <Confirm onConfirm={del} onCancel={back} message="Are you sure of deleting this?"/>}
      {mode === EDIT && <Form 
      student={props.interview.student}//{props.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
      {mode === ERROR_SAVE && <Error message="Not Saved" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Not Deleted" onClose={back}/>}
      </article>
  );
}
