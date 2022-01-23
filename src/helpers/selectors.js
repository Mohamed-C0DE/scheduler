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
  // console.log(state);
  // console.log(interview);
  for (const appointment in state.appointments) {
    // console.log(state.appointments[appointment]);
    if (state.appointments[appointment].interview) {
      result.student = state.appointments[appointment].interview.student;
      for (const interviewer in state.interviewers) {
        if (
          state.interviewers[interviewer].id ===
          state.appointments[appointment].interview.interviewer
        ) {
          result.interviewer = {
            id: state.interviewers[interviewer].id,
            name: state.interviewers[interviewer].name,
            avatar: state.interviewers[interviewer].avatar,
          };
        }
      }
    }
  }
  if (!interview) {
    return null;
  }
  // console.log("results: ", result);
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
