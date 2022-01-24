

export function getAppointmentsForDay (state, day) {
  //console.log(state)
  const filteredDays = state.days.filter(d => d.name === day).map(d => d.appointments)
  return !filteredDays[0] ? [] : filteredDays[0].map((id) => state.appointments[id] )
 
  // return selectedAppointments//filteredDays[0] || [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } //console.log("return values: ",state.interview.filter((int => int.interview === interview)))
  return state.interviews.data(interview, state.interviewers.interview)
  //filter(int => int.interview === interview).find(int => 
    //console.log(int.interview)
    //  int.interview
    // )
}