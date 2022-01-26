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

  const updateSpots = (request) => {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (request === "add") {
          return { ...day, spots: day.spots + 1 };
        } else if (request === "remove") {
          if (day.spots === 0) {
            return { ...day };
          }
          return { ...day, spots: day.spots - 1 };
        }
      } else {
        return { ...day };
      }
    });
    return days;
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
      setState({
        ...state,
        appointments,
        days: updateSpots("remove"),
      })
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
        days: updateSpots("add"),
      }))
    );
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
