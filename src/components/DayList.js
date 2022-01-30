import React from 'react';
import DayListItem from './DayListItem';


export default function DayList (props) {
  console.log("------here---",props.days)
  const {days, value, onChange} = props;

  // function calculateSpots(appointments) {
  //   const count = []
  //   const c = days.map(appointment => {
  //     if(appointment.interview === null) {
  //       count.push(1);
  //     }
  //   }) 
  //   return (count.length);
  // }
  // console.log('day spots -----' ,calculateSpots(days))
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