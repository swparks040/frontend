import { Link } from "react-router-dom";
import "./Clients.css";
import { Container, Col } from "react-bootstrap";

export const Client = ({ id, fullName, email }) => {
  return (
    <>
      <div className="client">
        <Container className="mb-5">
          <Col>
            <p>
              {" "}
              Name: <Link to={`/clients/${id}`}> {fullName}</Link>
            </p>
            <p>Email: {email}</p>
          </Col>
        </Container>
      </div>
    </>
  );
};
