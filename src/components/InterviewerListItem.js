import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem (props) {

  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});

  function showName () {
    if (props.selected) {
      return props.name;
    }
  }

  return (
  // <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
    <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {showName()}
  </li>
  );
}