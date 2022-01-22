export function getAppointmentsForDay(state, day) {
  if (state.days.length > 0) {
    const filteredDays = state.days.filter((dayObj) => dayObj.name === day);
    const filteredAppointments = [];

    if (filteredDays.length > 0) {
      for (const appointNum of filteredDays[0].appointments) {
        for (const appoint in state.appointments) {
          if (state.appointments[appoint].id === appointNum) {
            filteredAppointments.push(state.appointments[appoint]);
          }
        }
      }
    }

    return filteredAppointments;
  }
  return [];
}
