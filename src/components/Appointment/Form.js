import React, {useState} from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import "./styles.scss";

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() { 
    if (student || interviewer) {
      setStudent("") 
      setInterviewer(null);
    }
  }

  function cancel () {
    if (props.onCancel) {
      reset();
    }
  }


  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          
          /* 
            This must be a controlled component
            your code goes here
          */
        />
      </form>
      <InterviewerList 
        value={interviewer}
        // interviewer={props.interviewer}
        interviewers={props.interviewers}
        onChange={setInterviewer}
        /* your code goes here */
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
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