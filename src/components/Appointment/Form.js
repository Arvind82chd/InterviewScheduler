import React, {useState} from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';
import "./styles.scss";

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() { 
    if (student || interviewer) {
      setStudent("") 
      setInterviewer(null);
    }
  }

  function cancel () {
    if (props.onCancel) {
      props.onCancel()
      reset();
    }
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(student, interviewer);
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
          value={student} ///???????
          onChange={(event) => setStudent(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
        value={interviewer}
        setInterviewer={props.interviewer}
        interviewers={props.interviewers}
        onChange={setInterviewer}
        /* your code goes here */
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  );
}

