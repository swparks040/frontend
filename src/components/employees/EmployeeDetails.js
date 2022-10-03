import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Employees.css";
import { Button } from "react-bootstrap";

export const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, updateEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://localhost:8088/employees?_expand=user&_embed=employeeAppointments&userId=${employeeId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const singleEmployee = data[0];
        updateEmployee(singleEmployee);
      });
  }, [employeeId]);

  return (
    <>
      <section className="employee">
        <header className="employee__header">{employee?.user?.fullName}</header>
        <p className="employee__text">Email: {employee?.user?.email}</p>
        <p className="employee__text">Role: {employee.role}</p>
        <p className="employee__text">Pay: {employee.payRate}</p>
        <p className="employee__text">Start Date: {employee.startDate}</p>
        <footer className="employee__footer">
          Has claimed {employee?.employeeAppointments?.length} appointments.
        </footer>
      </section>
      <Button
        variant="dark"
        className="employeeUpdate__button"
        onClick={() => navigate(`/profile/${employeeId}`)}
      >
        Update
      </Button>
      <Button
        variant="dark"
        className="back__button"
        onClick={() => navigate(`/employees`)}
      >
        Back
      </Button>
    </>
  );
};
