import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const getSpotsForDay = function (day, appointments) {
    let spots = 0;

    // iterate the day's appointment id's
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    return spots;
  };

  const updateSpots = (state, appointments, id) => {
    // Get day obj
    const dayObj = state.days.find((day) => state.day === day.name);
    const spots = getSpotsForDay(dayObj, appointments);

    const day = { ...dayObj, spots };

    return state.days.map((d) => (d.name === state.day ? day : d));
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() =>
      setState((prev) => ({
        ...prev,
        appointments,
        days: updateSpots(prev, appointments, id),
      }))
    );
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState((prev) => ({
        ...prev,
        appointments,
        days: updateSpots(prev, appointments, id),
      }))
    );
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
