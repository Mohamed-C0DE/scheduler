import React from "react";

import "./styles.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && <p>No Appointments</p>}
      {props.time && <p>Appointment at {props.time}</p>}
    </article>
  );
}
