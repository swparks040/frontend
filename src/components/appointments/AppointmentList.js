/* use state for appointments, use effect for appointments

1. Create AppointmentList function to be used/rendered in ApplicationViews.js*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appointment } from "./Appointment";
import "./Appointments.css";
import { Button } from "react-bootstrap";
import whitePinkNails from "../images/whitePinkNails.jpg";
import easterEggs from "../images/easterEggs.jpg";
import blueTopaz from "../images/blueTopaz.jpg";
import Carousel from "react-bootstrap/Carousel";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  //create another state so I can modify filteredAppointments
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const localNailedItUser = localStorage.getItem("nailedIt_user");
  const nailedItUserObject = JSON.parse(localNailedItUser);
  const navigate = useNavigate();

  const pullAppointments = () => {
    fetch(
      `http://localhost:8088/appointments?_embed=employeeAppointments&_expand=user&_expand=nailColor&_expand=nailShape&_expand=nailEffect`
    )
      .then((response) => response.json())
      .then((appointmentArray) => {
        setAppointments(appointmentArray);
      });
  };

  useEffect(() => {
    pullAppointments();

    fetch(`http://localhost:8088/employees?_expand=user`)
      .then((response) => response.json())
      .then((employeeArray) => {
        setEmployees(employeeArray);
      });
  }, []);

  useEffect(() => {
    if (nailedItUserObject.staff) {
      // for employees
      setFilteredAppointments(appointments);
    } else {
      // for clients
      const myAppointments = appointments.filter(
        (appointment) => appointment.userId === nailedItUserObject.id
      );
      setFilteredAppointments(myAppointments);
    }
  }, [appointments]);

  return (
    <>
    
      <h2 className="appointmentList">My Appointments</h2>
      {nailedItUserObject.staff ? (
        <></>
      ) : (
        <>
          <Button
            variant="dark"
            className="makeAppointment__button"
            onClick={() => navigate("/appointment/create")}
          >
            Make New Appointment
          </Button>
        </>
      )}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={whitePinkNails}
            alt="Spring Formal"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Spring Formal</h3>
            <p className="carousel__text">Sydnee Parks' selection for Spring Formal.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={easterEggs}
            alt="Easter Eggs"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Easter Eggs</h3>
            <p className="carousel__text">Melissa Peters' selection for Easter Ball.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={blueTopaz}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Blue Topaz</h3>
            <p className="carousel__text">Oliani's selection for Back to School.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <article className="appointments">
        {filteredAppointments.map((appointment) => (
          <Appointment
            key={`appointment--${appointment.id}`}
            pullAppointments={pullAppointments}
            employees={employees}
            currentUser={nailedItUserObject}
            appointmentObject={appointment}
          />
        ))}
      </article>
      <Button
        className="back__button"
        variant="dark"
        onClick={() => navigate(`/`)}
      >
        Back
      </Button>
    </>
  );
};
