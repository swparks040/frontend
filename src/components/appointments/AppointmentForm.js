import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"



export const AppointmentForm = () => {
  //  Added component state for nailColors, nailShapes, nailEffects.
  //  Added the default properties to the initial state object.
  const [nailColors, setNailColors] = useState([]);
  const [nailShapes, setNailShapes] = useState([]);
  const [nailEffects, setNailEffects] = useState([]);
  const [appointment, update] = useState({
    userId: 0,
    nailColorId: 0,
    nailShapeId: 0,
    nailEffectId: 0,
    directions: "",
    dateBooked: "",
    dateCompleted: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8088/nailColors`)
      .then((response) => response.json())
      .then((nailColorArray) => {
        setNailColors(nailColorArray);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8088/nailShapes`)
      .then((response) => response.json())
      .then((nailShapeArray) => {
        setNailShapes(nailShapeArray);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8088/nailEffects`)
      .then((response) => response.json())
      .then((nailEffectArray) => {
        setNailEffects(nailEffectArray);
      });
  }, []);

  //      implement "const navigate = useNavigate()"" hook so I can redirect the clients and employees to the appointment list.

  const navigate = useNavigate();
  const localNailedItUser = localStorage.getItem("nailedIt_user");
  const nailedItUserObject = JSON.parse(localNailedItUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    //      create object to be sent to the API

    const appointmentToSendToAPI = {
      userId: nailedItUserObject.id,
      nailColorId: appointment.nailColorId,
      nailShapeId: appointment.nailShapeId,
      nailEffectId: appointment.nailEffectId,
      directions: appointment.directions,
      dateBooked: appointment.dateBooked,
      dateCompleted: appointment.dateCompleted,
    };

    //      post to API with fetch POST, stringify with .stringify(appointmentObject) in the body, then navigate to appointments.
    return fetch(`http://localhost:8088/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/appointments");
      });
  };

  return (
    <form className="appointmentForm">
      <h2 className="appointmentForm__title">New Appointment</h2>
      <h5 className="appointmentForm__title">Select Custom for Color, Shape, and Effect for a Custom Design.  </h5>
        <label className="formLabel" htmlFor="nailColor">First, select a Nail Color...</label>
      <fieldset className="formGroup__colors">
        {nailColors.map((nailColor) => {
          return (
            <div className="formGroup__selection">
              <input
                className="colorInput"
                name="nailColor"
                onChange={() => {
                  const copy = { ...appointment };
                  copy.nailColorId = nailColor.id;
                  update(copy);
                }}
                type="radio"
                value={nailColor.id}
              />{" "}
              {nailColor.color}
            </div>
          );
        })}
      </fieldset>
        <label className="formLabel" htmlFor="nailShape">Next, select a Nail Shape...</label>
      <fieldset className="formGroup__shapes">
        {nailShapes.map((nailShape) => {
          return (
            <div className="formGroup__selection">
              <input
                className="shapeInput"
                name="nailShape"
                onChange={() => {
                  const copy = { ...appointment };
                  copy.nailShapeId = nailShape.id;
                  update(copy);
                }}
                type="radio"
                value={nailShape.id}
              />{" "}
              {nailShape.shape}
            </div>
          );
        })}
      </fieldset>
        <label className="formLabel" htmlFor="nailEffect">Next, select a Nail Effect...</label>
      <fieldset className="formGroup__effects">
        {nailEffects.map((nailEffect) => {
          return (
            <div className="formGroup__selection">
              <input
                className="effectInput"
                name="nailEffect"
                onChange={() => {
                  const copy = { ...appointment };
                  copy.nailEffectId = nailEffect.id;
                  update(copy);
                }}
                type="radio"
                value={nailEffect.id}
              />{" "}
              {nailEffect.effect}
            </div>
          );
        })}
      </fieldset>
      <fieldset>
        <div className="formGroup__directions">
          <label className="formLabel" htmlFor="directions">Next, provide your Nailed It! Technician specific directions or requests...</label>
          <textarea
            required
            autoFocus
            type="textarea"
            className="form-control"
            placeholder="Include the name of a custom design, or leave directions and notes for your nail technician..."
            value={appointment.directions}
            onChange={(evt) => {
              const copy = { ...appointment };
              copy.directions = evt.target.value;
              update(copy);
            }}
            rows={3}
          />
        </div>
      </fieldset>
      <fieldset>
          <label className="formLabel" htmlFor="dates">Finally, choose an Appointment Time</label>
        <div className="formGroup__selection">
          <input
            type="datetime-local"
            className="form-control"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            value={appointment.dateBooked}
            min="2022-01-21T00:00"
            max="2030-01-01T00:00"
            onChange={(evt) => {
              const copy = { ...appointment };
              copy.dateBooked = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <Button
      variant="dark"
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="bookAppointment__button">
        Book Appointment
      </Button>
    </form>
  );
};
