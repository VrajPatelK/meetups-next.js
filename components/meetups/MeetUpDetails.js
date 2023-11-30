import React from "react";
import classes from "./MeetUpDetails.module.css";

const MeetUpDetails = (props) => {
  return (
    <section className={classes.section}>
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.content}>
        <div className={classes.title}>{props.title}</div>
        <div>{props.description}</div>
        <address>{props.address}</address>
      </div>
    </section>
  );
};

export default MeetUpDetails;
