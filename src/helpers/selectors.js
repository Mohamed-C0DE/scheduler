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

export function getInterview(state, interview) {
  const result = {};

  if (!interview) {
    return null;
  }

  result.student = interview.student;

  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      result.interviewer = state.interviewers[interviewer];
    }
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length > 0) {
    const filteredDays = state.days.filter((dayObj) => dayObj.name === day);
    const filteredInterviewers = [];

    if (filteredDays.length > 0) {
      for (const interviewerNum of filteredDays[0].interviewers) {
        for (const interviewer in state.interviewers) {
          if (state.interviewers[interviewer].id === interviewerNum) {
            filteredInterviewers.push(state.interviewers[interviewer]);
          }
        }
      }
    }

    return filteredInterviewers;
  }
  return [];
}
