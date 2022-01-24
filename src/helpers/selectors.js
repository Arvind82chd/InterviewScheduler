

export function getAppointmentsForDay (state, day) {
  //console.log(state)
  //return state.days.filter(d => d.name === day).map(d => d.appointments)
  const filteredDays = state.days.filter(d => d.name === day).map(d => d.appointments)
  return !filteredDays[0] ? [] : filteredDays[0].map((id) => state.appointments[id] )
 
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } 
  console.log("interview:----", interview, "state: ----", state)
  const arrayInterviewers = Object.values(state.interviewers)
  const interviewer = arrayInterviewers.find((int) =>  int.id === interview.interviewer)
  console.log({interviewer});
  if (!interviewer) {
    return null;
  } 
  return {
    ...interview,
    interviewer,
  }
  
}