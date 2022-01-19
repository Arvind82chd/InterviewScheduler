import React from 'react';
import DayListItem from './DayListItem';


export default function DayList (props) {
  const {days, day, setDay} = props;
  const dayData = days.map((day, index) => <DayListItem key={day.id} {...day} day={props.day} setDay={setDay} selected={props.days[index].name === props.day} />);

  return (
  <ul>
    {dayData}
  </ul>
  );
}