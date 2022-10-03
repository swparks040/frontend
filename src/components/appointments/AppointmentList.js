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
import everything from "../images/everything.jpg";
import funtimes from "../images/funtimes.jpeg";
import ivoryTower from "../images/ivoryTower.jpeg";
import Roses from "../images/Roses.jpg";
import weddingReady from "../images/weddingReady.jpg";
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
    
      
      {nailedItUserObject.staff ? (
        <>
        <h2 className="appointmentList">My Appointments</h2>
        </>
      ) : (
        <>
        <h2 className="appointmentList">Our Custom Packages</h2>
        
          
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
            alt="Blue Topaz"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Blue Topaz</h3>
            <p className="carousel__text">Oliani's selection for Back to School.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={everything}
            alt="Everything"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Everything</h3>
            <p className="carousel__text">We can produce anything you can imagine.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={funtimes}
            alt="Everything"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Sweet Shop</h3>
            <p className="carousel__text">Delicious and fun.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={ivoryTower}
            alt="Ivory Tower"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Ivory Tower</h3>
            <p className="carousel__text">Serious Neverending Story Princess vibes...</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={Roses}
            alt="Roses"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Roses</h3>
            <p className="carousel__text">Roses are in season and in full bloom.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            style={{ height: 450, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}
            src={weddingReady}
            alt="Roses"
          />
          <Carousel.Caption>
            <h3 className="carousel__text">Wedding Ready</h3>
            <p className="carousel__text">The perfect bride deserves the perfect nails.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Button
            variant="dark"
            className="makeAppointment__button"
            onClick={() => navigate("/appointment/create")}
          >
            Make New Appointment
          </Button>
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
