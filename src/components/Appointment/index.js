import React, { useState } from 'react';
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
  const [ actionType, setActionType ] = useState('');

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview, actionType) 
    .then(() => transition(SHOW))
    .catch((e) => transition(ERROR_SAVE, true))
  }

  function del() {
    transition(DELETE, true)
    
    props.delete(props.id, actionType)
    .then(() => transition(EMPTY))
    .catch((e) => transition(ERROR_DELETE, true)) 
  }
  
   function confirm() {
    transition(CONFIRM)
   }

   function edit() {
    setActionType('EDIT_APPOINTMENT') 
    transition(EDIT)
     
   }

   function add() {
     setActionType('NEW_APPOINTMENT')
    transition(CREATE)
   }

   function handleDelete () {
    setActionType('DELETE_APPOINTMENT')
    confirm()
   }

  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={add} /> }
      {mode === SHOW && (
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={handleDelete}
        onEdit={edit}
        /> 
      )}
      {mode === CREATE && 
      <Form 
      student={props.student}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
      {mode === SAVING && <Status message="SAVING"/>}
      {mode === DELETE && <Status message="DELETING"/>}
      {mode === CONFIRM && <Confirm onConfirm={del} onCancel={back} message="Are you sure of deleting this?"/>}
      {mode === EDIT && <Form 
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />}
      {mode === ERROR_SAVE && <Error message="Not Saved" onClose={back}
      />}
      {mode === ERROR_DELETE && <Error message="Not Deleted" onClose={back}/>}
      </article>
  );
}
