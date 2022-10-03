import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import mylogo from "../images/O.jpg";
import "./NavBar.css";

export const ClientNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar className="navbar__main" sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="navbar__text">
            <img
              src={mylogo}
              alt="logo"
              height="50"
              width="50"
              to={"/"}
              className="navbar__logo"
            />{" "}
            Nailed It! by Olivia
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            {localStorage.getItem("nailedIt_user") ? (
              <li className="navbar__item navbar__logout">
                <Nav.Link
                  className="navbar__link"
                  to=""
                  onClick={() => {
                    localStorage.removeItem("nailedIt_user");
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </Nav.Link>
              </li>
            ) : (
              ""
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
