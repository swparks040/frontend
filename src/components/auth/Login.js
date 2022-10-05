import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import oliviaBanner from "../images/Olivia.png";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "nailedIt_user",
            JSON.stringify({
              id: user.id,
              staff: user.isStaff,
            })
          );
          navigate("/appointments");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <div className="Login">
      <header className="Login__header">
        <Container>
          <Card className="mb-5">
            <Card.Img src={oliviaBanner} />
          </Card>
          <Form className="form" onSubmit={handleLogin}>
            <Row>
              <Col md>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="example@email.com"
                    onChange={(evt) => set(evt.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md className="mb-5">
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="dark" type="submit">
              Login
            </Button>
            <section>
              <span className="registration__link">
                <Link to="/register">Register Here</Link>
              </span>
            </section>
          </Form>
        </Container>
      </header>
    </div>
  );
};
