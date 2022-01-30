import React from 'react';
import "./InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

// class Greeting extends React.Component {
//   render() {
//     return (
//       <h1>Hello, {this.props.name}</h1>
//     );
//   }
// }

// Greeting.propTypes = {
//   name: PropTypes.string
// };

function InterviewerList (props) {

  //const {interviewers, setInterviewer} = props;

  const {interviewers, value, onChange} = props;
  // const interviewerData = interviewers.map((interviewer) => {return (<InterviewerListItem {...interviewer}} selected={interviewer.id === props.interviewer} setInterviewer={setInterviewer}/>
  // )});
  const interviewerData = interviewers.map((interviewer) => 
  {return (
  <InterviewerListItem 
    key={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    // selected={interviewer.id === props.interviewer}
    selected={interviewer.id === value} 
    setInterviewer={() => onChange(interviewer.id)}
    // setInterviewer={(event) => props.setInterviewer(interviewer.id)}
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

// <script>
//   function displayInterviewer() {
//     const currentInterviewer = document.querySelector("#interviewer-list").value;
//     document.querySelector("#interviewer-output").innerHTML = `The currently selected interviewer is: <strong>${currentInterviewer}</strong`;
//   }
// </script>

// <p>Select an interviewer from the list.</p>

// <select id="interviewer-list" onchange="displayInterviewer()">
//   <option value="Sylvia Palmer">Sylvia Palmer</option>
//   <option value="Tori Malcolm">Tori Malcolm</option>
//   <option value="Mildred Nazir">Mildred Nazir</option>
//   <option value="Cohana Roy">Cohana Roy</option>
//   <option value="Sven Jones">Sven Jones</option>
// </select>

// <p id="interviewer-output">The currently selected interviewer is:</p>

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;