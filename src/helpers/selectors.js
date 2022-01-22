

export default function getAppointmentsForDay (appointments, day) {
  
  const filteredDays = appointments.days.filter(appointment => appointment.day === day)
  return filteredDays
  
  }