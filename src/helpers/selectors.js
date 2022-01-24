

export function getAppointmentsForDay (state, day) {
  //console.log(state)
  return state.days.filter(d => d.name === day).map(d => d.appointments)
  // return !filteredDays[0] ? [] : filteredDays[0].map((id) => state.appointments[id] )
 
  // return selectedAppointments//filteredDays[0] || [];
}

export function getInterview(state, interview) {
  if (!state.interviewer) {
    return null;
  } return state.interview.filter((int => int.interview === interview).map(int => 
    //console.log(int.interview)
     int.interview
    )) 
}