import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col } from "react-bootstrap";

export const Employee = ({ id, fullName, email }) => {
  return (
    <>
      <div className="employee">
        <Container className="mb-5">
          <Col className="employee__col">
            <p>
              Name: <Link to={`/employees/${id}`}> {fullName}</Link>
            </p>
            <p>Email: {email}</p>
          </Col>
        </Container>
      </div>
    </>
  );
};
