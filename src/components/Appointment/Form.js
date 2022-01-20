import React from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import "./styles.scss";

export default function Form (props) {
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          onSubmit={props.student}
          /*
            This must be a controlled component
            your code goes here
          */
        />
      </form>
      <InterviewerList 
        interviewer={props.interviewer}
        interviewers={props.interviewers}
        /* your code goes here */
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  );
}

// add("Edit Form", () => 
//   <Form 
//   student="A"
//   interviewer={interviewers.id}
//   interviewers={interviewers}
//   onSave={action("onSave")}
//   onCancel={action("onCancel")}
// />)


// .add("Create Form", () => 
//   <Form 
//   interviewers={interviewers}
//   onSave={action("onSave")}
//   onCancel={action("onCancel")}