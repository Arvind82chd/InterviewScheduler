import React from 'react';
import "./InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';


function InterviewerList (props) {


  const {interviewers, value, onChange} = props;

  const interviewerData = interviewers.map((interviewer) => 
  {return (
  <InterviewerListItem 
    key={interviewer.id} 
    id={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === value} 
    setInterviewer={() => onChange(interviewer.id)}
  
  />
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


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;