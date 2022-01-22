

export function getAppointmentsForDay (state, day) {
  
  const filteredDays = state.days.filter(d => d.name === day).map(d => d.appointments)
  return !filteredDays[0] ? [] : filteredDays[0].map((id) => state.appointments[id] )
 
  // return selectedAppointments//filteredDays[0] || [];
}