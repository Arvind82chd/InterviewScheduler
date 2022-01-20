import React from 'react';
import "./InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList (props) {

  const {interviewers, setInterviewer} = props;

  // const interviewerData = interviewers.map((interviewer) => {return (<InterviewerListItem {...interviewer}} selected={interviewer.id === props.interviewer} setInterviewer={setInterviewer}/>
  // )});
  const interviewerData = interviewers.map((interviewer) => 
  {return (<InterviewerListItem name={interviewer.name} avatar={interviewer.avatar} selected={interviewer.id === props.interviewer} setInterviewer={(event) => props.setInterviewer(interviewer.id)}/>
  )});

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">
      {interviewerData}
    </ul>
  </section>
  );
}