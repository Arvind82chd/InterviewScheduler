import React from 'react';
import DayListItem from './DayListItem';


export default function DayList (props) {
  const {days, day, setDay} = props;
  const dayData = days.map(day => <DayListItem key={day.id} {...day} day={props.day} setDay={setDay} />);

  return (
  <ul>
    {dayData}
  </ul>
  );
}