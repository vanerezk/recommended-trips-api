import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function NavBarx() {
  const { user, logout } = useContext(AuthContext);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary mb-3 sticky-top shadow p-3">
      <Container fluid>
        <Link
          to="/"
          className="navbar-brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-compass text-primary"
            viewBox="0 0 16 16">
            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
          </svg>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-end  ">
          <Nav
            className="me-2 my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll>
            <Link
              to="/recommendations"
              className="nav-link">
              Recommendations
            </Link>
            <Link
              to="/about"
              className="nav-link">
              About
            </Link>
            {user ? (
              <Link
                to="/user"
                className="nav-link"
                style={{ marginRight: "10px" }}>
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="nav-link">
                Login
              </Link>
            )}

            {user ? (
              <Link to="/">
                <Button
                  variant="outline-primary"
                  onClick={logout}
                  style={{ marginRight: "10px" }}>
                  Log Out
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button variant="outline-primary">Register</Button>
              </Link>
            )}
          </Nav>
          {user && (
            <Link to="/create-recommendation">
              <Button
                type="button"
                variant="outline-info"
                aria-placeholder="Create a new recommendation">
                +
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarx;
