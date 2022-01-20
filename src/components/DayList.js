import React from 'react';
import DayListItem from './DayListItem';


export default function DayList (props) {
  const {days, value, onChange} = props;
  const dayData = days.map((day) => 
  <DayListItem 
    key={day.id}  
    name={day.name} 
    spots={day.spots} 
    selected={day.name === value} 
    setDay={onChange} 
    
  //const {days, day, setDay} = props;
  // const dayData = days.map((day, index) => 
  // key={day.id} 
  // {...day} 
  // day={props.day} 
  // setDay={setDay} 
  // selected={props.days[index].name === props.day} 
  />);

  return (
  <ul>
    {dayData}
  </ul>
  );
}